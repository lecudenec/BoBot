/**
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

import Command from '../Command.js';
import fs from 'fs';
import Bot from '../Bot.js';
import { MessageActionRow, MessageButton } from 'discord.js';

class roles extends Command {
    constructor() {
        super();
        Bot.registerButton("role_next", this.buttonNext.bind(this));
        Bot.registerButton("role_previous", this.buttonPrevious.bind(this));
        Bot.registerButton("role_add", this.buttonAddRole.bind(this));
        Bot.registerButton("role_del", this.buttonDelRole.bind(this));
        this.__roles;
        this.__id = 0;
    }

    getName() {
        return "roles";
    }

    getDescription() {
        return "Ajoute/supprime toi un rôle !";
    }

    isReservedToGod() {
        return false;
    }


    async buttonNext(interraction){
        try {
            await interraction.deferUpdate();
            const guildid = interraction.guild.id;

            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }

            this.__roles = roles;

            if (this.__id >= this.__roles.length-2) this.__id = 0;
            else this.__id = this.__id + 1;

            let message = "Description du rôle : \n" + this.__roles[this.__id][2];

            await interraction.editReply({ embeds: [{
                color: 0x0099ff,
                title: 'Rôle : ' + this.__roles[this.__id][0],
                description: message
            }], ephemeral: true});
        } catch(e){
            console.log("une erreur est survenue Command : roles | ", e);
        }
    }

    async buttonPrevious(interraction){
        try {
            await interraction.deferUpdate();
            const guildid = interraction.guild.id;

            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }

            this.__roles = roles;

            if (this.__id == 0) this.__id = this.__roles.length - 2;
            else this.__id = this.__id - 1;

            let message = "Description du rôle : \n" + this.__roles[this.__id][2];

            await interraction.editReply({ embeds: [{
                color: 0x0099ff,
                title: 'Rôle : ' + this.__roles[this.__id][0],
                description: message
            }], ephemeral: true});
        } catch(e){
            console.log("une erreur est survenue Command : roles | ", e);
        }
    }

    async buttonAddRole(interraction){
        try{            
            await interraction.deferUpdate();
            await interraction.member.roles.add(this.__roles[this.__id][1]);
        } catch(e){
            console.log("une erreur est survenue Command : roles lors de l'ajout d'un role | ", e);
        }
        
    }

    async buttonDelRole(interraction){
        try{
            await interraction.deferUpdate();
            await interraction.member.roles.remove(this.__roles[this.__id][1]);
        } catch(e){
            console.log("une erreur est survenue Command : roles lors de l'ajout d'un role | ", e);
        }
        
    }

    async execute(interraction) {
        try{
            const guildid = interraction.guild.id;

            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }

            this.__roles = roles;

            if(this.__roles.length === 1){
                await interraction.reply({ content: "Aucun rôle disponible sur se serveur ", ephemeral: true});
                return;
            }

            let message = "Description du rôle : \n" + this.__roles[this.__id][2];

            const row = new MessageActionRow().addComponents(
                new MessageButton()
                    .setCustomId("role_previous")
                    .setLabel("Role Précedent")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId("role_next")
                    .setLabel("Role suivant")
                    .setStyle("PRIMARY"),
                new MessageButton()
                    .setCustomId("role_add")
                    .setLabel("Ajout du role")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("role_del")
                    .setLabel("Suppression du role")
                    .setStyle("SUCCESS")
            );

            await interraction.deferReply();

            await interraction.editReply({ embeds: [{
                color: 0x0099ff,
                title: 'Rôle : ' + this.__roles[this.__id][0],
                description: message
            }], ephemeral: true, components: [row] });
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            console.log(e);
        }
        
    }
}

export default roles;
