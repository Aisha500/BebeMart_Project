import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Mail, Lock, User as UserIcon, Phone, MapPin } from "lucide-react";

type RoleChoice = "buyer" | "seller";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [role, setRole] = useState<RoleChoice>("buyer");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please make sure both passwords are the same.", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: displayName },
          emailRedirectTo: window.location.origin,
        },
      });
      if (error) throw error;

      if (data.user) {
        await supabase.from("profiles").update({
          phone, location, display_name: displayName,
        }).eq("user_id", data.user.id);

        await supabase.from("user_roles").insert({
          user_id: data.user.id, role,
        });
      }

      toast({
        title: "Check your email! 📧",
        description: "We sent you a verification link. Click it to activate your account.",
      });
    } catch (error: any) {
      toast({ title: "Oops!", description: error.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <Link to="/" className="inline-block">
            <span className="text-4xl">🛒</span>
          </Link>
          <h1 className="font-display font-black text-3xl text-foreground">Join BebeMart</h1>
          <p className="text-muted-foreground">Create your account to buy or sell</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="font-display font-semibold">Full Name</Label>
            <div className="relative">
              <UserIcon className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="name" placeholder="Mama Adaeze" value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="font-display font-semibold">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="phone" placeholder="0801 234 5678" value={phone} onChange={(e) => setPhone(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location" className="font-display font-semibold">Location</Label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="location" placeholder="Lagos, Lekki" value={location} onChange={(e) => setLocation(e.target.value)} className="pl-10" />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-display font-semibold">I want to...</Label>
            <div className="grid grid-cols-2 gap-3">
              {(["buyer", "seller"] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`p-4 rounded-xl border-2 text-center transition-all font-display font-bold ${
                    role === r
                      ? "border-coral bg-coral/10 text-coral"
                      : "border-border bg-card text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  <span className="text-2xl block mb-1">{r === "buyer" ? "🛒" : "🏷️"}</span>
                  {r === "buyer" ? "Buy Items" : "Sell Items"}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="font-display font-semibold">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10" required />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="font-display font-semibold">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="password" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10" required minLength={6} />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="font-display font-semibold">Confirm Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input id="confirmPassword" type="password" placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10" required minLength={6} />
            </div>
          </div>

          <Button type="submit" disabled={loading} className="w-full font-display font-bold bg-coral hover:bg-coral/90 text-coral-foreground h-12 text-base">
            {loading ? "Please wait..." : "Create Account"}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/signin" className="text-coral font-display font-bold hover:underline">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
