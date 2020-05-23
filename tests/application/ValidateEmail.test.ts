import { assertEquals } from "../deps.ts";
import { ValidateEmail } from "../../src/application/ValidateEmail.ts";

const validateEmail = new ValidateEmail();

Deno.test("fails when email is ''", async () => {
  const res = await validateEmail.execute({ email: "" })
  assertEquals(res, {
    valid: false,
    validators: {
      regex: {
        valid: false,
      },
      domain: {
        valid: false,
        reason: "INVALID_TLD"
      },
      smtp: {
        valid: true,
      }
    }
  })
});

Deno.test("fails when the domain is invalid", async () => {
    const res = await validateEmail.execute({ email: "somebody@msn.com" })
    assertEquals(res, {
      valid: false,
      validators: {
        regex: {
          valid: true
        },
        domain: {
          valid: false,
          reason: "INVALID_TLD"
        },
        smtp: {
          valid: true
        }
      }
    })
});

Deno.test("fails when the email string does not contain @", async () => {
  const res = await validateEmail.execute({ email: "somebodymsn.com" })
  assertEquals(res, {
    valid: false,
    validators: {
      regex: {
        valid: false,
      },
      domain: {
        valid: false,
        reason: "INVALID_TLD"
      },
      smtp: {
        valid: true
      }
    }
  })
});

Deno.test("fails when length is > 25 (simulates SMTP failure)", async () => {
  const res = await validateEmail.execute({ email: "abcdeabcdeabcdeabcde@gmail.com" })
  assertEquals(res, {
    valid: false,
    validators: {
      regex: {
        valid: true,
      },
      domain: {
        valid: true,
      },
      smtp: {
        valid: false,
        reason: "UNABLE_TO_CONNECT"
      }
    }
  })
});


Deno.test("succeeds with somebody@rekki.com", async () => {
  const res = await validateEmail.execute({ email: "somebody@rekki.com" })
  assertEquals(res, {
    valid: true,
    validators: {
      regex: {
        valid: true,
      },
      domain: {
        valid: true,
      },
      smtp: {
        valid: true,
      }
    }
  })
});
