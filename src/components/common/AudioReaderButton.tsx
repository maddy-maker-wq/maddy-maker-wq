import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface AudioReaderButtonProps {
  textToRead: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const AudioReaderButton: React.FC<AudioReaderButtonProps> = ({
  textToRead,
  size = 'md',
  className = ''
}) => {
  const { speak, stopVoice, t } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isPlaying) {
      stopVoice();
      setIsPlaying(false);
    } else {
      speak(textToRead);
      setIsPlaying(true);
      setTimeout(() => setIsPlaying(false), 4000);
    }
  };

  const sizeClasses = {
    sm: 'p-1.5 text-xs',
    md: 'p-2 text-sm',
    lg: 'p-3 text-base'
  }[size];

  const iconSizes = {
    sm: 16,
    md: 20,
    lg: 24
  }[size];

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label={t.listenToDetails}
      title={t.listenToDetails}
      className={`touch-target inline-flex items-center justify-center rounded-full transition-all duration-200 ${
        isPlaying
          ? 'bg-amber-500 text-white shadow-lg animate-pulse'
          : 'bg-sky-100 hover:bg-sky-200 text-sky-700 active:scale-95'
      } ${sizeClasses} ${className}`}
    >
      {isPlaying ? <VolumeX size={iconSizes} /> : <Volume2 size={iconSizes} />}
    </button>
  );
};
