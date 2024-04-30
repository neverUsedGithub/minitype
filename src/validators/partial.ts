import { BaseValidator } from "./base";
import { ObjectValidator } from "./object";
import type { Result, ValidationError, Infer } from "../types";
import { OptionalValidator, optional } from "./optional";

export class PartialValidator<T extends ObjectValidator<any>> extends BaseValidator {
    public readonly __type: { [K in keyof T["shape"]]?: Infer<T["shape"][K]> } = null as any;

    constructor(private obj: T) {
        super();
        for (const key in this.obj.shape) {
            if (!(this.obj.shape[key] instanceof OptionalValidator))
                this.obj.shape[key] = optional(this.obj.shape[key]);
        }
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        return this.obj.safeParse(input);
    }
}

export function partial<T extends ObjectValidator<any>>(obj: T) {
    return new PartialValidator<T>(obj);
}
