import { BaseValidator } from "./base";
import { ArrayValidator } from "./array";
import { StringValidator } from "./string";
import { Result, ValidationError, Infer } from "../types";

export class MaxLengthValidator<T extends StringValidator | ArrayValidator<any>> extends BaseValidator {
    public readonly __type: Infer<T> = null as any;

    constructor(private str: T, private maxLength: number) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        const res = this.str.safeParse(input);

        if (!res.success) return res;
        if (res.data.length > this.maxLength)
            return {
                success: false,
                error: {
                    error: `length of value is more than the maximum value ${this.maxLength}`,
                    path: [],
                },
            };

        return {
            success: true,
            data: res.data,
        };
    }
}

export function maxLength<T extends StringValidator | ArrayValidator<any>>(str: T, length: number) {
    return new MaxLengthValidator(str, length);
}
