import { BaseValidator } from "./base";
import type { Infer, Result, ValidationError } from "../types";

export class ArrayValidator<T extends BaseValidator> extends BaseValidator {
    public readonly __type: Infer<T>[] = null as any;

    constructor(private item: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (!Array.isArray(input))
            return {
                success: false,
                error: { path: [], error: "value is not an array" },
            };

        for (let i = 0; i < input.length; i++) {
            const res = this.item.safeParse(input[i]);

            if (!res.success) return { success: false, error: { path: [i], error: res.error.error } };
        }

        return { success: true, data: input };
    }
}

export function array<T extends BaseValidator>(item: T) {
    return new ArrayValidator<T>(item);
}
