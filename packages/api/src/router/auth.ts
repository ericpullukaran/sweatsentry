import { protectedProcedure, publicProcedure, router } from "../trpc";

export const authRouter = router({
  getUser: protectedProcedure.query(({ ctx }) => {
    return ctx.auth.user;
  }),
  getSession: publicProcedure.query(({ ctx }) => {
    return ctx.auth.session;
  }),
  getSecretMessage: protectedProcedure.query(() => {
    return "you can see this secret message!";
  }),
});
