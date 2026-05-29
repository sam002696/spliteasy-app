const DEFAULT_TIME_ZONE = "Asia/Dhaka";

function getHourInTimeZone(date, timeZone) {
  try {
    const hour = new Intl.DateTimeFormat("en-US", {
      hour: "numeric",
      hour12: false,
      timeZone,
    }).format(date);

    return Number(hour);
  } catch {
    return date.getHours();
  }
}

export function getGreeting(date = new Date(), timeZone = DEFAULT_TIME_ZONE) {
  const hour = getHourInTimeZone(date, timeZone);

  if (hour < 12) {
    return "Good morning";
  }

  if (hour < 17) {
    return "Good afternoon";
  }

  return "Good evening";
}
