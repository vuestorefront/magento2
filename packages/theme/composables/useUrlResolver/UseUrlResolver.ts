import type { Ref } from '@nuxtjs/composition-api';
import type { EntityUrl } from '~/modules/GraphQL/types';

export interface UseUrlResolverErrors {
  search: Error | null;
}

export interface UseUrlResolverInterface {
  path: string;
  error: Ref<UseUrlResolverErrors>;
  loading: Ref<boolean>;
  search(): Promise<EntityUrl | {}>;
}
