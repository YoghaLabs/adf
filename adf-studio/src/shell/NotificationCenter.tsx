import { useSettingsStore } from "@/stores/settingsStore";
import { Button, Card } from "@/components/ui";
import { formatWhen } from "@/utils/cn";

export function NotificationCenter() {
  const notifications = useSettingsStore((s) => s.notifications);
  const clear = useSettingsStore((s) => s.clearNotifications);

  if (notifications.length === 0) return null;

  return (
    <div
      data-testid="notification-center"
      className="pointer-events-none fixed right-4 top-16 z-40 flex w-80 flex-col gap-2"
    >
      {notifications.slice(0, 3).map((n) => (
        <Card key={n.id} className="pointer-events-auto border-accent/30 p-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="text-sm font-medium">{n.title}</div>
              <div className="studio-muted">{n.body}</div>
              <div className="mt-1 text-[10px] text-ink-muted">{formatWhen(n.createdAt)}</div>
            </div>
          </div>
        </Card>
      ))}
      <Button className="pointer-events-auto self-end" variant="ghost" onClick={clear}>
        Clear
      </Button>
    </div>
  );
}
