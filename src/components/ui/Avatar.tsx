import React from 'react';
import { cn } from '@/utils/cn';

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  src?: string;
  alt?: string;
  fallback: string;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, src, alt, fallback, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full', className)}
        {...props}
      >
        {src ? (
          <img className="aspect-square h-full w-full object-cover" src={src} alt={alt} />
        ) : (
          <div className="flex h-full w-full items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <span className="text-sm font-medium uppercase text-slate-500 dark:text-slate-400">
              {fallback.substring(0, 2)}
            </span>
          </div>
        )}
      </div>
    );
  }
);
Avatar.displayName = 'Avatar';
