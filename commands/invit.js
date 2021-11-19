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

class invit extends Command {
    constructor() {
        super();
    }

    getName() {
        return "invit";
    }

    getDescription() {
        return "Crée un lien d'invitation du BoBot";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        await interraction.reply({ content: "Lien : https://discord.com/api/oauth2/authorize?client_id=788808098625224764&permissions=8&scope=bot%20applications.commands", ephemeral: false });
    }
}

export default invit;
