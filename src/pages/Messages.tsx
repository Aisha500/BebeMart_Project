import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, Send, ArrowLeft, User } from "lucide-react";

interface Conversation {
  other_user_id: string;
  other_user_name: string;
  listing_id: string | null;
  last_message: string;
  last_time: string;
  unread: number;
}

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  listing_id: string | null;
  read: boolean;
}

const Messages = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const [loadingConvos, setLoadingConvos] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!authLoading && !user) navigate("/signin");
  }, [user, authLoading]);

  // Load conversations
  useEffect(() => {
    if (!user) return;
    loadConversations();

    const channel = supabase
      .channel("messages-realtime")
      .on("postgres_changes", { event: "*", schema: "public", table: "messages" }, () => {
        loadConversations();
        if (activeChat) loadMessages(activeChat);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const loadConversations = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!data) { setLoadingConvos(false); return; }

    const convMap = new Map<string, Conversation>();
    for (const msg of data) {
      const otherId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
      if (!convMap.has(otherId)) {
        convMap.set(otherId, {
          other_user_id: otherId,
          other_user_name: "",
          listing_id: msg.listing_id,
          last_message: msg.content,
          last_time: msg.created_at,
          unread: msg.receiver_id === user.id && !msg.read ? 1 : 0,
        });
      } else {
        const c = convMap.get(otherId)!;
        if (msg.receiver_id === user.id && !msg.read) c.unread++;
      }
    }

    // Fetch display names
    const ids = Array.from(convMap.keys());
    if (ids.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, display_name")
        .in("user_id", ids);
      if (profiles) {
        for (const p of profiles) {
          const c = convMap.get(p.user_id);
          if (c) c.other_user_name = p.display_name || "User";
        }
      }
    }

    setConversations(Array.from(convMap.values()));
    setLoadingConvos(false);
  };

  const loadMessages = async (otherId: string) => {
    if (!user) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(`and(sender_id.eq.${user.id},receiver_id.eq.${otherId}),and(sender_id.eq.${otherId},receiver_id.eq.${user.id})`)
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
      // Mark received messages as read
      const unreadIds = data.filter(m => m.receiver_id === user.id && !m.read).map(m => m.id);
      if (unreadIds.length > 0) {
        await supabase.from("messages").update({ read: true }).in("id", unreadIds);
      }
    }
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
  };

  const openChat = (otherId: string) => {
    setActiveChat(otherId);
    loadMessages(otherId);
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !activeChat) return;
    setSending(true);
    await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: activeChat,
      content: newMessage.trim(),
    });
    setNewMessage("");
    setSending(false);
    await loadMessages(activeChat);
  };

  if (authLoading) {
    return <div className="flex items-center justify-center min-h-[60vh]"><p className="text-muted-foreground font-display">Loading...</p></div>;
  }

  if (!user) return null;

  // Active chat view
  if (activeChat) {
    const conv = conversations.find(c => c.other_user_id === activeChat);
    return (
      <div className="container max-w-2xl py-4 pb-24 flex flex-col h-[calc(100vh-8rem)]">
        <div className="flex items-center gap-3 mb-4">
          <Button variant="ghost" size="icon" onClick={() => setActiveChat(null)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <h2 className="font-display font-bold text-foreground">{conv?.other_user_name || "Chat"}</h2>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 px-1">
          {messages.map((msg) => {
            const isMine = msg.sender_id === user.id;
            return (
              <div key={msg.id} className={`flex ${isMine ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                  isMine
                    ? "bg-coral text-coral-foreground rounded-br-md"
                    : "bg-muted text-foreground rounded-bl-md"
                }`}>
                  {msg.content}
                  <p className={`text-[10px] mt-1 ${isMine ? "text-coral-foreground/70" : "text-muted-foreground"}`}>
                    {new Date(msg.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={bottomRef} />
        </div>

        <div className="flex gap-2 mt-4">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1"
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
          />
          <Button onClick={handleSend} disabled={sending || !newMessage.trim()} className="bg-coral hover:bg-coral/90 text-coral-foreground">
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Conversation list
  return (
    <div className="container max-w-2xl py-8 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <MessageCircle className="w-5 h-5 text-primary" />
        <h1 className="font-display font-black text-2xl text-foreground">Messages</h1>
      </div>

      {loadingConvos ? (
        <p className="text-center text-muted-foreground py-8">Loading conversations...</p>
      ) : conversations.length === 0 ? (
        <div className="text-center py-16 space-y-3">
          <p className="text-4xl">💬</p>
          <p className="font-display font-bold text-lg text-foreground">No messages yet</p>
          <p className="text-muted-foreground">When you message a seller about an item, your conversations will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((conv) => (
            <button
              key={conv.other_user_id}
              onClick={() => openChat(conv.other_user_id)}
              className="w-full flex items-center gap-3 p-4 rounded-xl bg-card hover:bg-muted/50 transition-colors text-left border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                <User className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="font-display font-bold text-foreground truncate">{conv.other_user_name || "User"}</p>
                  <span className="text-xs text-muted-foreground flex-shrink-0">
                    {new Date(conv.last_time).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conv.last_message}</p>
              </div>
              {conv.unread > 0 && (
                <span className="w-5 h-5 rounded-full bg-coral text-coral-foreground text-xs flex items-center justify-center font-bold flex-shrink-0">
                  {conv.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Messages;
