/**
 * Copyright © 2021 Maxime Friess <M4x1me@pm.me>
 * 
 * This file is part of Seb-BOT.
 * 
 * Seb-BOT is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 * 
 * Seb-BOT is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 * 
 * You should have received a copy of the GNU General Public License
 * along with Seb-BOT.  If not, see <https://www.gnu.org/licenses/>.
 */


class DMCommand {
    constructor() {
        if (this.constructor === DMCommand) {
            throw new TypeError('Abstract class "DMCommand" cannot be instantiated directly');
        }
    }

    getName() {
        throw new TypeError('Abstract method "getName" of class "DMCommand" cannot be used directly');
    }

    getUsage() {
        return this.getName();
    }

    getDescription() {
        throw new TypeError('Abstract method "getDescription" of class "DMCommand" cannot be used directly');
    }

    getArgumentsRegex() {
        return "";
    }

    async execute(message, content, args) {
        throw new TypeError('Abstract method "execute" of class "DMCommand" cannot be used directly');
    }

    getConfigs() {
        return [];
    }

    isReservedToGod() {
        return true;
    }

    getCommandRegex() {
        let ar = this.getArgumentsRegex();
        return new RegExp("^" + this.getName() + (ar !== "" ? " " + ar : "") + "$");
    }
}

export default DMCommand;
