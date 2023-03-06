import { procedure, router } from '../trpc'
import newsRouter from './news'
import notificationsRouter from './notifications'
import scheduleRouter from './schedule'
import userRouter from './user'
import restRouter from './rest'
import graphqlRouter from './graphql'
import websocRouter from './websoc'

export const appRouter = router({
  '': procedure.query(() => 'Hello, World!'),
  news: newsRouter,
  notifications: notificationsRouter,
  schedule: scheduleRouter,
  user: userRouter,
  rest: restRouter,
  graphql: graphqlRouter,
  websoc: websocRouter
})

export type AppRouter = typeof appRouter
