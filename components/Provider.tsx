/* eslint-disable prettier/prettier */
import { trpc } from '../utils/trpc';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { httpBatchLink } from '@trpc/client';
import React, { useState } from 'react'

const Provider = ({ children }: {children: React.ReactNode}) => {
    const [queryClient] = useState(() => new QueryClient)
    const [trpcClient] = useState(
        trpc.createClient({
            links: [
                httpBatchLink({
                    url: "http://localhost:8081/api/trpc",
                })
            ]
        })
    )
  return <trpc.Provider client={trpcClient} queryClient={queryClient}>
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  </trpc.Provider>
}

export default Provider