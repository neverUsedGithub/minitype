import { BaseValidator } from "./base";
import { ValidationError, Result } from "../types";

export class RegexValidator extends BaseValidator {
    public readonly __type: string = null as any;

    constructor(private regexp: RegExp) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (this.regexp.test(input)) {
            return {
                success: true,
                data: input,
            };
        }

        return {
            success: false,
            error: {
                error: `value is doesn't match specified regex pattern, ${this.regexp}`,
                path: [],
            },
        };
    }
}

export function regex(regex: RegExp) {
    return new RegexValidator(regex);
}
