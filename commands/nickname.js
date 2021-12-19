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
import { Application } from 'discord.js';

class nickname extends Command {
    constructor() {
        super();
        this.sub = {
            "sparkles": this.exec_sparkles,
            "rename": this.exec_rename
        }
    }

    getName() {
        return "nickname";
    }

    getDescription() {
        return "Change ton pseudo !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.Subcommand,
            name: "sparkles",
            description: "Ton nouveau pseudo entouré de sparkles",
            options: [{
                type: ApplicationCommandOptionType.String,
                name: "pseudo_with_sparkles",
                description: "Pseudo",
                required: true
            }]
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "rename",
            description: "Renome toi !",
            options: [{
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
            let pseudo = "✨ " + interraction.options.getString('pseudo_with_sparkles') + " ✨";
            if (pseudo.length > 32) interraction.reply({ content: "Ton pseudo est trop long !", ephemeral: true});
            else {
                if (interraction.member.manageable){
                    await interraction.member.setNickname(pseudo);
                    await interraction.reply({ content: "Votre pseudo a été modifié !", ephemeral: true });
                }
                else {
                    await interraction.reply({ content: "Votre ne pouvez pas modifier votre pseudo !", ephemeral: true });
                }
            }
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! nickname sparkles");
        }
    }

    async exec_rename(interraction) {
        try {
            let pseudo = interraction.options.getString('pseudo');
            if (pseudo.length > 32) interraction.reply({ content: "Ton pseudo est trop long !", ephemeral: true});
            else {
                if (interraction.member.manageable){
                    await interraction.member.setNickname(pseudo);
                    await interraction.reply({ content: "Votre pseudo a été modifié !", ephemeral: true });
                }
                else {
                    await interraction.reply({ content: "Votre ne pouvez pas modifier votre pseudo !", ephemeral: true });
                }
            }
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! nickname rename");
        }
    }

    async execute(interraction) {
        await this.sub[interraction.options.getSubcommand()](interraction);
    }
}

export default nickname;
