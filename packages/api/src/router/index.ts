import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { exerciesRouter } from "./exercises";
import { userRouter } from "./user";
import { workoutsRouter } from "./workouts";

export const appRouter = router({
  post: postRouter,
  user: userRouter,
  auth: authRouter,
  exercises: exerciesRouter,
  workouts: workoutsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
