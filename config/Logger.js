/**
 * Copyright © 2021 Maxime Friess <M4x1me@pm.me>
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

import process from "process";

class Logger{
    constructor(){
    }

    __write(string, prefix, logfnc){
        const date = new Date().toISOString();
        const pref = "[" + date + "][" + prefix + "] ";

        for (let line of string.toString().split('\n')){
            logfnc(pref + line);
        }
    }

    info(message){
        this.__write(message, "INFO", console.info);
    }

    warn(message){
        this.__write(message, "WARN", console.warn);
    }

    error(message, error){
        this.__write(message, "ERR!", console.error)
        if(error != undefined) this.__write(error.stack, "ERR!", console.error);
    }

    fatal(message, error, code){
        this.__write(message, "FTAL", console.error);
        if(error != undefined) this.__write(error.stack, "FTAL", console.error);
        process.exit(code !== undefined ? code : -1);
    }
}

export default new Logger();