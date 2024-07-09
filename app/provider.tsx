"use client";

import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PropsWithChildren } from "react";

const client = new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache()
})
export default function Provider({ children }: PropsWithChildren) {
    return (
        <ApolloProvider client={client}>
            {children}
        </ApolloProvider>
    )
}