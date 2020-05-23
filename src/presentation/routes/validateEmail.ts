import { RouterContext } from "../../deps.ts";
import { ValidateEmail } from "../../application/ValidateEmail.ts";
import HttpMethod from "../../core/enums/HttpMethod.ts";
import Route from "../../core/interfaces/Route.ts";

const validateEmail = new ValidateEmail();

const route: Route = {
  path: "/email/validate",
  method: HttpMethod.POST,
  handler: async (ctx: RouterContext) => {
    if (!ctx.request.hasBody) {
      ctx.throw(400, "Body is missing in the request");
    }

    try {
      const { value: payload } = await ctx.request.body();

      ctx.response.body = await validateEmail.execute(payload);
      ctx.response.status = 200;
    } catch (err) {
      ctx.throw(
        500,
        "Unexpected error while trying to validate email",
      );
    }
  },
};

export default route;
