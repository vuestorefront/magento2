import { CategoryTree, RoutableInterface } from '~/modules/GraphQL/types';

export const isCategoryTreeRoute = (object: RoutableInterface): object is CategoryTree => (object as CategoryTree).uid !== undefined;
