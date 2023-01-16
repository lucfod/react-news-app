import { expressjwt } from "express-jwt";
import { Config } from "../config";

function authMW() {
  return expressjwt({
    secret: Config.jwt_access,
    algorithms: ["HS256"],
  }).unless({
    path: [
      // public routes that don't require authentication
      { url: "/api/auth/register" },
      { url: "/api/auth/signin" },
      { url: "/api/auth/refresh-token" },
      { url: "/api/posts" },
    ],
  });
}

export default authMW;
