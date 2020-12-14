export function stringifyArgObject(args: any[]): any[] {
    return args.map(elem => {
        if (elem instanceof Object) return JSON.stringify(elem);
        if (typeof elem === 'undefined') return '' + elem;
        return elem;
    });
}
