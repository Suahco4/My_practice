import React, { useEffect, useRef } from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { useAuthStore } from '@/store/useAuthStore';
import { cn } from '@/utils/cn';
import { MicOff, VideoOff, Hand } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export const VideoGrid = () => {
  const { participants, activeStream, isScreenSharing, isVideoEnabled, isAudioEnabled } = useSessionStore();
  const { user } = useAuthStore();
  const screenVideoRef = useRef<HTMLVideoElement>(null);
  const myVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (screenVideoRef.current && activeStream) {
      screenVideoRef.current.srcObject = activeStream;
    }
  }, [activeStream]);

  // Mock getting local user media for self view
  useEffect(() => {
    if (myVideoRef.current && isVideoEnabled) {
       // In a real app we'd get user media here. 
       // For this demo we'll just show a placeholder or mock stream if we could.
       // We can't easily mock a camera stream without permissions in this environment, 
       // so we'll handle the UI state mostly.
    }
  }, [isVideoEnabled]);

  return (
    <div className={cn(
      "flex-1 overflow-y-auto p-4 transition-all duration-300",
      "grid gap-4",
      isScreenSharing ? "grid-cols-[1fr_250px]" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    )}>
      {isScreenSharing && (
        <div className="relative col-span-1 row-span-2 rounded-2xl bg-slate-950 overflow-hidden shadow-xl ring-1 ring-slate-900/5">
          <video
            ref={screenVideoRef}
            autoPlay
            playsInline
            className="h-full w-full object-contain"
          />
          <div className="absolute bottom-4 left-4 rounded-md bg-black/50 px-2 py-1 text-sm text-white backdrop-blur-sm">
             Screen Share
          </div>
        </div>
      )}

      {/* Current User */}
      <div className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="absolute inset-0 flex items-center justify-center">
             {!isVideoEnabled ? (
                <Avatar className="h-20 w-20" src={user?.avatar} fallback={user?.name || "ME"} />
             ) : (
                <div className="text-slate-400">Camera Preview (Simulated)</div>
             )}
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
          <span>You {isScreenSharing && "(Presenter)"}</span>
          {!isAudioEnabled && <MicOff className="h-3 w-3 text-red-400" />}
        </div>
      </div>

      {/* Other Participants */}
      {participants.map((participant) => (
        <div key={participant.id} className="relative aspect-video overflow-hidden rounded-xl border border-slate-200 bg-slate-100 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="absolute inset-0 flex items-center justify-center">
            {participant.isVideoOff ? (
               <Avatar className="h-20 w-20" src={participant.avatar} fallback={participant.name} />
            ) : (
               <img src={participant.avatar} alt={participant.name} className="h-full w-full object-cover opacity-80 blur-sm" /> 
               // Simulated video feed using avatar image
            )}
          </div>
          
          <div className="absolute top-3 right-3">
             {participant.isHandRaised && (
                <div className="rounded-full bg-yellow-500 p-1.5 text-white shadow-lg animate-bounce">
                   <Hand className="h-4 w-4" />
                </div>
             )}
          </div>

          <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-md bg-black/50 px-2 py-1 text-xs font-medium text-white backdrop-blur-sm">
            <span>{participant.name}</span>
            {participant.isMuted && <MicOff className="h-3 w-3 text-red-400" />}
            {participant.isVideoOff && <VideoOff className="h-3 w-3 text-red-400" />}
          </div>
        </div>
      ))}
    </div>
  );
};
