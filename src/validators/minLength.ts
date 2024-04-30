import { BaseValidator } from "./base";
import { ArrayValidator } from "./array";
import { StringValidator } from "./string";
import { Result, ValidationError, Infer } from "../types";

export class MinLengthValidator<T extends StringValidator | ArrayValidator<any>> extends BaseValidator {
    public readonly __type: Infer<T> = null as any;

    constructor(private str: T, private minLength: number) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        const res = this.str.safeParse(input);

        if (!res.success) return res;
        if (res.data.length < this.minLength)
            return {
                success: false,
                error: {
                    error: `length of value is less than the minimum value ${this.minLength}`,
                    path: [],
                },
            };

        return {
            success: true,
            data: res.data,
        };
    }
}

export function minLength<T extends StringValidator | ArrayValidator<any>>(str: T, length: number) {
    return new MinLengthValidator(str, length);
}
