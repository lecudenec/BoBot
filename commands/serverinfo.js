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

class serverinfo extends Command {
    constructor() {
        super();
    }

    getName() {
        return "serverinfo";
    }

    getDescription() {
        return "Donne des informations sur le serveur !";
    }

    isReservedToGod() {
        return false;
    }

    async execute(interraction) {
        try{
            const filterLevels = {
                DISABLED: 'Off',
                MEMBERS_WITHOUT_ROLES: 'No Role',
                ALL_MEMBERS: 'Everyone'
            };
    
            const verificationLevels = {
                NONE: 'None',
                LOW: 'Low',
                MEDIUM: 'Medium',
                HIGH: '(╯°□°）╯︵ ┻━┻',
                VERY_HIGH: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
            };
    
            await interraction.reply({ embeds: [{
                color: 0x0099ff,
                title: 'Server Info',
                description: "Information du serveur !",
                thumbnail: {
                    url: interraction.guild.iconURL({ dynamic: true })
                },
                fields: [
                    {
                        name: '***Général***',
                        value: `**Name:** ${interraction.guild.name}\n` +
                        `**ID:** ${interraction.guild.id}\n` +
                        `**Owner:** <@${interraction.guild.ownerId}>\n` +
                        `**Member Count:** ${interraction.guild.memberCount}\n` +
                        `**Boost Tier:** ${interraction.guild.preniumTier ? `Tier ${interraction.guild.preniumTier}` : 'None'}\n` +
                        `**Explicit Filter:** ${filterLevels[interraction.guild.explicitContentFilter]}\n` +
                        `**Verification Level:** ${verificationLevels[interraction.guild.verificationLevel]}\n`
                    }
                ]
            }], ephemeral: false });
        } catch(e){
            await interraction.reply({ content: "Une erreur est survenue !", ephemeral:true });
            Logger.error("Une erreur a eu lieu !", e, "ERR ! serverinfo");
        }
                
        
    }
}

export default serverinfo;
