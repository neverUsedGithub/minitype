import { BaseValidator } from "./base";
import type { Result, ValidationError } from "..";

export class NumberValidator extends BaseValidator {
    public readonly __type: number = null as any;

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (typeof input !== "number")
            return {
                success: false,
                error: { path: [], error: "value is not of type number" },
            };
        return { success: true, data: input };
    }
}

export function number() {
    return new NumberValidator();
}
