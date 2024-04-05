export const chunkedArray = <T>(arr: T[], chunkLength: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkLength) {
        result.push(arr.slice(i, i + chunkLength) as typeof arr);
    }
    return result;
};
