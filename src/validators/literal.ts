import { BaseValidator } from "./base";
import type { Result, ValidationError } from "../types";

export class LiteralValidator<T extends string | number | boolean> extends BaseValidator {
    public readonly __type: T = null as any;

    constructor(private value: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (input === this.value) return { success: true, data: input };

        return {
            success: false,
            error: {
                error: `value is not ${JSON.stringify(this.value)}`,
                path: [],
            },
        };
    }
}

export function literal<T extends string | number | boolean>(value: T) {
    return new LiteralValidator<T>(value);
}
