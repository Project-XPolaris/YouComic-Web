export function getBooleanWithDefault(value: boolean | undefined, defaultValue: boolean): boolean {
  if (value === undefined) {
    return defaultValue;
  }
  return value;
}
