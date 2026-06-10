import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Users, MapPin, Sparkles, Clock } from 'lucide-react';
import { Service } from '../features/services/services/serviceService';
import { bookingService } from '../features/bookings/services/bookingService';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  service: Service | null;
  onSuccess: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, service, onSuccess }) => {
  const [bookingDate, setBookingDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [details, setDetails] = useState<any>({});

  if (!service) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await bookingService.create(service.id, bookingDate, details);
      onSuccess();
      onClose();
    } catch (error) {
      alert('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderCategorySpecificFields = () => {
    const category = service.category.toLowerCase();

    if (category.includes('journey') || category.includes('planner')) {
      return (
        <div className="space-y-6 py-6 border-t border-paper/10 mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> Journey Preferences
          </h4>
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40">Destination/Route Interest</label>
              <input 
                type="text" 
                placeholder="e.g. Nile Delta, Siwa Oasis..."
                className="luxury-input w-full"
                onChange={e => setDetails({...details, destination: e.target.value})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40">Pace of Journey</label>
              <select 
                className="luxury-input w-full"
                onChange={e => setDetails({...details, pace: e.target.value})}
              >
                <option value="relaxed">Relaxed & Slow</option>
                <option value="moderate">Moderate Discovery</option>
                <option value="intense">Intense Exploration</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    if (category.includes('adventure') || category.includes('local')) {
      return (
        <div className="space-y-6 py-6 border-t border-paper/10 mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
            <Users className="w-3 h-3" /> Adventure Details
          </h4>
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40">Participants</label>
              <input 
                type="number" 
                min="1"
                defaultValue="1"
                className="luxury-input w-full"
                onChange={e => setDetails({...details, participants: parseInt(e.target.value)})}
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent/40">Skill Level</label>
              <select 
                className="luxury-input w-full"
                onChange={e => setDetails({...details, skillLevel: e.target.value})}
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
          </div>
        </div>
      );
    }

    if (category.includes('hands') || category.includes('golden')) {
      return (
        <div className="space-y-6 py-6 border-t border-ink/5 mt-6">
          <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/30 flex items-center gap-2">
            <Sparkles className="w-3 h-3" /> Craft Customization
          </h4>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-ink/20">Specific Interest/Request</label>
            <textarea 
              placeholder="Tell the artisan what you'd like to learn or create..."
              rows={3}
              className="luxury-input h-32 py-4"
              onChange={e => setDetails({...details, craftRequest: e.target.value})}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/80 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-paper rounded-[3rem] shadow-2xl overflow-hidden border border-paper/10"
          >
            <div className="p-10">
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h3 className="text-3xl font-bold tracking-tight text-ink">{service.title}</h3>
                  <p className="text-sm text-accent flex items-center gap-1.5 mt-2">
                    <MapPin className="w-3.5 h-3.5" /> {service.location}
                  </p>
                </div>
                <button 
                  onClick={onClose}
                  className="p-3 hover:bg-ink/5 rounded-2xl transition-all hover:rotate-90 text-ink"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.3em] text-accent flex items-center gap-2">
                    <Calendar className="w-3 h-3" /> Select Date
                  </label>
                  <input 
                    type="date" 
                    required
                    className="luxury-input w-full"
                    value={bookingDate}
                    onChange={e => setBookingDate(e.target.value)}
                  />
                </div>

                {renderCategorySpecificFields()}

                <div className="pt-6">
                  <div className="space-y-3 mb-8 px-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-ink/40 font-medium">Base Price</span>
                      <span className="font-bold text-ink">${service.basePrice.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-ink/40 font-medium">Service Fee (3%)</span>
                      <span className="font-bold text-ink">${(service.basePrice * 0.03).toFixed(2)}</span>
                    </div>
                    <div className="pt-6 border-t border-paper/10 flex justify-between items-center">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Total Amount</span>
                      <span className="text-3xl font-bold text-ink tracking-tighter italic font-serif">${(service.basePrice * 1.03).toFixed(2)}</span>
                    </div>
                  </div>
                  <button 
                    type="submit"
                    disabled={loading}
                    className="luxury-button w-full py-5 text-lg"
                  >
                    {loading ? 'Processing...' : 'Confirm Reservation'}
                  </button>
                  <p className="text-[9px] text-center text-ink/40 mt-6 uppercase tracking-[0.3em] font-black">
                    Funds will be held in escrow until completion
                  </p>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
