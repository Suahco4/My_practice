import { create } from 'zustand';

export interface Participant {
  id: string;
  name: string;
  avatar: string;
  isMuted: boolean;
  isVideoOff: boolean;
  isSharing: boolean;
  isHandRaised: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: Date;
}

interface SessionState {
  sessionId: string | null;
  isActive: boolean;
  participants: Participant[];
  chatMessages: ChatMessage[];
  isScreenSharing: boolean;
  isAudioEnabled: boolean;
  isVideoEnabled: boolean;
  activeStream: MediaStream | null;
  
  startSession: () => void;
  endSession: () => void;
  joinSession: (sessionId: string) => void;
  toggleAudio: () => void;
  toggleVideo: () => void;
  setScreenSharing: (isSharing: boolean, stream: MediaStream | null) => void;
  addChatMessage: (text: string, senderId: string, senderName: string) => void;
  toggleHandRaise: (participantId: string) => void;
}

const MOCK_PARTICIPANTS: Participant[] = [
  { id: 'p1', name: 'Sarah Connor', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=sarah', isMuted: true, isVideoOff: false, isSharing: false, isHandRaised: false },
  { id: 'p2', name: 'John Doe', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=john', isMuted: false, isVideoOff: true, isSharing: false, isHandRaised: true },
  { id: 'p3', name: 'Alice Smith', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alice', isMuted: false, isVideoOff: false, isSharing: false, isHandRaised: false },
];

export const useSessionStore = create<SessionState>((set, get) => ({
  sessionId: null,
  isActive: false,
  participants: [],
  chatMessages: [],
  isScreenSharing: false,
  isAudioEnabled: true,
  isVideoEnabled: true,
  activeStream: null,

  startSession: () => {
    set({
      sessionId: Math.random().toString(36).substring(7),
      isActive: true,
      participants: MOCK_PARTICIPANTS,
      chatMessages: [
        { id: 'm1', senderId: 'p1', senderName: 'Sarah Connor', text: 'Hey everyone, ready to start?', timestamp: new Date(Date.now() - 1000 * 60 * 5) },
      ],
    });
  },

  endSession: () => {
    const { activeStream } = get();
    if (activeStream) {
      activeStream.getTracks().forEach(track => track.stop());
    }
    set({
      sessionId: null,
      isActive: false,
      participants: [],
      chatMessages: [],
      isScreenSharing: false,
      activeStream: null,
    });
  },

  joinSession: (sessionId) => {
    set({
      sessionId,
      isActive: true,
      participants: MOCK_PARTICIPANTS,
    });
  },

  toggleAudio: () => set((state) => ({ isAudioEnabled: !state.isAudioEnabled })),
  toggleVideo: () => set((state) => ({ isVideoEnabled: !state.isVideoEnabled })),

  setScreenSharing: (isSharing, stream) => set({ isScreenSharing: isSharing, activeStream: stream }),

  addChatMessage: (text, senderId, senderName) => set((state) => ({
    chatMessages: [...state.chatMessages, {
      id: Math.random().toString(36).substring(7),
      senderId,
      senderName,
      text,
      timestamp: new Date(),
    }],
  })),

  toggleHandRaise: (participantId) => set((state) => ({
    participants: state.participants.map(p => 
      p.id === participantId ? { ...p, isHandRaised: !p.isHandRaised } : p
    )
  })),
}));
