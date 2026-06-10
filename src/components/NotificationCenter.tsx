import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, Check, Trash2, Info, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react';
import { useNotifications } from '../contexts/NotificationContext';
import { NotificationType } from '../features/notifications/services/notificationService';
import { useLanguage } from '../contexts/LanguageContext';

export const NotificationCenter: React.FC = () => {
  const { notifications, unreadCount, markAsRead, markAllAsRead, deleteNotification, loading } = useNotifications();
  const { t, isRTL } = useLanguage();
  const [isOpen, setIsOpen] = React.useState(false);

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case NotificationType.SUCCESS: return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
      case NotificationType.WARNING: return <AlertTriangle className="w-5 h-5 text-amber-500" />;
      case NotificationType.ERROR: return <AlertCircle className="w-5 h-5 text-red-500" />;
      default: return <Info className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 hover:bg-paper/5 rounded-2xl transition-all group"
      >
        <Bell className={`w-6 h-6 text-paper/40 group-hover:text-paper transition-colors ${unreadCount > 0 ? 'animate-pulse' : ''}`} />
        {unreadCount > 0 && (
          <span className="absolute top-2 right-2 w-5 h-5 bg-accent text-ink text-[10px] font-black rounded-full flex items-center justify-center border-2 border-paper shadow-lg shadow-accent/20">
            {unreadCount}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 bg-transparent"
            />
            <motion.div 
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`absolute top-full mt-4 ${isRTL ? 'left-0' : 'right-0'} w-96 bg-paper rounded-[2.5rem] shadow-2xl border border-paper/10 z-50 overflow-hidden luxury-shadow`}
            >
              <div className="p-8 border-b border-paper/10 flex justify-between items-center bg-paper">
                <div>
                  <h3 className="text-xl font-bold tracking-tight text-ink">{t('notifications')}</h3>
                  <p className="text-[10px] text-accent uppercase tracking-[0.2em] font-black mt-1">
                    {unreadCount} Unread
                  </p>
                </div>
                {unreadCount > 0 && (
                  <button 
                    onClick={markAllAsRead}
                    className="text-[10px] font-black uppercase tracking-widest text-ink/30 hover:text-ink transition-colors"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-[450px] overflow-y-auto custom-scrollbar">
                {notifications.length > 0 ? (
                  <div className="divide-y divide-paper/10">
                    {notifications.map((n, idx) => (
                      <motion.div 
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        key={n.id}
                        className={`p-6 hover:bg-ink/[0.02] transition-all group relative ${!n.isRead ? 'bg-ink/[0.01]' : ''}`}
                      >
                        <div className="flex gap-4">
                          <div className="mt-1">{getIcon(n.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start gap-2">
                              <h4 className={`text-sm font-bold truncate ${!n.isRead ? 'text-ink' : 'text-ink/60'}`}>
                                {n.title}
                              </h4>
                              <span className="text-[9px] font-medium text-ink/20 whitespace-nowrap mt-1">
                                {new Date(n.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            <p className="text-xs text-ink/40 mt-1 leading-relaxed line-clamp-2">
                              {n.message}
                            </p>
                            <div className="flex gap-4 mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                              {!n.isRead && (
                                <button 
                                  onClick={() => markAsRead(n.id)}
                                  className="text-[9px] font-black uppercase tracking-widest text-emerald-600 hover:text-emerald-700"
                                >
                                  Mark Read
                                </button>
                              )}
                              <button 
                                onClick={() => deleteNotification(n.id)}
                                className="text-[9px] font-black uppercase tracking-widest text-red-500 hover:text-red-700"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        </div>
                        {!n.isRead && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent" />
                        )}
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="py-20 text-center">
                    <div className="w-16 h-16 rounded-full bg-ink/5 flex items-center justify-center mx-auto mb-4">
                      <Bell className="w-8 h-8 text-ink/10" />
                    </div>
                    <p className="text-ink/30 font-serif italic">No notifications yet</p>
                  </div>
                )}
              </div>

              {notifications.length > 0 && (
                <div className="p-6 bg-paper border-t border-paper/10 text-center">
                  <button className="text-[10px] font-black uppercase tracking-widest text-accent hover:text-ink transition-colors">
                    View Notification History
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
