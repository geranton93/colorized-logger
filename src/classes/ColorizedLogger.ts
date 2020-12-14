import { format, transports, createLogger, Logger, LoggerOptions } from "winston";
import { Colors, LevelColors, DefaultShowOptions, Braces } from './';
import { dateTimeFormat } from '../const';
import { stringifyArgObject } from '../helpers/stringifier';
import { IShowOptions, ILevelColors, IColors, IBraces } from '../interfaces';
import { Level } from '../enums';


/**
 * Cororized logger based on winston logger with customizing colors and log elements
 *
 * @param {string?} level  
 * @export
 * @class ColorizedLogger
 */
export class ColorizedLogger {
    private place: string;
    private colors: Colors;
    private logger: Logger;
    private level?: Level;
    private timestampFormat: string;
    private showOptions: IShowOptions;
    private levelColors: ILevelColors;
    private braces: IBraces;


    /**
     * Creates an instance of ColorizedLogger.
     * 
     * @param {Level} [level]
     * @param {IColors} [colors]
     * @param {string} [timestampFormat] 
     * @memberof ColorizedLogger
     */
    public constructor(level?: Level) {
        this.place = "";
        this.colors = new Colors();
        this.levelColors = new LevelColors();
        this.level = level;
        this.timestampFormat = dateTimeFormat;
        this.showOptions = new DefaultShowOptions();
        this.braces = new Braces();
        this.logger = this.createWinstonLogger();
    }

    /**
     * Creates an instance of winston logger 
     *
     * @private
     * @returns {Logger}
     * @memberof ColorizedLogger
     */
    private createWinstonLogger(): Logger {
        const { info, error, warn, debug } = this.levelColors;

        const loggerOptions: LoggerOptions = {
            transports: [new transports.Console()],
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({
                    format: this.timestampFormat,
                }),
                format.colorize({
                    colors: { info, error, warn, debug }
                }),
                format.align(),
                format.printf(log => {
                    log.message = log.message.substring(1);

                    const timestamp = `${this.braces.timestamp[0]}${this.colors.timestampColor}${log.timestamp}\x1b[0m${this.braces.timestamp[1]}`;
                    const level = `${this.braces.level[0]}${log.level}${this.braces.level[1]}`;
                    const place = `${this.braces.location[0]}${this.colors.placeColor}${this.place}\x1b[0m${this.braces.location[1]}`;

                    const timestampClause = this.showOptions.timestamp ? timestamp : "";
                    const levelClause = this.showOptions.level ? "" + level : "";
                    const placeClause = this.place ? place : "";

                    if (log.stack) log.message = `${log.message}, \n Stack${log.stack}`;

                    return `${timestampClause}${levelClause}${placeClause}${(timestampClause || levelClause || placeClause) ? ': ' : ''}${this.colors.message}${log.message}\x1b[0m`;
                })
            )
        };

        if (this.level) loggerOptions.level = this.level;

        return createLogger(loggerOptions);
    }

    /**
     * Set location of logger instance where new instanсe was created
     *
     * @param {string} place
     * @memberof Logger
     * @return {Logger}
     */
    public setLocation(place: string): ColorizedLogger {
        this.place = place;
        return this;
    }

    /**
     * Set colors for elements
     *
     * @param {IColors} colors
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public setColors(colors: IColors): ColorizedLogger {
        this.colors = Object.assign(this.colors, colors || {});
        return this;
    }

    /**
     * Change default timestamp format. By default timestamp is YYYY.MM.DD HH:mm:ss:SSS
     *
     * @param {string} timestampFormat
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public setTimeStampFormat(timestampFormat: string): ColorizedLogger {
        this.timestampFormat = timestampFormat;
        this.logger = this.createWinstonLogger();
        return this;
    }

    /**
     * Change braces for all objects in logs
     *
     * @param {string[]} braces must look like ['[', ']'] or ['', '']
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public setBracesTypeForAll(braces: string[]): ColorizedLogger {
        Object.keys(this.braces).forEach(key => {
            this.braces[key] = braces;
        });
        return this;
    }

    /**
     * Change braces for objects in logs 
     *
     * @param {IBraces} braces
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public setBracesType(braces: IBraces): ColorizedLogger {
        this.braces = Object.assign(this.braces, braces);
        return this;
    }


    /**
     * Set for braces default values
     *
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public resetBraces(): ColorizedLogger {
        this.braces = new Braces();
        return this;
    }

    /**
     * Can disable/enable timestamp/level showing in log
     * Everything is enabled by default
     *
     * @param {IShowOptions} showOptions
     * @returns {ColorizedLogger}
     * @memberof ColorizedLogger
     */
    public setShowOptions(showOptions: IShowOptions): ColorizedLogger {
        this.showOptions = Object.assign(this.showOptions, showOptions);
        return this;
    }

    public warn(...args: any[]): void {
        const argElements = stringifyArgObject([...args]);
        this.logger.warn(argElements);
    }

    public info(...args: any[]): void {
        const argElements = stringifyArgObject([...args]);
        this.logger.info(argElements);
    }

    public debug(...args: any[]): void {
        const argElements = stringifyArgObject([...args]);
        this.logger.debug(argElements);
    }

    public error(...args: any[]): void {
        const argElements = stringifyArgObject([...args]);
        this.logger.error(argElements);
    }
}
