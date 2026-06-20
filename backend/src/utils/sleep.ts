export function sleep(durationMs: number): Promise<void> {
  if (
    !Number.isInteger(durationMs) ||
    durationMs < 0 ||
    !Number.isFinite(durationMs)
  ) {
    throw new Error(
      "durationMs must be an integer greater than or equal to zero and finite",
    );
  }

  return new Promise((res) => setTimeout(res, durationMs));
}
