import { createContext, useContext, useState, useCallback, useMemo } from "react";
import { NOTIFICATION_DURATION } from "@constants/config";

const NotificationContext = createContext(null);

let _idCounter = 0;
const nextId = () => `notif-${++_idCounter}`;

export function NotificationProvider({ children }) {
  const [notifications, setNotifications] = useState([]);

  const notify = useCallback((message, type = "success") => {
    const id = nextId();
    setNotifications(p => [...p, { id, message, type }]);
    setTimeout(() => setNotifications(p => p.filter(n => n.id !== id)), NOTIFICATION_DURATION);
  }, []);

  const dismiss = useCallback(id => setNotifications(p => p.filter(n => n.id !== id)), []);

  const value = useMemo(() => ({ notifications, notify, dismiss }), [notifications, notify, dismiss]);

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
}

export function useNotification() {
  const ctx = useContext(NotificationContext);
  if (!ctx) throw new Error("useNotification must be inside <NotificationProvider>");
  return ctx;
}
