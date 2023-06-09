/**
 * Generic utility type for creating method-specific `customQuery`
 * interfaces.
 *
 * @typeParam KEY - union of possible custom query keys for the method.
 *
 * @remarks
 * This utility type uses the concept of
 * {@link https://www.typescriptlang.org/docs/handbook/2/conditional-types.html#distributive-conditional-types | Distributive Conditional Types} to
 * handle SDK methods with multiple custom query keys (e.g. `getMe`).
 *
 * @example
 *
 * ```ts
 * import type { CustomQuery } from '../../types/MethodOptions';
 *
 * type CreateCartCustomQuery = CustomQuery<'createCart'>;
 * ```
 */
export type CustomQuery<KEY extends string> = KEY extends string ? Record<KEY, string> & { metadata?: unknown } : unknown;
