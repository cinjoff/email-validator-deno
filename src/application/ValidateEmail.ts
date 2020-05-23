import validators from "../infra/validators/index.ts";
import { Operation } from "../core/interfaces/Operation.ts";
import { Validator } from "../core/interfaces/Validator.ts";

export type Payload = {
  email: string;
};

interface Response {
  valid: boolean;
  validators: {
    [name: string]: {
      valid: true;
      reason?: string;
    };
  };
}
export class ValidateEmail implements Operation<Payload, Response> {
  async execute(payload: Payload): Promise<Response> {
    const validationResults = await Promise.all(
      validators.map(async (validator: Validator) => {
        return {
          name: validator.name,
          result: await validator.validate(payload.email),
        };
      }),
    );

    // from: Array<{name, { valid, reason }}>
    // to: { name: { valid, reason } }
    const validationResponse = validationResults
      .reduce((acc: { [key: string]: any }, cur) => {
        acc[cur.name] = cur.result;
        return acc;
      }, {});

    return {
      valid: validationResults.every(({ result }) => result.valid),
      validators: validationResponse,
    };
  }
}
