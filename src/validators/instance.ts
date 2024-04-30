import { BaseValidator } from "./base";
import type { ValidationError, Result } from "../types";

export class InstanceValidator<T extends { new (): any }> extends BaseValidator {
    public readonly __type: T = null as any;

    constructor(private clss: T) {
        super();
    }

    safeParse(input: any): Result<this["__type"], ValidationError> {
        if (input instanceof this.clss) {
            return {
                success: true,
                data: input,
            };
        }

        return {
            success: false,
            error: {
                error: `value is not instance of class '${this.clss.name}'`,
                path: [],
            },
        };
    }
}

export function instance<T extends { new (): any }>(clss: T) {
    return new InstanceValidator<T>(clss);
}
