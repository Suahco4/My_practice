import React from 'react';
import { useSessionStore } from '@/store/useSessionStore';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { X, Mic, MicOff, Video, VideoOff, MoreVertical, Hand } from 'lucide-react';

interface ParticipantsListProps {
  onClose: () => void;
}

export const ParticipantsList = ({ onClose }: ParticipantsListProps) => {
  const { participants, toggleHandRaise } = useSessionStore();

  return (
    <div className="flex h-full w-80 flex-col border-l border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="flex items-center justify-between border-b border-slate-200 p-4 dark:border-slate-800">
        <div className="flex items-center gap-2">
           <h3 className="font-semibold">Participants</h3>
           <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-400">
             {participants.length + 1}
           </span>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto p-2">
         {/* Me */}
         <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-900">
            <Avatar fallback="ME" />
            <div className="flex-1 overflow-hidden">
               <p className="truncate text-sm font-medium">You (Host)</p>
               <p className="truncate text-xs text-slate-500">Meeting Host</p>
            </div>
            <div className="flex items-center gap-1">
               <Mic className="h-4 w-4 text-slate-400" />
               <Video className="h-4 w-4 text-slate-400" />
            </div>
         </div>

        {participants.map((participant) => (
          <div key={participant.id} className="group flex items-center gap-3 rounded-lg p-2 hover:bg-slate-50 dark:hover:bg-slate-900">
            <Avatar src={participant.avatar} fallback={participant.name} />
            <div className="flex-1 overflow-hidden">
              <div className="flex items-center gap-2">
                 <p className="truncate text-sm font-medium">{participant.name}</p>
                 {participant.isHandRaised && <Hand className="h-3 w-3 text-yellow-500" />}
              </div>
              <p className="truncate text-xs text-slate-500">
                {participant.isSharing ? 'Sharing Screen' : 'Participant'}
              </p>
            </div>
            <div className="flex items-center gap-1">
               {participant.isHandRaised && (
                  <Button 
                     variant="ghost" 
                     size="icon" 
                     className="h-6 w-6 text-yellow-500"
                     onClick={() => toggleHandRaise(participant.id)}
                     title="Lower hand"
                  >
                     <Hand className="h-3 w-3" />
                  </Button>
               )}
              {participant.isMuted ? (
                <MicOff className="h-4 w-4 text-red-400" />
              ) : (
                <Mic className="h-4 w-4 text-slate-400" />
              )}
              {participant.isVideoOff ? (
                <VideoOff className="h-4 w-4 text-red-400" />
              ) : (
                <Video className="h-4 w-4 text-slate-400" />
              )}
              <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100">
                 <MoreVertical className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
         <Button variant="outline" className="w-full">
            Invite People
         </Button>
      </div>
    </div>
  );
};
