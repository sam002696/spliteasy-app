function formatRelativeDate(value) {
  if (!value) {
    return "Recently";
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return "Recently";
  }

  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);

  if (diffMinutes < 1) {
    return "Just now";
  }

  if (diffMinutes < 60) {
    return `${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `${diffHours} hr ago`;
  }

  return date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
  });
}

export function mapApiNotificationToListItem(notification) {
  return {
    id: notification.id,
    actorName: notification.actor?.name || notification.actor?.initials || "SE",
    title: notification.title || "Notification",
    subtitle: notification.subtitle || notification.group?.name || "",
    isRead: Boolean(notification.is_read),
    type: notification.type || "activity",
    createdAt: formatRelativeDate(notification.created_at),
  };
}
