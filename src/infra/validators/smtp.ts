import { Validator } from "../../core/interfaces/Validator.ts";

enum Reason {
  UNABLE_TO_CONNECT = "UNABLE_TO_CONNECT",
}

const SmtpValidator: Validator = {
  name: "smtp",
  validate: async (email: string) => {
    console.log(email)
    console.log(email.length)
    if (email.length > 25) {
      console.log("LENGTH EXCEEDS")
      return {
        valid: false,
        reason: Reason.UNABLE_TO_CONNECT,
      };
    }

    return { valid: true };
  },
};

export default SmtpValidator;
