import { FormatColors } from './const';

export interface ILevelColors {
    info?: string;
    error?: string;
    warn?: string;
    debug?: string;
}

export interface IColors {
    timeColor: string;
    placeColor: string;
    levelColors: LevelColors;
}

export class LevelColors implements ILevelColors {
    public info = FormatColors.Blue;
    public error = FormatColors.Red;
    public warn = FormatColors.Yellow;
    public debug = FormatColors.Green;
}

export class Colors implements IColors {
    public timeColor = "\x1b[35m";
    public placeColor = "\x1b[36m";
    public levelColors = new LevelColors();
}