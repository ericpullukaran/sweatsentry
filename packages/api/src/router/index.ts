import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { exerciesRouter } from "./exercises";
import { userRouter } from "./user";

export const appRouter = router({
  post: postRouter,
  user: userRouter,
  auth: authRouter,
  exercises: exerciesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
