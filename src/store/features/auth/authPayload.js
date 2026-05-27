export function getAuthTokenFromPayload(payload) {
  return (
    payload?.data?.token ||
    payload?.data?.access_token ||
    payload?.data?.auth_token ||
    null
  );
}

export function getUserFromPayload(payload) {
  return payload?.data?.user || payload?.data || null;
}
