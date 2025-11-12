import { useEffect } from "react";
import { supabase } from "../lib/supabase";
import { usePortfolioStore } from "../store/portfolioStore";

export function useAuthListener() {
  const setUser = usePortfolioStore((s) => s.setUser);
  const setPortfolio = usePortfolioStore((s) => s.setPortfolioData);

  useEffect(() => {
    // ✅ Get saved session (Supabase v2 uses getSession())
    const getInitialSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        fetchPortfolio(session.user.id, setPortfolio);
      }
    };

    getInitialSession();

    // ✅ Listen for login/logout changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
        fetchPortfolio(session.user.id, setPortfolio);
      } else {
        setUser(null);
        setPortfolio(null);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setPortfolio]);
}

async function fetchPortfolio(userId: string, setPortfolio: (data: any) => void) {
  const { data, error } = await supabase
    .from("portfolios")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error("Failed to fetch portfolio:", error.message);
    setPortfolio(null);
    return;
  }

  if (data) {
    setPortfolio(data);
  }
}
