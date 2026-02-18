import { useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import AdminLogin from "@/pages/AdminLogin";

interface AdminGuardProps {
  children: ReactNode;
}

const AdminGuard = ({ children }: AdminGuardProps) => {
  const [status, setStatus] = useState<"loading" | "unauthorized" | "authorized">("loading");
  const navigate = useNavigate();

  useEffect(() => {
    let mounted = true;

    const checkAuth = async (userId: string) => {
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", userId)
        .eq("role", "admin")
        .maybeSingle();
      if (mounted) {
        setStatus(data ? "authorized" : "unauthorized");
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        if (mounted) setStatus("unauthorized");
      } else {
        checkAuth(session.user.id);
      }
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        if (mounted) setStatus("unauthorized");
      } else {
        checkAuth(session.user.id);
      }
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  if (status === "loading") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (status === "unauthorized") {
    return <AdminLogin />;
  }

  return <>{children}</>;
};

export default AdminGuard;
