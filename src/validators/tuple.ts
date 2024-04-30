import { BaseValidator } from "./base";
import type { Infer, Result, ValidationError } from "../types";

export class TupleValidator<T extends [BaseValidator, ...BaseValidator[]] | []> extends BaseValidator {
    public readonly __type: { [K in keyof T]: Infer<T[K]> } = null as any;

    constructor(private items: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (!Array.isArray(input))
            return {
                success: false,
                error: { path: [], error: "value is not an array" },
            };

        if (input.length !== this.items.length)
            return { success: false, error: { path: [], error: `length is not ${this.items.length}` } };

        for (let i = 0; i < this.items.length; i++) {
            const res = this.items[i].safeParse(input[i]);

            if (!res.success) return { success: false, error: { path: [i], error: res.error.error } };
        }

        return { success: true, data: input as any };
    }
}

export function tuple<T extends [BaseValidator, ...BaseValidator[]] | []>(item: T) {
    return new TupleValidator<T>(item);
}
