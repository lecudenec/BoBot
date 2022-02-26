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

class piece extends Command {
    constructor() {
        super();
    }

    getName() {
        return "piece";
    }

    getDescription() {
        return "Pile ou face !";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        let alea = Math.floor(Math.random() * (101 - 0)) + 0;  
        if (alea <= 50) await interraction.reply("Pile !");
        else await interraction.reply("Face !");
    }
}

export default piece;
