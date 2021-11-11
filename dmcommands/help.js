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

import DMCommand from '../DMCommand.js';
import fs from 'fs';
import path from 'path';

class help extends DMCommand {
    constructor() {
        super();
    }

    getName() {
        return "help";
    }

    getDescription() {
        return "Commande help";
    }

    isReservedToGod() {
        return false;
    }
 
    async execute(message, content, args) {
        let commands = "";
        try{
            const commandFiles = fs.readdirSync(path.resolve('dmcommands')).filter(file => file.endsWith('.js'));

            for (let file of commandFiles){
                const module = await import("file:///" + path.resolve(`dmcommands/${file}`));
                const command = new module.default;
                if (!command.isReservedToGod()){
                    commands = commands + command.getName() + " -> " + command.getDescription() + "\n";
                }
            }

            message.reply({ embeds: [{
                color: 0x0099ff,
                title: 'Help',
                description: commands,
                author: {
                    name: 'Wakestufou'
                }
            }]});

        } catch(e){
            message.reply("Un problème est survenue !" + e);
            return;
        }

    }
}
 
export default help;
 