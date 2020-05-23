export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

export interface Validator {
  name: string;
  validate: (email: string) => Promise<ValidationResult>;
}
