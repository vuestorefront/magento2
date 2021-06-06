import { FetchResult } from '@apollo/client';
import mutation from './mutation.graphql';
import {
  SubscribeEmailToNewsletterMutation, SubscribeEmailToNewsletterMutationVariables,
} from '../../types/GraphQL';
import { Context } from '../../types/context';

export default async (
  { client }: Context,
  { email }: SubscribeEmailToNewsletterMutationVariables,
): Promise<FetchResult<SubscribeEmailToNewsletterMutation>> => client
  .mutate<
SubscribeEmailToNewsletterMutation,
SubscribeEmailToNewsletterMutationVariables>({
  mutation,
  variables: {
    email,
  },
});
