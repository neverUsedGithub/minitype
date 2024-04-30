import type { Result, ValidationError } from "../types";

export function stringifyError(error: ValidationError): string {
    if (error.path.length === 0) return error.error;
    return `at @.${error.path.join(".")}, ${error.error}`;
}

export abstract class BaseValidator {
    public abstract readonly __type: any;

    abstract safeParse(input: any): Result<this["__type"], ValidationError>;

    parse(input: any): this["__type"] {
        const res = this.safeParse(input);
        if (!res.success) throw new Error(`Validation of input failed: ${stringifyError(res.error)}`);
        return res.data;
    }
}
