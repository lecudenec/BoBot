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
import Logger from '../config/Logger.js';

class roll extends Command {
    constructor() {
        super();
    }

    getName() {
        return "roll";
    }

    getDescription() {
        return "Crée un roll !";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.String,
            name: "option",
            description: "Option 1",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option2",
            description: "Option 2",
            required: true
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option3",
            description: "Option 3",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option4",
            description: "Option 4",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option5",
            description: "Option 5",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option6",
            description: "Option 6",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option7",
            description: "Option 7",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option8",
            description: "Option 8",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option9",
            description: "Option 9",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option10",
            description: "Option 10",
            required: false
        },
        {
            type: ApplicationCommandOptionType.String,
            name: "option11",
            description: "Option 11",
            required: false
        }
        ];
    }


    async execute(interraction) {
        try{
            let alea = [interraction.options.getString('option'), interraction.options.getString('option2')];
            if(interraction.options.getString('option3') !== null) alea.push(interraction.options.getString('option3'));
            if(interraction.options.getString('option4') !== null) alea.push(interraction.options.getString('option4'));
            if(interraction.options.getString('option5') !== null) alea.push(interraction.options.getString('option5'));
            if(interraction.options.getString('option6') !== null) alea.push(interraction.options.getString('option6'));
            if(interraction.options.getString('option7') !== null) alea.push(interraction.options.getString('option7'));
            if(interraction.options.getString('option8') !== null) alea.push(interraction.options.getString('option8'));
            if(interraction.options.getString('option9') !== null) alea.push(interraction.options.getString('option9'));
            if(interraction.options.getString('option10') !== null) alea.push(interraction.options.getString('option10'));
            if(interraction.options.getString('option11') !== null) alea.push(interraction.options.getString('option11'));

            let nb = Math.floor(Math.random() * (alea.length)) + 0; 
            await interraction.reply("Les options disponibles sont " + alea +"\nEt l'option choisi est : " + alea[nb]);
        }
        catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! embed");
        }
        
    }
}

export default roll;
