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

class embed extends Command {
    constructor() {
        super();
    }

    getName() {
        return "embed";
    }

    getDescription() {
        return "Crée un embed !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.String,
            name: "titre",
            description: "Titre de l'embed",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "message",
            description: "Message de l'embed",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "couleur",
            description: "Couleur de l'embed",
            choices: [
                {
                    "name":"WHITE",
                    "value":"#FFFFFF"
                },
                {
                    "name":"BLURPLE",
                    "value":"#5865F2"
                },
                {
                    "name":"GREYPLE (Default)",
                    "value":"#99AAB5"
                },
                {
                    "name":"DARK_BUT_NOT_DARK",
                    "value":"#2C2F33"
                },
                {
                    "name":"NOT_QUITE_BLACK",
                    "value":"#23272A"
                },
                {
                    "name":"GREEN",
                    "value":"#57F287"
                },
                {
                    "name":"FUSCHIA",
                    "value":"#EB459E"
                },
                {
                    "name":"YELLOW",
                    "value":"#FEE75C"
                },
                {
                    "name":"RED",
                    "value":"#ED4245"
                },
                {
                    "name":"BLACK",
                    "value":"#23272A"
                }
            ],
            required: false
        }
        ];
    }


    async execute(interraction) {
        let name = interraction.options.getString('titre');
        let message = interraction.options.getString('message');
        let color = interraction.options.getString('couleur') == null ? "#99AAB5" : interraction.options.getString('couleur');
        let mess = "";
        for (let i = 0; i<message.length; i++){
            if(message[i]=="\\" && message[i+1]=="n"){
                mess += '\n';
                i++;
            }
            else {
                mess += message[i];
            }
        }
        interraction.reply({ embeds: [{
            color: color,
            title: name,
            description: mess
        }], ephemeral: false });
    }
}

export default embed;
