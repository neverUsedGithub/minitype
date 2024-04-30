import { stringifyError, BaseValidator } from "./base";
import type { Infer, Result, ValidationError } from "../types";

export class UnionValidator<T extends BaseValidator[]> extends BaseValidator {
    public readonly __type: Infer<T[number]> = null as any;

    constructor(private items: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        const errors: ValidationError[] = [];

        for (const item of this.items) {
            const res = item.safeParse(input);

            if (res.success) return res;

            errors.push(res.error);
        }

        return {
            success: false,
            error: {
                error: `value didn't match any member of the union: ${errors
                    .map((err) => `[${stringifyError(err)}]`)
                    .join(" | ")}`,
                path: [],
            },
        };
    }
}

export function union<T extends BaseValidator[]>(...items: T) {
    return new UnionValidator<T>(items);
}
