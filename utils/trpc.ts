/* eslint-disable prettier/prettier */
// utils/trpc.ts
import { createReactQueryHooks } from '@trpc/react-query';
import type { AppRouter } from '../server';
export const trpc = createReactQueryHooks<AppRouter>();
// => { useQuery: ..., useMutation: ...}