import { HTMLInputTypeAttribute, ReactNode } from 'react';

export interface HasChildrenProps {
    children: ReactNode;
}
export interface HasClassName {
    className?: string;
}
export type Clickable = {
    onClick?: () => void;
};
export interface TextFieldProps {
    inputId: string;
    inputType?: HTMLInputTypeAttribute;
    fieldName: string;
    defaultValue?: string;
    mistake?: string;
    isTextArea?: boolean;
    actWithVal?: (val: any) => void;
}
