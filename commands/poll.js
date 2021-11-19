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

class poll extends Command {
    constructor() {
        super();
    }

    getName() {
        return "poll";
    }

    getDescription() {
        return "Effectue un poll";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [
        {
            type: ApplicationCommandOptionType.String,
            name: "message",
            description: "Le message du poll",
            required: true
        },{
            type: ApplicationCommandOptionType.String,
            name: "titre",
            description: "Le titre du poll",
            required: false
        }
        ];
    }

    async execute(interraction) {
        try {
            let titre = interraction.options.getString('titre');
            if(titre === null) titre = "";

            const message = interraction.options.getString('message');

            const f = await interraction.reply({ embeds: [{
                title: titre,
                description: message,
                color: 0x0099ff,
            }], fetchReply: true});
            await f.react("✅");
            await f.react("❌");
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            console.log(e);
        }
    }
}

export default poll;
