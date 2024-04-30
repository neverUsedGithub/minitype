import { BaseValidator } from "./base";
import { ValidationError, Result } from "../types";

const EMAIL_REGEX =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export class EmailValidator extends BaseValidator {
    public readonly __type: string = null as any;

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (EMAIL_REGEX.test(input)) {
            return {
                success: true,
                data: input,
            };
        }

        return {
            success: false,
            error: {
                error: "value is not a valid email address",
                path: [],
            },
        };
    }
}

export function email() {
    return new EmailValidator();
}
