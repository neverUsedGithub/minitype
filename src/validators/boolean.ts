import { BaseValidator } from "./base";
import type { Result, ValidationError } from "../types";

export class BooleanValiator extends BaseValidator {
    public readonly __type: boolean = null as any;

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (typeof input !== "boolean")
            return {
                success: false,
                error: { path: [], error: "value is not of type boolean" },
            };
        return { success: true, data: input };
    }
}

export function boolean() {
    return new BooleanValiator();
}
