import { type BaseValidator } from "./validators/base";

export type Infer<T extends BaseValidator> = T["__type"];
export type Result<TSuccess, TError> = { success: true; data: TSuccess } | { success: false; error: TError };

export interface ValidationError {
    path: (string | number)[];
    error: string;
}

type Magic<T> = T;
export type Flatten<T> = Magic<{ [k in keyof T]: T[k] }>;
