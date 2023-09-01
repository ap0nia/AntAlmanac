import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../../../backend/src/routers';
/**
 * tRPC + React Query client
 */
export const trpc = createTRPCReact<AppRouter>();
