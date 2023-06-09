import { objectType, extendType, nonNull, stringArg } from "nexus";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";
import { APP_SECRET } from "../utils/auth";

export const AuthPayload = objectType({
  name: "AuthPayload",
  definition(t) {
    t.nonNull.string("token");
    t.nonNull.field("user", {
      type: "User",
    });
  },
});

export const AuthMutation = extendType({
  type: "Mutation",
  definition(t) {
    t.nonNull.field("login", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const user = await context.prisma.user.findUnique({
          where: { email: args.email },
        });
        if (!user) {
          throw new Error("No such user found");
        }

        const valid = await argon2.verify(user.password, args.password);
        if (!valid) {
          throw new Error("Invalid password");
        }

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user,
        };
      },
    });
    t.nonNull.field("signup", {
      type: "AuthPayload",
      args: {
        email: nonNull(stringArg()),
        password: nonNull(stringArg()),
        name: nonNull(stringArg()),
      },
      async resolve(parent, args, context) {
        const { email, name } = args;

        const existedUser = await context.prisma.user.findUnique({
          where: { email: email },
        });

        if (existedUser) {
          throw new Error(
            "The email already has been used, can signup with it."
          );
        }

        const password = await argon2.hash(args.password);

        const user = await context.prisma.user.create({
          data: { email, name, password },
        });

        const token = jwt.sign({ userId: user.id }, APP_SECRET);

        return {
          token,
          user,
        };
      },
    });
  },
});
