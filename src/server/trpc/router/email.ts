import { t } from "../utils";
import { z } from "zod";
import { createTransport } from "nodemailer";
import { env } from "../../env";

export const emailRouter = t.router({
  sendEmail: t.procedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        subject: z.string().max(256),
        message: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { name, email, subject, message } = input;

      const transport = createTransport({
        secure: true,
        port: parseInt(env.EMAIL_SERVER_PORT),
        host: env.EMAIL_SERVER_HOST,
        auth: {
          user: env.EMAIL_SERVER_USER,
          pass: env.EMAIL_SERVER_PASSWORD,
        },
      });

      await transport.sendMail({
        to: env.EMAIL_FROM,
        from: env.EMAIL_FROM,
        replyTo: `${name} <${email}>`,
        subject: `${subject} - [contact form]`,
        text: message,
      });
    }),
});
