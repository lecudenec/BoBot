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

class lejeu extends Command {
    constructor() {
        super();
    }

    getName() {
        return "lejeu";
    }

    getDescription() {
        return "Ping une personne au hasard";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        let liste = [];
        await interraction.guild.members.fetch()
          .then((i) => {
              liste.push(i);
          });
          
        let i = Math.floor(Math.random() * liste[0].size);
        let j = 0;
        let userPing;
        for (var [key, value] of liste[0]){
            if(j == i){
                userPing = value.user.id;
            }

            j++;
        }
        await interraction.reply({ content: "<@" + userPing + "> Le Jeu !"});
    }
}

export default lejeu;
