import { useState } from 'react';
import transformer from 'superjson';
import { httpBatchLink } from '@trpc/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getEndpoint } from '$lib/api/trpc';
import { trpc } from '$lib/trpc';

interface Props {
    children?: React.ReactNode;
}

export default function AppQueryProvider(props: Props) {
    const [queryClient] = useState(() => new QueryClient());

    const [trpcClient] = useState(() =>
        trpc.createClient({
            transformer,
            links: [
                httpBatchLink({
                    url: getEndpoint() + '/trpc',
                }),
            ],
        })
    );

    return (
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{props.children}</QueryClientProvider>
        </trpc.Provider>
    );
}
