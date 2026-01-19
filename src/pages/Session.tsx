import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSessionStore } from '@/store/useSessionStore';
import { VideoGrid } from '@/components/session/VideoGrid';
import { Controls } from '@/components/session/Controls';
import { ChatPanel } from '@/components/session/ChatPanel';
import { ParticipantsList } from '@/components/session/ParticipantsList';
import { Button } from '@/components/ui/Button';

export const Session = () => {
  const { sessionId } = useParams();
  const navigate = useNavigate();
  const { isActive, startSession, joinSession, endSession } = useSessionStore();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isParticipantsOpen, setIsParticipantsOpen] = useState(false);

  useEffect(() => {
    // If accessing via URL directly without active session state
    if (!isActive && sessionId) {
       if (sessionId === 'new') {
         startSession();
       } else {
         joinSession(sessionId);
       }
    } else if (isActive && !sessionId) {
       // Should not happen theoretically with routing, but safe guard
    }
  }, [sessionId, isActive, startSession, joinSession]);

  useEffect(() => {
    // Cleanup on unmount or navigation away
    return () => {
       // Ideally we might want to confirm before leaving? 
       // For now, if component unmounts, we don't necessarily kill the session store 
       // unless explicit. But typically leaving the page ends the call.
    };
  }, []);
  
  // Redirect if session ended
  useEffect(() => {
     if (!isActive && sessionId && sessionId !== 'new') {
        navigate('/');
     }
  }, [isActive, navigate, sessionId]);

  if (!isActive) {
    return (
      <div className="flex h-screen items-center justify-center">
         <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">Starting Session...</h2>
            <Button onClick={() => navigate('/')} variant="outline">Cancel</Button>
         </div>
      </div>
    );
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-slate-50 dark:bg-slate-900">
      <div className="flex flex-1 overflow-hidden">
        <VideoGrid />
        
        {isChatOpen && (
           <ChatPanel onClose={() => setIsChatOpen(false)} />
        )}
        
        {isParticipantsOpen && (
           <ParticipantsList onClose={() => setIsParticipantsOpen(false)} />
        )}
      </div>
      
      <Controls 
         isChatOpen={isChatOpen}
         onToggleChat={() => {
            setIsChatOpen(!isChatOpen);
            if (!isChatOpen) setIsParticipantsOpen(false);
         }}
         isParticipantsOpen={isParticipantsOpen}
         onToggleParticipants={() => {
            setIsParticipantsOpen(!isParticipantsOpen);
            if (!isParticipantsOpen) setIsChatOpen(false);
         }}
      />
    </div>
  );
};
