export function assertError(error: unknown) {
  if (error instanceof Error) {
    throw new Error(error.message);
  }
}
