import { Validator } from "../../core/interfaces/Validator.ts";

enum Reason {
  UNABLE_TO_CONNECT = "UNABLE_TO_CONNECT",
}

const SmtpValidator: Validator = {
  name: "smtp",
  validate: async (email: string) => {
    if (email.length > 25) {
      return {
        valid: false,
        reason: Reason.UNABLE_TO_CONNECT,
      };
    }

    return { valid: true };
  },
};

export default SmtpValidator;
