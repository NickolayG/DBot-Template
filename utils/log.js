const fs = require('node:fs');
const path = require('node:path');
//
//
module.exports = class Logger {
    /**
     * @param {string} msg
     * @param {'INFO' | 'WARN' | 'ERROR'} level 
    */
    static toConsole(msg, level = 'info') {
        if (typeof msg != 'string') {
            throw new Error('Message must be a string!');
        }

        level = level.toUpperCase();

        const logMessage = `[${level}] ${msg}`;

        if (level === 'INFO') {
            // Log to file
            this.toFile(logMessage);

            return console.log(logMessage);
        }
        if (level === 'WARN') {
            // Log to file
            this.toFile(logMessage);

            return console.warn(logMessage);
        }
        if (level === 'ERROR') {
            // Log to file
            this.toFile(logMessage);
            
            return console.error(logMessage);

        } else {
            throw new Error('Level incorrect! Use "info", "warn", or "error"!');
        }
        
    }

    /**
     * @param {string} msg
     */
    static toFile(input) {
        // Log Folder
        const folderPath = path.resolve(__dirname, '../../logs');

        // If folder does not exist create one
        if (!fs.existsSync(folderPath)) {
            console.log('Log folder does not exist, creating one...')

            fs.mkdirSync(folderPath, (error) => {
                if (error) {
                    throw new Error('Could not make Error folder');
                } else {
                    console.log('Log folder created!');
                }
            });
        }

        // Create Time
        const timeDef = new Date();
        const seconds = timeDef.getSeconds().toString().padStart(2, '0');
        const minutes = timeDef.getMinutes().toString().padStart(2, '0');
        const hours = timeDef.getHours().toString().padStart(2, '0');
        const day = timeDef.getDate().toString().padStart(2, '0');
        const month = (timeDef.getMonth() + 1).toString().padStart(2, '0');
        const year = timeDef.getFullYear();

        // File Handling
        const fileName = day + '-' + month + '-' + year + '.txt';
        const filePath = path.join(folderPath, fileName);

        // File Content
        const header = 'Log File: ' + fileName + '\n--------------------\n\n';
        const content = (hours + '-' + minutes + '-' + seconds) + ': ' + input + '\n';

        // If file does not exist write new one
        if (!fs.existsSync(filePath)) {
            console.log('File does not exist, creating one...')
            fs.writeFile(filePath, (header + content), (error) => {
                if (error) {
                    throw new Error('Could not create log file: ' + error);
                } else {
                    console.log('Log file created!');
                }
            });
        }

        // If file exists append new content
        if (fs.existsSync(filePath)) {
            fs.appendFile(filePath, content, (error) => {
                if (error) {
                    throw new Error('Could not write to log file: ' + error);
                }
            })
        }
    }
    
    static toDatabase() {
        //
    }

    static toMail() {
        //
    }
}