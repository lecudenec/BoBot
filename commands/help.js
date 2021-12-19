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
import path from 'path';
import Logger from '../config/Logger.js';

class help extends Command {
    constructor() {
        super();
    }

    getName() {
        return "help";
    }

    getDescription() {
        return "Commande Help !";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        let commands = "";
        try{
            const commandFiles = fs.readdirSync(path.resolve('commands')).filter(file => file.endsWith('.js'));

            for (let file of commandFiles){
                const module = await import("file:///" + path.resolve(`commands/${file}`));
                const command = new module.default;
                if (!command.isReservedToGod()){
                    commands = commands + command.getName() + " -> " + command.getDescription() + "\n";
                }
            }

            await interraction.reply({ embeds: [{
                color: 0x0099ff,
                title: 'Help',
                description: commands,
                author: {
                    name: 'Wakestufou'
                }
            }], ephemeral: false })

        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! help");
            return;
        }


    }
}

export default help;
