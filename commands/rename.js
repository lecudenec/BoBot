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
class rename extends Command {
    constructor() {
        super();
        this.sub = {
            "sparkles": this.exec_sparkles,
            "normal": this.exec_rename
        }
    }

    getName() {
        return "rename";
    }

    getDescription() {
        return "Change le pseudo d'une personne !";
    }

    isReservedToGod() {
        return true;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.Subcommand,
            name: "sparkles",
            description: "Le nouveau pseudo entouré de sparkles",
            options: [{
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "Ping la personne",
                required: true
            },{
                type: ApplicationCommandOptionType.String,
                name: "pseudo_with_sparkles",
                description: "Pseudo",
                required: true
            }]
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "normal",
            description: "Renome la personne en normal !",
            options: [{
                type: ApplicationCommandOptionType.User,
                name: "user",
                description: "Ping la personne",
                required: true
            },{
                type: ApplicationCommandOptionType.String,
                name: "pseudo",
                description: "Pseudo",
                required: true
            }]
        }
        ];
    }
    
    async exec_sparkles(interraction) {
        try {
            const pseudo = "✨ " + interraction.options.getString('pseudo_with_sparkles') + " ✨";
            const user = interraction.options.getMember('user');
            if (pseudo.length > 32) 
                interraction.reply({ content: "Ton pseudo est trop long !", ephemeral: true});
            else {
                if (user.manageable){
                    await user.setNickname(pseudo);
                    await interraction.reply({ content: "Le pseudo a été modifié !", ephemeral: true });
                }
                else {
                    await interraction.reply({ content: "Vous ne pouvez pas modifier ce pseudo !", ephemeral: true });
                }
            }
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! rename sparkles");
        }
    }

    async exec_rename(interraction) {
        try {
            const pseudo = interraction.options.getString('pseudo');
            const user = interraction.options.getMember('user');
            if (pseudo.length > 32) 
                interraction.reply({ content: "Ton pseudo est trop long !", ephemeral: true});
            else {
                if (user.manageable){
                    await user.setNickname(pseudo);
                    await interraction.reply({ content: "Le pseudo a été modifié !", ephemeral: true });
                }
                else {
                    await interraction.reply({ content: "Vous ne pouvez pas modifier ce pseudo !", ephemeral: true });
                }
            }
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! rename rename");
        }
    }

    async execute(interraction) {
        await this.sub[interraction.options.getSubcommand()](interraction);
    }
}

export default rename;
