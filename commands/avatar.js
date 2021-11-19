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
import { MessageEmbed } from 'discord.js';

class avatar extends Command {
    constructor() {
        super();
    }

    getName() {
        return "avatar";
    }

    getDescription() {
        return "Donne l'avatar d'une personne !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.User,
            name: "user",
            description: "La personne",
            required: false
        }
        ];
    }

    async execute(interraction) {
        try {
            let user = interraction.options.getMember('user');
            if (user === null){
                await interraction.reply({ embeds: [{
                    title: "Avatar",
                    image: {
                        url: await interraction.member.displayAvatarURL({dymaic: true})
                    },
                    color:0x0099ff
                }] });
            }
            else {
                await interraction.reply({ embeds: [{
                    title: "Avatar",
                    image: {
                        url: await user.displayAvatarURL({dymaic: true})
                    },
                    color:0x0099ff
                }] });
            }
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            console.log(e);
        }
    }
}

export default avatar;
