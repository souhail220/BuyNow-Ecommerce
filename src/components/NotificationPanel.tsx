import { X, Trash2, CheckCheck, Bell, AlertCircle, Gift, Zap, ShoppingCart, User } from 'lucide-react';
import { useNotifications } from '../context/NotificationContext';
import { Notification } from '../types/notifications';

interface NotificationPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'bell': Bell,
  'alert': AlertCircle,
  'gift': Gift,
  'zap': Zap,
  'shopping-cart': ShoppingCart,
  'user': User,
  'check-circle': CheckCheck
};

function getNotificationColor(type: string) {
  switch (type) {
    case 'profile':
      return 'bg-blue-50 border-blue-200 text-blue-600';
    case 'cart':
      return 'bg-orange-50 border-orange-200 text-orange-600';
    case 'coupon':
      return 'bg-green-50 border-green-200 text-green-600';
    case 'system':
      return 'bg-purple-50 border-purple-200 text-purple-600';
    case 'cart-abandoned':
      return 'bg-red-50 border-red-200 text-red-600';
    default:
      return 'bg-gray-50 border-gray-200 text-gray-600';
  }
}

function formatTime(date: Date): string {
  const now = new Date();
  const diff = now.getTime() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return 'Just now';
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days < 7) return `${days}d ago`;
  return new Date(date).toLocaleDateString();
}

export default function NotificationPanel({ isOpen, onClose }: NotificationPanelProps) {
  const { notifications, unreadCount, markAsRead, markAllAsRead, removeNotification, clearAll } = useNotifications();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/20" onClick={onClose} />
      <div className="fixed right-0 top-0 h-full w-96 bg-white shadow-xl overflow-hidden flex flex-col">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 px-6 py-4 text-white flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold">Notifications</h2>
            {unreadCount > 0 && (
              <p className="text-blue-100 text-sm">{unreadCount} unread</p>
            )}
          </div>
          <button onClick={onClose} className="p-2 hover:bg-blue-700 rounded-lg transition">
            <X className="h-6 w-6" />
          </button>
        </div>

        {notifications.length > 0 && (
          <div className="px-6 py-3 border-b flex items-center justify-between bg-gray-50">
            <button
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
              className="text-sm text-blue-600 hover:text-blue-700 disabled:text-gray-400 disabled:cursor-not-allowed font-medium"
            >
              Mark all as read
            </button>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium flex items-center space-x-1"
            >
              <Trash2 className="h-4 w-4" />
              <span>Clear all</span>
            </button>
          </div>
        )}

        <div className="flex-1 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center px-6">
              <Bell className="h-16 w-16 text-gray-300 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
              <p className="text-gray-500">Stay tuned for updates about your account and orders</p>
            </div>
          ) : (
            <div className="divide-y">
              {notifications.map((notification: Notification) => {
                const IconComponent = iconMap[notification.icon] || Bell;
                const colorClass = getNotificationColor(notification.type);

                return (
                  <div
                    key={notification.id}
                    onClick={() => markAsRead(notification.id)}
                    className={`p-4 border-l-4 cursor-pointer transition hover:bg-gray-50 ${
                      notification.read ? 'bg-white border-l-transparent' : 'bg-blue-50 border-l-blue-600'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`flex-shrink-0 p-2 rounded-lg ${colorClass}`}>
                        <IconComponent className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-gray-900">
                              {notification.title}
                            </p>
                            <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {formatTime(notification.timestamp)}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                            className="flex-shrink-0 ml-2 text-gray-400 hover:text-gray-600 transition"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
