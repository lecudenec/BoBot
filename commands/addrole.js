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

class addrole extends Command {
    constructor() {
        super();
    }

    getName() {
        return "addrole";
    }

    getDescription() {
        return "Ajout toi un role !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.String,
            name: "name",
            description: "Nom du role",
            required: true
        }
        ];
    }


    async execute(interraction) {
        const guildid = interraction.guild.id;
        try {
            let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
            for (let i = 0; i<roles.length; i++){
                roles[i] = roles[i].split(':');
            }

            for (let i = 0; i<roles.length; i++){
                if (roles[i][0] === interraction.options.getString('name')){
                    await interraction.member.roles.add(roles[i][1]);
                    await interraction.reply({ content: `Le role a été ajouté !`, ephemeral: true });
                    return;
                }
            }
            await interraction.reply({ content: `Le role n'est pas présent !`, ephemeral: true });
        }
        catch (e){
            await interraction.reply({ content: `Le role n'est pas présent !`, ephemeral: true });
            console.log(e);
        }
    }
}

export default addrole;
