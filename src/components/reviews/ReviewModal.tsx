import React, { useState } from 'react';
import { X, Star, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUserName?: string;
  targetUserId?: string;
}

export const ReviewModal: React.FC<ReviewModalProps> = ({
  isOpen,
  onClose,
  targetUserName = 'Ramesh Kumar',
  targetUserId = 'w-101'
}) => {
  const { submitReview, role, t } = useApp();

  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('Punctual, excellent work quality, and followed safety guidelines strictly.');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitReview({
      toUserId: targetUserId,
      toUserName: targetUserName,
      rating,
      comment,
      tags: ['Punctual', 'Quality Work', 'Safety Conscious']
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-sm rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-slate-50">
          <h3 className="font-extrabold text-sm text-slate-900">
            {role === 'employer' ? t.reviews.rateWorker : t.reviews.rateEmployer}
          </h3>
          <button
            onClick={onClose}
            className="touch-target p-1.5 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-200"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div className="text-center">
            <p className="text-slate-500 font-medium">Rating for</p>
            <h4 className="text-base font-black text-slate-900 mt-0.5">{targetUserName}</h4>

            {/* Star Picker */}
            <div className="flex items-center justify-center gap-2 my-3">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setRating(s)}
                  className="touch-target p-1 text-2xl transition-transform active:scale-125 focus:outline-none"
                >
                  <Star
                    size={28}
                    className={`${
                      s <= rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-slate-200 text-slate-200'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="font-extrabold text-amber-600">{rating} out of 5 Stars</span>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Feedback & Comments</label>
            <textarea
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-3 rounded-xl border border-slate-200 text-slate-900 text-xs"
            />
          </div>

          <button
            type="submit"
            className="touch-target w-full py-3.5 rounded-2xl bg-sky-600 hover:bg-sky-500 text-white font-extrabold text-xs shadow-lg shadow-sky-500/25 active:scale-95"
          >
            {t.reviews.submitReview}
          </button>
        </form>
      </div>
    </div>
  );
};
