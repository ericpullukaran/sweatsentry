/* create user */
//grab the images for the corresponding user
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});

//question: can we get the id from ctx instead of input?
//or will there be no ctx yet because the user is not created yet?
//answer: no, ctx is not available yet because the user is not created yet
