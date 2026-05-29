import { normalizeEmail } from "../../../utils";

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
    payload.member_emails = memberEmails.map(normalizeEmail);
  }

  return payload;
}
