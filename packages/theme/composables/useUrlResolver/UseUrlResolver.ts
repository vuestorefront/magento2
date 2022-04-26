import type { DeepReadonly, Ref } from '@nuxtjs/composition-api';
import type { EntityUrl } from '~/modules/GraphQL/types';

export interface UseUrlResolverErrors {
  search: Error | null;
}

export interface UseUrlResolverInterface {
  path: string;
  error: DeepReadonly<Ref<UseUrlResolverErrors>>;
  loading: Readonly<Ref<boolean>>;
  search(): Promise<EntityUrl | {}>;
}
