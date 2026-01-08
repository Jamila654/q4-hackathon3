import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: {
    type: "sqlite",
    url: "./auth.db",
  },
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "student",
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;