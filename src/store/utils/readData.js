export function readData(payload, fallback = null) {
  return payload?.data ?? fallback;
}
