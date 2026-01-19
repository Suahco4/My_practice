import React from 'react';
import { Button } from '@/components/ui/Button';
import { Mic, MicOff, Video, VideoOff, Monitor, PhoneOff, MessageSquare, Users, Hand } from 'lucide-react';
import { useSessionStore } from '@/store/useSessionStore';
import { cn } from '@/utils/cn';

interface ControlsProps {
  onToggleChat: () => void;
  onToggleParticipants: () => void;
  isChatOpen: boolean;
  isParticipantsOpen: boolean;
}

export const Controls = ({ onToggleChat, onToggleParticipants, isChatOpen, isParticipantsOpen }: ControlsProps) => {
  const { 
    isAudioEnabled, 
    isVideoEnabled, 
    isScreenSharing, 
    toggleAudio, 
    toggleVideo, 
    endSession, 
    setScreenSharing,
    sessionId 
  } = useSessionStore();

  const handleScreenShare = async () => {
    if (isScreenSharing) {
      // Stop sharing
      const stream = useSessionStore.getState().activeStream;
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      setScreenSharing(false, null);
    } else {
      try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        setScreenSharing(true, stream);
        
        // Listen for when the user stops sharing via the browser UI
        stream.getVideoTracks()[0].onended = () => {
          setScreenSharing(false, null);
        };
      } catch (err) {
        console.error("Error sharing screen:", err);
      }
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex h-20 items-center justify-between border-t border-slate-200 bg-white px-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="flex w-64 items-center gap-4">
        <div className="text-sm font-medium">
          <span className="text-slate-500 dark:text-slate-400">ID:</span> {sessionId}
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant={isAudioEnabled ? 'secondary' : 'danger'}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleAudio}
        >
          {isAudioEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
        </Button>
        <Button
          variant={isVideoEnabled ? 'secondary' : 'danger'}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={toggleVideo}
        >
          {isVideoEnabled ? <Video className="h-5 w-5" /> : <VideoOff className="h-5 w-5" />}
        </Button>
        <Button
          variant={isScreenSharing ? 'primary' : 'secondary'}
          size="icon"
          className="rounded-full h-12 w-12"
          onClick={handleScreenShare}
        >
          <Monitor className="h-5 w-5" />
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="rounded-full h-12 w-12"
        >
          <Hand className="h-5 w-5" />
        </Button>
        <Button
          variant="danger"
          size="icon"
          className="rounded-full h-12 w-12 ml-4"
          onClick={endSession}
        >
          <PhoneOff className="h-5 w-5" />
        </Button>
      </div>

      <div className="flex w-64 justify-end gap-3">
         <Button
          variant={isParticipantsOpen ? 'primary' : 'ghost'}
          size="icon"
          onClick={onToggleParticipants}
        >
          <Users className="h-5 w-5" />
        </Button>
        <Button
          variant={isChatOpen ? 'primary' : 'ghost'}
          size="icon"
          onClick={onToggleChat}
        >
          <MessageSquare className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
