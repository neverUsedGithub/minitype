import { BaseValidator } from "./base";
import type { Result, ValidationError } from "../types";

export class StringValidator extends BaseValidator {
    public readonly __type: string = null as any;

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (typeof input !== "string")
            return {
                success: false,
                error: { path: [], error: "value is not of type string" },
            };
        return { success: true, data: input };
    }
}

export function string() {
    return new StringValidator();
}
