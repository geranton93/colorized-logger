import { ILevelColors, FormatColors } from '../..';

export class LevelColors implements ILevelColors {
    public info: string = FormatColors.Blue;
    public error: string = FormatColors.Red;
    public warn: string = FormatColors.Yellow;
    public debug: string = FormatColors.Green;
}