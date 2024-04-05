export function extractDigits(phoneNumber: string): string {
    // Используем регулярное выражение для удаления всего, кроме цифр
    const phoneNormalized = phoneNumber.replace(/\D/g, '');
    const phoneFirstDigit = Number(phoneNormalized[0]) + 1;

    const phoneWithoutFirstDigit = phoneNormalized.slice(1, phoneNormalized.length);
    console.log(`${phoneFirstDigit}${phoneWithoutFirstDigit}`);

    return `${phoneFirstDigit}${phoneWithoutFirstDigit}`;
}
