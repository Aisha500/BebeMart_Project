import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User, MapPin, Phone, LogOut, Edit, Save } from "lucide-react";

const Profile = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({
    display_name: "",
    phone: "",
    location: "",
    bio: "",
    avatar_url: "",
  });
  const [role, setRole] = useState<string>("");

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/signin");
      return;
    }
    if (user) fetchProfile();
  }, [user, authLoading]);

  const fetchProfile = async () => {
    if (!user) return;
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    if (profileData) {
      setProfile({
        display_name: profileData.display_name || "",
        phone: profileData.phone || "",
        location: profileData.location || "",
        bio: profileData.bio || "",
        avatar_url: profileData.avatar_url || "",
      });
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    if (roleData) setRole(roleData.role);
    setLoading(false);
  };

  const handleSave = async () => {
    if (!user) return;
    setLoading(true);
    const { error } = await supabase
      .from("profiles")
      .update({
        display_name: profile.display_name,
        phone: profile.phone,
        location: profile.location,
        bio: profile.bio,
      })
      .eq("user_id", user.id);

    if (error) {
      toast({ title: "Error saving profile", variant: "destructive" });
    } else {
      toast({ title: "Profile updated! ✅" });
      setEditing(false);
    }
    setLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground font-display">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-lg py-8 pb-24 space-y-6">
      <div className="text-center space-y-3">
        <div className="w-20 h-20 mx-auto rounded-full bg-mint-light flex items-center justify-center">
          <User className="w-10 h-10 text-primary" />
        </div>
        <h1 className="font-display font-black text-2xl text-foreground">
          {profile.display_name || "Your Profile"}
        </h1>
        {role && (
          <span className="inline-block px-3 py-1 rounded-full text-xs font-display font-bold bg-coral/10 text-coral capitalize">
            {role}
          </span>
        )}
        <p className="text-sm text-muted-foreground">{user?.email}</p>
      </div>

      <div className="space-y-4 bg-card rounded-2xl p-6 shadow-card">
        <div className="space-y-2">
          <Label className="font-display font-semibold">Display Name</Label>
          <Input
            value={profile.display_name}
            onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
            disabled={!editing}
          />
        </div>
        <div className="space-y-2">
          <Label className="font-display font-semibold">Phone</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={profile.phone}
              onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
              disabled={!editing}
              className="pl-10"
              placeholder="0801 234 5678"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-display font-semibold">Location</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              value={profile.location}
              onChange={(e) => setProfile({ ...profile, location: e.target.value })}
              disabled={!editing}
              className="pl-10"
              placeholder="Lagos, Lekki"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label className="font-display font-semibold">Bio</Label>
          <Textarea
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
            disabled={!editing}
            placeholder="Tell other parents about yourself..."
            rows={3}
          />
        </div>

        <div className="flex gap-3">
          {editing ? (
            <Button onClick={handleSave} className="flex-1 gap-2 font-display bg-coral hover:bg-coral/90 text-coral-foreground">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          ) : (
            <Button onClick={() => setEditing(true)} variant="outline" className="flex-1 gap-2 font-display">
              <Edit className="w-4 h-4" /> Edit Profile
            </Button>
          )}
        </div>
      </div>

      <Button onClick={handleSignOut} variant="ghost" className="w-full gap-2 text-destructive font-display">
        <LogOut className="w-4 h-4" /> Sign Out
      </Button>
    </div>
  );
};

export default Profile;
