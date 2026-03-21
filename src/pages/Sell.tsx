import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { categories, ageRanges } from "@/data/mockListings";
import { PlusCircle, Camera } from "lucide-react";

const conditions = ["Like New", "Gently Used", "Well Loved"];

const Sell = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [isGift, setIsGift] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    ageRange: "",
    condition: "",
  });

  useEffect(() => {
    if (!authLoading && !user) navigate("/auth");
  }, [user, authLoading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // For now, show a success message (listings DB table can be added later)
    setTimeout(() => {
      toast({
        title: "Listing created! 🎉",
        description: "Your item is now live on BebeMart.",
      });
      setLoading(false);
      navigate("/");
    }, 1000);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <p className="text-muted-foreground font-display">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-lg py-8 pb-24">
      <div className="flex items-center gap-2 mb-6">
        <PlusCircle className="w-5 h-5 text-coral" />
        <h1 className="font-display font-black text-2xl text-foreground">Sell an Item</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Photo placeholder */}
        <div className="border-2 border-dashed border-border rounded-2xl p-8 text-center space-y-2 bg-muted/50">
          <Camera className="w-8 h-8 mx-auto text-muted-foreground" />
          <p className="font-display font-semibold text-sm text-muted-foreground">
            Photo upload coming soon
          </p>
          <p className="text-xs text-muted-foreground">Add up to 4 photos of your item</p>
        </div>

        <div className="space-y-2">
          <Label className="font-display font-semibold">Title</Label>
          <Input
            placeholder="e.g. Baby Girl Floral Dress"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            maxLength={100}
          />
        </div>

        <div className="space-y-2">
          <Label className="font-display font-semibold">Description</Label>
          <Textarea
            placeholder="Describe the condition, size, and any details buyers should know..."
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            required
            rows={4}
            maxLength={500}
          />
        </div>

        <div className="flex items-center justify-between p-4 bg-mint-light rounded-xl">
          <div>
            <p className="font-display font-bold text-foreground">Gift-It-Forward 🎁</p>
            <p className="text-xs text-muted-foreground">Give away for free (₦500 platform fee for buyers)</p>
          </div>
          <Switch checked={isGift} onCheckedChange={setIsGift} />
        </div>

        {!isGift && (
          <div className="space-y-2">
            <Label className="font-display font-semibold">Price (₦)</Label>
            <Input
              type="number"
              placeholder="0 – 5,000"
              value={form.price}
              onChange={(e) => {
                const val = Math.min(5000, Math.max(0, Number(e.target.value)));
                setForm({ ...form, price: String(val) });
              }}
              max={5000}
              min={0}
              required
            />
            <p className="text-xs text-muted-foreground">Maximum ₦5,000</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="font-display font-semibold">Category</Label>
            <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label className="font-display font-semibold">Age Range</Label>
            <Select value={form.ageRange} onValueChange={(v) => setForm({ ...form, ageRange: v })}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {ageRanges.map((a) => (
                  <SelectItem key={a} value={a}>{a}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <Label className="font-display font-semibold">Condition</Label>
          <Select value={form.condition} onValueChange={(v) => setForm({ ...form, condition: v })}>
            <SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger>
            <SelectContent>
              {conditions.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full h-12 font-display font-bold text-base bg-coral hover:bg-coral/90 text-coral-foreground"
        >
          {loading ? "Publishing..." : isGift ? "Gift This Item 🎁" : "List for Sale"}
        </Button>
      </form>
    </div>
  );
};

export default Sell;
