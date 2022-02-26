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
import { ApplicationCommandOptionType } from 'discord-api-types/v9';
import fs from 'fs';
import Logger from '../config/Logger.js';

class config extends Command {
    constructor() {
        super();
        this.sub = {
            "clear": this.exec_clear,
            "ajout": this.exec_add,
            "supprimer": this.exec_del,
            "voir": this.exec_view
        }
    }

    getName() {
        return "config";
    }

    getDescription() {
        return "Configure le bot pour le serveur !";
    }

    isReservedToGod() {
        return true;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.Subcommand,
            name: "ajout",
            description: "Ajout un rôle dans la configuration",
            options: [{
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "Le role a rajouter à la configuration",
                required: true
            }, {
                type: ApplicationCommandOptionType.String,
                name: "commentaire",
                description: "Une description du role"
            }]
        },{
            type: ApplicationCommandOptionType.Subcommand,
            name: "supprimer",
            description: "Supprime un rôle dans la configuration",
            options: [{
                type: ApplicationCommandOptionType.Role,
                name: "role",
                description: "Le role a supprimer de la configuration",
                required: true
            }]
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "voir",
            description: "Voir les rôles dans la configuration"
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "clear",
            description: "Vide la configuration"
        }
        ];
    }

    async exec_view(interraction){
        const guildid = interraction.guild.id;

        try{
            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }

            let message = "";
            for (let i = 0; i<roles.length; i++){
                message = message + roles[i][0] + '\n';
            }

            await interraction.reply({ content: `Role Disponible :\n${message}`, ephemeral: true });
        } catch(e) {
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! config");
        }
    }

    async exec_del(interraction){
        try{
            const guildid = interraction.guild.id;

            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }
    
            let test = false;
    
            for (let i = 0; i<roles.length; i++){
                if (roles[i][0].includes(interraction.options.getRole('role').name)){
                    if (roles[i][1].includes(interraction.options.getRole('role').id)){
                        test = true;
                    }
                }
            }
    
            if (test){
                let dataRole = "";
                for (let i = 0; i<roles.length; i++){
                    if(roles[i][0] !== interraction.options.getRole('role').name && roles [i][0] !== "" && roles[i][1] !== interraction.options.getRole('role').id){
                        dataRole = dataRole + roles[i][0] + ":" + roles[i][1] + ";\n";
                    }
                }
                
                fs.writeFileSync(`data/${guildid}.txt`, dataRole);
                await interraction.reply({ content: `Le role a été supprimé !`, ephemeral: true });
            }
            else {
                await interraction.reply({ content: `Role inexistant !`, ephemeral: true });
            }
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! config");
        }
        

    }
    
    async exec_add(interraction){
        const guildid = interraction.guild.id;
        try{
            if (interraction.options.getString("commentaire") != null){
                if (interraction.options.getString("commentaire").length >= 255){
                    await interraction.reply({ content: "Merci de mettre un commentaire inférieur à 255 caractères !", ephemeral: true});
                }
                else {
                    
                    let dataMessage = interraction.options.getRole('role').name + ":" + interraction.options.getRole('role').id;
                    if (interraction.options.getString('commentaire') !== null) dataMessage += ":" + interraction.options.getString('commentaire') + "\n";
                    else dataMessage += ":Pas de commentaire pour ce rôle\n";
                    fs.appendFileSync(`data/${guildid}.txt`, dataMessage);
                    await interraction.reply({ content: "Le role a bien été ajouté !", ephemeral: true });
                }
                
            }
            else {
                let dataMessage = interraction.options.getRole('role').name + ":" + interraction.options.getRole('role').id;
                if (interraction.options.getString('commentaire') !== null) dataMessage += ":" + interraction.options.getString('commentaire') + "\n";
                else dataMessage += ":Pas de commentaire pour ce rôle\n";
                fs.appendFileSync(`data/${guildid}.txt`, dataMessage);
                await interraction.reply({ content: "Le role a bien été ajouté !", ephemeral: true });
            }
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! config");
        }
    }

    async exec_clear(interraction){
        const guildid = interraction.guild.id;

        try{
            fs.writeFileSync(`data/${guildid}.txt`, "");
            await interraction.reply({ content: `La config a été vidée !`, ephemeral: true });
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! config");
        }
    }


    async execute(interraction) {
        await this.sub[interraction.options.getSubcommand()](interraction);
    }
}

export default config;
