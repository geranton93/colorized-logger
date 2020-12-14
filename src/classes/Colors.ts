import { IColors } from '../interfaces/Colors';

export class Colors implements IColors {
    public timestampColor = "\x1b[35m";
    public placeColor = "\x1b[36m";
    public message = "\x1b[0m";
}
