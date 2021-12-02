export const getContextProperty = <RETURN_TYPE>(object: Record<string, any>, name: string) => (
  object?.[`$${name}`]
  || object?.[name]) as RETURN_TYPE;
