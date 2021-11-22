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

class config extends Command {
    constructor() {
        super();
    }

    getName() {
        return "config";
    }

    getDescription() {
        return "Configure le bot";
    }

    isReservedToGod() {
        return true;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.String,
            name: "option",
            description: "addrole/delrole/getrole",
            choices: [
                {
                    "name":"Ajout d'un role",
                    "value":"addrole"
                },
                {
                    "name":"Suppresion d'un role",
                    "value":"delrole"
                },
                {
                    "name":"Voir les roles",
                    "value":"getrole"
                },
                {
                    "name":"Clear la config",
                    "value":"clear"
                }
            ],
            required: true
        }, {
            type: ApplicationCommandOptionType.String,
            name: "name",
            description: "Nom du role",
            required: true
        },{
            type: ApplicationCommandOptionType.String,
            name: "idrole",
            description: "L'id du role",
            required: true
        },{
            type: ApplicationCommandOptionType.String,
            name: "commentaire",
            description: "Le commentaire du role",
            required: false
        }
        ];
    }


    async execute(interraction) {
        try{
            const guildid = interraction.guild.id;

            if (interraction.options.getString('option') === "addrole"){
                let dataMessage = interraction.options.getString('name') + ":" + interraction.options.getString('idrole');
                if (interraction.options.getString('commentaire') !== null) dataMessage += ":" + interraction.options.getString('commentaire') + "\n";
                else dataMessage += ":Pas de commentaire pour ce rôle\n";
                fs.appendFileSync(`data/${guildid}.txt`, dataMessage);
                await interraction.reply({ content: "Le role a bien été ajouté !", ephemeral: true });
            }
            else if (interraction.options.getString('option') === "delrole"){
                let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
                for (let i = 0; i<roles.length; i++){
                    roles[i] = roles[i].split(':');
                }

                let test = false;

                for (let i = 0; i<roles.length; i++){
                    if (roles[i][0].includes(interraction.options.getString('name'))){
                        if (roles[i][1].includes(interraction.options.getString('idrole'))){
                            test = true;
                        }
                    }
                }

                if (test){
                    let dataRole = "";
                    for (let i = 0; i<roles.length; i++){
                        console.log(roles[i][0]);
                        if(roles[i][0] !== interraction.options.getString('name') && roles [i][0] !== ""){
                            dataRole = dataRole + roles[i][0] + ":" + roles[i][1] + ";\n";
                        }
                    }
                    //console.log(dataRole);
                    fs.writeFileSync(`data/${guildid}.txt`, dataRole);
                    await interraction.reply({ content: `Le role a été supprimé !`, ephemeral: true });
                }
                else {
                    await interraction.reply({ content: `Role inexistant !`, ephemeral: true });
                }
            }
            else if (interraction.options.getString('option') === "clear"){
                fs.writeFileSync(`data/${guildid}.txt`, "");
                await interraction.reply({ content: `La config a été vidée !`, ephemeral: true });
            }
            else {
                let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
                for (let i = 0; i<roles.length; i++){
                    roles[i] = roles[i].split(':');
                }

                let message = "";
                for (let i = 0; i<roles.length; i++){
                    message = message + roles[i][0] + '\n';
                }

                await interraction.reply({ content: `${message}`, ephemeral: true });
            }
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            console.log(e);
        }
        
       
    }
}

export default config;
