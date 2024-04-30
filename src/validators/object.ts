import { BaseValidator } from "./base";
import { OptionalValidator } from "./optional";
import type { Infer, ValidationError, Result, Flatten } from "../types";

export class ObjectValidator<T extends Record<string, BaseValidator>> extends BaseValidator {
    public readonly __type: Flatten<
        {
            [K in keyof T as T[K] extends OptionalValidator<any> ? never : K]: Infer<T[K]>;
        } & {
            [K in keyof T as T[K] extends OptionalValidator<any> ? K : never]?: Infer<T[K]>;
        }
    > = null as any;

    constructor(public shape: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (typeof input !== "object")
            return {
                success: false,
                error: { path: [], error: "value is not of type object" },
            };

        for (const [key, value] of Object.entries(this.shape)) {
            if (!(key in input) && !(value instanceof OptionalValidator))
                return {
                    success: false,
                    error: { path: [], error: `object is missing required key '${key}'` },
                };

            if (!(key in input)) continue;

            const res = value.safeParse(input[key]);

            if (!res.success)
                return {
                    success: false,
                    error: { path: [key, ...res.error.path], error: res.error.error },
                };
        }

        for (const key in input)
            if (!(key in this.shape))
                return {
                    success: false,
                    error: { path: [], error: `object contains unexpected key '${key}'` },
                };

        return { success: true, data: input };
    }
}

export function object<T extends Record<string, BaseValidator>>(items: T) {
    return new ObjectValidator<T>(items);
}
