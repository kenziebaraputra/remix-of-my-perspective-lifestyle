import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lock, Eye, EyeOff, UserPlus, LogIn } from "lucide-react";

const AdminLogin = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (mode === "login") {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      setLoading(false);
      if (error) {
        toast.error("Invalid credentials. Please try again.");
      }
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      setLoading(false);
      if (error) {
        toast.error(error.message);
      } else {
        toast.success("Account created! Check your email to confirm, then ask me to grant you admin access via SQL.");
        setMode("login");
      }
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Lock className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold">Admin Access</h1>
          <p className="text-muted-foreground mt-2">
            {mode === "login" ? "Sign in to manage Sulung Arung" : "Create your admin account"}
          </p>
        </div>

        {/* Mode Toggle */}
        <div className="flex rounded-xl border border-border overflow-hidden mb-6">
          <button
            type="button"
            onClick={() => setMode("login")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all ${
              mode === "login" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <LogIn className="w-4 h-4" /> Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-medium transition-all ${
              mode === "signup" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"
            }`}
          >
            <UserPlus className="w-4 h-4" /> Create Account
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 bg-card p-8 rounded-2xl border border-border">
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <div className="relative">
              <input
                type={showPw ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-input bg-background focus:outline-none focus:ring-2 focus:ring-ring pr-12"
                placeholder="••••••••"
                required
                minLength={6}
              />
              <button
                type="button"
                onClick={() => setShowPw(!showPw)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            {mode === "signup" && (
              <p className="text-xs text-muted-foreground mt-1">Minimum 6 characters</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-all disabled:opacity-50"
          >
            {loading
              ? mode === "login" ? "Signing in…" : "Creating account…"
              : mode === "login" ? "Sign In" : "Create Account"}
          </button>
        </form>

        {mode === "signup" && (
          <div className="mt-4 p-4 bg-muted/50 rounded-xl border border-border text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">After creating your account:</p>
            <p>Run this SQL to grant yourself admin access, replacing <code className="bg-muted px-1 rounded">your-user-id</code> with your actual user ID:</p>
            <pre className="mt-2 bg-background border border-border rounded-lg p-3 text-xs overflow-x-auto">
{`INSERT INTO public.user_roles (user_id, role)
VALUES ('your-user-id', 'admin');`}
            </pre>
          </div>
        )}

        <p className="text-center text-sm text-muted-foreground mt-6">
          <a href="/" className="hover:text-accent transition-colors">← Back to site</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
