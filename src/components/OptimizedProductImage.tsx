import React, { useState } from 'react';
import { Armchair, AlertCircle } from 'lucide-react';

interface OptimizedProductImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  aspectRatio?: string;
  priority?: boolean;
  objectFit?: 'contain' | 'cover';
  padding?: string;
  fallbackSrc?: string;
  zoomOnHover?: boolean;
  style?: React.CSSProperties;
}

export const OptimizedProductImage: React.FC<OptimizedProductImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  aspectRatio = 'aspect-[4/3]',
  priority = false,
  objectFit = 'contain',
  padding = 'p-4 sm:p-5',
  fallbackSrc = '/src/assets/images/hero_salon_chair_1790757004757.jpg',
  zoomOnHover = false,
  style,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(src);

  // If the passed src changes, update the internal state
  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(false);
    setIsLoaded(false);
  }, [src]);

  const handleError = () => {
    if (currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasError(true);
    }
  };

  return (
    <div
      className={`relative w-full ${aspectRatio} overflow-hidden bg-[#EFE9DF] ${containerClassName}`}
    >
      {/* Skeleton Loading Shimmer placeholder to prevent layout shift */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-gradient-to-r from-[#EFE9DF] via-[#F4EFE6] to-[#EFE9DF] animate-pulse">
          <Armchair className="w-8 h-8 text-[#C8A97E]/40 mb-2 animate-bounce" />
          <div className="w-16 h-1.5 bg-[#C8A97E]/20 rounded-full" />
        </div>
      )}

      {/* Graceful Fallback if image fails permanently */}
      {hasError ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center bg-[#EFE9DF] text-[#7A7065]">
          <AlertCircle className="w-6 h-6 text-[#9E5B32] mb-1.5" />
          <span className="text-[11px] font-mono uppercase tracking-wider">Preview Unavailable</span>
          <span className="text-[10px] text-[#8C8276] mt-0.5">{alt}</span>
        </div>
      ) : (
        <div className={`w-full h-full flex items-center justify-center ${objectFit === 'contain' ? padding : ''}`}>
          <img
            src={currentSrc}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            referrerPolicy="no-referrer"
            onLoad={() => setIsLoaded(true)}
            onError={handleError}
            style={style}
            className={`w-full h-full transition-all duration-500 ease-out select-none ${
              objectFit === 'contain' ? 'object-contain' : 'object-cover'
            } ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-98'
            } ${
              zoomOnHover ? 'group-hover:scale-105 transition-transform duration-500' : ''
            } ${className}`}
          />
        </div>
      )}
    </div>
  );
};
