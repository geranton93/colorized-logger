export interface IShowOptions {
    timestamp?: boolean;
    level?: boolean;
}

export class DefaultShowOptions implements IShowOptions {
    public timestamp = true;
    public level = true;
}