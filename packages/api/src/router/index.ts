import { router } from "../trpc";
import { postRouter } from "./post";
import { authRouter } from "./auth";
import { exerciesRouter } from "./exercises";

export const appRouter = router({
  post: postRouter,
  auth: authRouter,
  exercises: exerciesRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
