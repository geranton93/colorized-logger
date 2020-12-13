import { format, transports, createLogger, Logger, LoggerOptions } from "winston";
import { Colors, IColors } from './Colors';
import { dateTimeFormat, Level } from './const';
import { stringifyArgObject } from './helpers/stringifier';
import { DefaultShowOptions, IShowOptions } from './Options';


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
    private timeStampFormat: string;
    private showOptions: IShowOptions;

    
    /**
     * Creates an instance of ColorizedLogger.
     * 
     * @param {Level} [level]
     * @param {IColors} [colors]
     * @param {string} [timeStampFormat] 
     * @memberof ColorizedLogger
     */
    public constructor(level?: Level, colors?: IColors, timeStampFormat?: string, showOptions?: IShowOptions) {
        this.place = "";
        this.colors = Object.assign(new Colors(), colors || {});
        this.level = level;
        this.timeStampFormat = timeStampFormat || dateTimeFormat;
        this.showOptions = Object.assign(new DefaultShowOptions(), showOptions);
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
        const { info, error, warn, debug } = this.colors.levelColors;

        const loggerOptions: LoggerOptions = {
            transports: [new transports.Console()],
            format: format.combine(
                format.errors({ stack: true }),
                format.timestamp({
                    format: this.timeStampFormat,
                }),
                format.colorize({
                    colors: { info, error, warn, debug }
                }),
                format.align(),
                format.printf(log => {
                    const timeStamp = `${this.colors.timeColor} ${log.timestamp} \x1b[0m$`;
                    const level = `[${log.level}]`;

                    if (log.stack) log.message = `${log.message}, \n Stack${log.stack}`;
                    return `${this.showOptions.timestamp ? timeStamp : ""} ${this.showOptions.level ? level : ""}${this.place ? ` [${this.colors.placeColor}${this.place}\x1b[0m]` : ""
                        }: ${log.message}`;
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

    public setTimeStampFormat(timeStampFormat: string): ColorizedLogger {
        this.timeStampFormat = timeStampFormat;
        return this;
    }

    public setShowOptions(showOptions: IShowOptions): ColorizedLogger {
        this.showOptions = Object.assign(new DefaultShowOptions(), showOptions);
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
