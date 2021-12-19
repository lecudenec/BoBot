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
import Logger from '../config/Logger.js';
import fs from 'fs';

import { ApplicationCommandOptionType } from 'discord-api-types/v9';
class nonPing extends Command {
    constructor() {
        super();
        this.sub = {
            "add": this.exec_add,
            "delete": this.exec_delete
        }
    }

    getName() {
        return "nonping";
    }

    getDescription() {
        return "Permet de ne plus se faire ping par le bot";
    }

    isReservedToGod() {
        return false;
    }

    getOptions() {
        return [{
            type: ApplicationCommandOptionType.Subcommand,
            name: "add",
            description: "Ajoute toi comme non pingable",
        }, {
            type: ApplicationCommandOptionType.Subcommand,
            name: "delete",
            description: "Tu pourras te faire ping !",
        }
        ];
    }

    async exec_add(interraction){
        try {
            let userNonPingList = (fs.readFileSync(`data/nonPingList.txt`, {encoding: "utf-8"})).toString().split(';');
            let test = true;
            for(let w = 0; w<userNonPingList.length; w++){
                if (interraction.user.id.toString() === userNonPingList[w].toString()){
                    test = false;
                }
            }

            if (test) {
                let userNonPing = interraction.user;
                fs.appendFileSync(`data/nonPingList.txt`, userNonPing.id.toString() + ";");
                await interraction.reply({ content: "Vous avez été ajouté !", ephemeral:true});
            }
            else {
                await interraction.reply({ content: "Vous êtes déjà non pingable !", ephemeral:true});

            }
            
        } catch (e) {
            await interraction.reply({ content: "Un problème a été rencontré !", ephemeral:true});
            Logger.error("Une erreur est survenue ! ", e, "ERR ! nonPing add");
        }
    }

    async exec_delete(interraction){
        try {
            let userNonPingList = (fs.readFileSync(`data/nonPingList.txt`, {encoding: "utf-8"})).toString().split(';');
            let message = "";

            for(let w = 0; w<userNonPingList.length; w++){
                if (interraction.user.id.toString() !== userNonPingList[w].toString() && userNonPingList[w] !== null && userNonPingList[w].toString() !== ""){
                    message += userNonPingList[w].toString() + ";";
                }
            }

            
            fs.writeFileSync(`data/nonPingList.txt`, message);
            await interraction.reply({ content: `Vous pouvez à nouveau vous faire ping !`, ephemeral: true });
            
        } catch (e) {
            await interraction.reply({ content: "Un problème a été rencontré !", ephemeral:true});
            Logger.error("Une erreur est survenue ! ", e, "ERR ! nonPing delete");
        }
    }

    async execute(interraction) {
        await this.sub[interraction.options.getSubcommand()](interraction);
    }
}

export default nonPing;
