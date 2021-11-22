/**
 * Copyright © 2021 Maxime Friess <M4x1me@pm.me>
 * Copyright © 2021 Joffrey LE CUDENEC <lecudenec.joffrey@gmail.com>
 * 
 * This file is part of BoBot.
 * 
 * BoBot is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * BoBot is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with BoBot.  If not, see <https://www.gnu.org/licenses/>.
 */


import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { Client, DMChannel } from 'discord.js';

import fs from 'fs';
import path from 'path';

import Logger from './config/Logger.js';

class Bot{
    constructor() {
        this.__token = JSON.parse(fs.readFileSync('./config/config.json', {encoding: "utf-8"})).token;
        this.__appid = JSON.parse(fs.readFileSync('./config/config.json', {encoding: "utf-8"})).appid;
        this.__god = JSON.parse(fs.readFileSync('./config/config.json', {encoding: "utf-8"})).god.split(',');
        this.__guild_dev = JSON.parse(fs.readFileSync('./config/config.json', {encoding: "utf-8"})).guild_dev.split(',');
        this.__commands = {};
        this.__dmcommands = {};
        this.__buttons = {};
        this.__logger = Logger;
        this.__rest = new REST({ version: '9' }).setToken(this.__token);
    }

    async registerCommands(){
        await this.__loadCommands();
        await this.__loadDMCommands();

        let commands = [];

        for (let i in this.__commands) {
            commands.push({
                name: this.__commands[i].getName(),
                description: this.__commands[i].getDescription(),
                options: this.__commands[i].getOptions()
            });
        }


        // We are in DEV mode, register commands per guilds
        if (false) {
            for (let guild_id of this.__guild_dev) {
                try {
                    this.__logger.info("Chargements des commandes sur le serveur : " + guild_id + "!");
                    await this.__rest.put(Routes.applicationGuildCommands(this.__appid, guild_id), { body: commands });
                } catch (e) {
                    this.__logger.error("Erreur lors de l'enregistrement des commandes du bot sur le serveur : " + guild_id + "!", e);
                }
            }
            // We are not in DEV mode, register commands globally
        } else {
            await this.__rest.put(Routes.applicationCommands(this.__appid), { body: commands });
        }

    }

    async __loadDMCommands() {
        this.__logger.info("Loading dm commands...");
        try {
            const files = fs.readdirSync(path.resolve('dmcommands')).filter(file => file.endsWith('.js'));

            for (let filename of files) {
                const module = await import("file:///" + path.resolve(`dmcommands/${filename}`));
                const command = new module.default;
                this.__logger.info("Loading dm command " + command.getName());
                this.__dmcommands[command.getName()] = command;
            }
        } catch (e) {
            this.__logger.fatal("Failed to register dmcommands!", e, 3);
            return;
        }

    }


    async __loadCommands(){
        this.__logger.info("Chargement des slash commands...");
        try{
            const commandFiles = fs.readdirSync(path.resolve('commands')).filter(file => file.endsWith('.js'));

            for (let file of commandFiles){
                const module = await import("file:///" + path.resolve(`commands/${file}`));
                const command = new module.default;
                this.__logger.info("Chargement de la commande : " + command.getName());
                this.__commands[command.getName()] = command;
            }

        } catch(e){
            this.__logger.fatal("Échec de l'enregistrement des commandes !", e, 3);
            return;
        }
    }

    async initClient(){
        this.__client = new Client({ intents: ["GUILDS", "GUILD_PRESENCES", "DIRECT_MESSAGES", "GUILD_MEMBERS"], partials: ["CHANNEL"]});

        this.__client.on('ready', this.onReady.bind(this));
        this.__client.on('interactionCreate', this.onInteraction.bind(this));
        this.__client.on('messageCreate', this.onMessage.bind(this));
    }

    start(){
        this.__client.login(this.__token);
    }


    async onReady(){
        this.__logger.info("Lancement du BoBot !");
        //const guilds_id = this.__client.guilds.cache.map(g => g.id);
        await this.registerCommands();

        this.__logger.info(this.__client.user.tag + " Connecté !");
        this.__client.user.setPresence({
            status: 'online'
        });
        this.__client.user.setActivity('/help', {
            type: 'PLAYING'
        })
    }

    async onInteraction(interaction){
        if (interaction.isCommand()){
            if (this.__commands[interaction.commandName] !== undefined){
                if (this.__commands[interaction.commandName].isReservedToGod()){
                    if (!this.__god.includes(interaction.user.id) && interaction.member.id !== interaction.guild.ownerId){
                        interaction.reply({ content: "Vous n'êtes pas Dieux !", ephemeral: true});
                        return;
                    }
                }
    
                try{
                    await this.__commands[interaction.commandName].execute(interaction);
                } catch(e) {
                    this.__logger.error("Erreur dans l'execution de la commande : " + interaction.commandName, e);
                    try {
                        interaction.reply({ content: "Une erreur est survenue !", ephemeral: true});
                    } catch (e) {
                        this.__logger.error("Erreur dans la réponse de l'érreur !",e);
                    }
                }
            }
        }
        else if (interaction.isButton()){
            if (this.__buttons[interaction.customId] !== undefined){
                try{
                    await this.__buttons[interaction.customId].bind(this.__buttons[interaction.customId])(interaction);
                } catch(e){
                    this.__logger.error("Erreur dans l'execution de la commande : " + interaction.commandName, e);
                }
            }
        }

        
    }

    async onMessage(message) {
        if (!message.channel instanceof DMChannel)
            return;

        try {
            if (message.partial) {
                message = await message.fetch();
            }
        } catch (e) {
            this.__logger.error("Error when retrieving partial message", e);
        }

        for (const [name, command] of Object.entries(this.__dmcommands)) {
            if (message.content.startsWith(name)) {
                try {
                    if (command.isReservedToGod() && !this.__god.includes(message.author.id)) {
                        return;
                    }

                    if (command.getCommandRegex().test(message.content)) {
                        await command.execute(message, message.content, command.getCommandRegex().exec(message.content));
                    } else {
                        message.reply("Usage: `" + command.getUsage() + "`");
                    }
                } catch (e) {
                    this.__logger.error("Error when handling DM command \"" + name + "\"", e);
                    try {
                        message.reply("Une erreur est survenue lors du traitement de votre commande.");
                    } catch (e) {
                        this.__logger.error("Error when handling error of dm command \"" + name + "\"", e);
                    }
                }
                break;
            }
        }
    }

    registerButton(id, handler){
        this.__buttons[id] = handler;
    }

}

export default new Bot();