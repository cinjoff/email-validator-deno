import { RouterContext } from "../../deps.ts";
import HttpMethod from "../enums/HttpMethod.ts";

export default interface Route {
  path: string;
  method: HttpMethod;
  handler: (ctx: RouterContext) => Promise<any>;
}
