export function trimStringBasedOnVariable(mainString: string, variable: string): string {
    if (mainString.toLocaleLowerCase().startsWith(variable.toLocaleLowerCase())) {
        return mainString.slice(variable.length);
    }
    return mainString;
}
