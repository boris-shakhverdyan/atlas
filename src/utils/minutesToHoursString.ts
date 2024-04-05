export function formatMinutesToHours(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    let hoursString = '';
    if (hours > 0) {
        if (hours % 10 === 1 && hours !== 11) {
            hoursString = `${hours} ч.`;
        } else if (hours % 10 > 1 && hours % 10 < 5 && (hours < 10 || hours > 20)) {
            hoursString = `${hours} ч.`;
        } else {
            hoursString = `${hours} ч.`;
        }
    }

    let minutesString = '';
    if (remainingMinutes > 0) {
        minutesString = `${remainingMinutes} мин.`;
    }

    if (hoursString && minutesString) {
        return `${hoursString} ${minutesString}`;
    } else {
        return hoursString || minutesString;
    }
}
