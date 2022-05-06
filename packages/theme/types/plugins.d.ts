import type { GraphQLClient } from 'graphql-request';

type GraphQlClients = Record<'query' | 'mutation', GraphQLClient>;

declare module '@nuxt/types' {
  interface NuxtAppOptions {
    $graphql: GraphQlClients;
  }

  interface Context {
    $graphql: GraphQlClients;
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $fc(value: number | string): string;
    $fc(value: number | string, options?: Intl.NumberFormatOptions): string;
    $fc(value: number | string, locale?: string, options?: Intl.NumberFormatOptions): string;
    $dompurify(html: string): string;
  }
}
