import { Rule } from '../features/forms/formsSlice';

export const validate = <FormType>(form: FormType, rules: Array<Rule<FormType>>) => {
    const errors: Record<string, string> = {};

    for (const rule of rules) {
        const key = rule.key;
        const value = form[key];
        const pattern = rule.pattern;

        if (pattern && typeof value === 'string') {
            if (!pattern.test(value)) {
                const keyString = key as string;
                errors[keyString] = rule.err || 'Неверный формат';
            }
        }
    }
    return errors;
};
