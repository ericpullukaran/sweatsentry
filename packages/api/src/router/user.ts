/* create user */
//grab the images for the corresponding user
import { router, protectedProcedure } from "../trpc";

export const userRouter = router({
  current: protectedProcedure.query(({ ctx }) => {
    const publicUserAuthDetails = {
      id: ctx.user.id,
      email: ctx.user.emailAddresses[0]?.emailAddress,
      firstName: ctx.user.firstName,
      lastName: ctx.user.lastName,
      avatar: ctx.user.profileImageUrl,
    };
    return publicUserAuthDetails;
  }),
});

//question: can we get the id from ctx instead of input?
//or will there be no ctx yet because the user is not created yet?
//answer: no, ctx is not available yet because the user is not created yet
