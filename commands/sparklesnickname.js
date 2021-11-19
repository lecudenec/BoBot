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
class sparklesnickname extends Command {
    constructor() {
        super();
    }

    getName() {
        return "sparklesnickname";
    }

    getDescription() {
        return "Change ton pseudo !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.String,
            name: "pseudo",
            description: "Ton nouveau pseudo",
            required: true
        }
        ];
    }

    async execute(interraction) {
        try {
            let pseudo = "✨ " + interraction.options.getString('pseudo') + " ✨";
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
            console.log(e);
        }
    }
}

export default sparklesnickname;
