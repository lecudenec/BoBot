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

class roles extends Command {
    constructor() {
        super();
    }

    getName() {
        return "roles";
    }

    getDescription() {
        return "Montre les rôles disponibles !";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        const guildid = interraction.guild.id;

        let roles = (fs.readFileSync(`data/${guildid}.txt`, {encoding: "utf-8"})).toString().split('\n');
        for (let i = 0; i<roles.length; i++){
            roles[i] = roles[i].split(':');
        }

        let message = "";
        for (let i = 0; i<roles.length; i++){
            message = message + roles[i][0] + '\n';
        }

        interraction.reply({ embeds: [{
            color: 0x0099ff,
            title: 'Rôles Disponibles !',
            description: message
        }], ephemeral: false })
    }
}

export default roles;
