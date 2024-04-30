import { BaseValidator } from "./base";
import type { Infer, Result, ValidationError } from "../types";

export class OptionalValidator<T extends BaseValidator> extends BaseValidator {
    public readonly __type: Infer<T> | undefined = null as any;

    constructor(private value: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        return this.value.safeParse(input);
    }
}

export function optional<T extends BaseValidator>(value: T) {
    return new OptionalValidator<T>(value);
}
