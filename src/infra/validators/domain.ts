import { Validator } from "../../core/interfaces/Validator.ts";

/**
 * List of known domain names to check against
 */
const KNOWN_DOMAINS = [
  "@rekki.com",
  "@gmail.com",
  "@yahoo.com",
  "@abv.bg",
];

enum Reason {
  INVALID_TLD = "INVALID_TLD",
}

const DomainValidator: Validator = {
  name: "domain",
  validate: async (email: string) => {
    if (KNOWN_DOMAINS.some((domain) => email.endsWith(domain))) {
      return { valid: true };
    }

    return {
      valid: false,
      reason: Reason.INVALID_TLD,
    };
  },
};

export default DomainValidator;
