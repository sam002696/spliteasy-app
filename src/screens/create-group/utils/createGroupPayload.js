export function normalizeInviteEmail(email) {
  return email.trim().toLowerCase();
}

export function isValidInviteEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizeInviteEmail(email));
}

export function buildCreateGroupPayload({
  category,
  currency,
  memberEmails,
  name,
}) {
  const payload = {
    name: name.trim(),
    category,
    base_currency: currency,
  };

  if (memberEmails.length > 0) {
    payload.member_emails = memberEmails.map(normalizeInviteEmail);
  }

  return payload;
}
