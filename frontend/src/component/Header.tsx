import { useEffect, useRef, useState } from "react";
import { ChevronDown, KeyRound, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./Mode-Toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
export default function Header() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const userName = user?.username ?? "User";

  useEffect(() => {
    if (!isProfileOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isProfileOpen]);
  return (
    <header className="border-b border-border bg-background">
      <div className=" flex items-center justify-between ">
        <div className="text-2xl  font-semibold text-foreground">
          CEIT Equipment Inventory
        </div>
        <div className="flex items-center space-x-4">
          <div className="rounded-full transition hover:bg-accent/10 dark:hover:bg-accent/20 p-1">
            <ModeToggle />
          </div>

          <div className="relative z-100" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center space-x-2 rounded-full px-2 py-1 transition hover:bg-accent/10"
              aria-expanded={isProfileOpen}
              aria-haspopup="menu"
            >
              <Avatar data-size="sm">
                <AvatarImage src="" alt={userName} />
                <AvatarFallback>
                  {userName
                    .split(" ")
                    .map((part) => part[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="text-sm text-foreground">{userName}</div>
              <ChevronDown
                className={`h-4 w-4 text-muted-foreground transition-transform ${
                  isProfileOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-3 w-72 bg-white/90 dark:bg-slate-950/90 border border-border/70 rounded-2xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200 backdrop-blur-md">
                <span className="absolute -top-2 right-6 h-3 w-3 rotate-45 bg-white/90 dark:bg-slate-950/90 border-l border-t border-border/70" />
                <div className="px-4 py-4 border-b border-border/60">
                  <div className="flex items-center gap-3">
                    <Avatar data-size="sm">
                      <AvatarImage src="" alt={userName} />
                      <AvatarFallback>
                        {userName
                          .split(" ")
                          .map((part) => part[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-foreground truncate">
                        {userName}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {user?.email ?? "Signed in"}
                      </div>
                    </div>
                    <span className="ml-auto rounded-full bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                      {user?.role ?? "user"}
                    </span>
                  </div>
                </div>

                <div className="py-2">
                  <Button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate("/change-password");
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 rounded-none px-4 py-2 text-left text-sm hover:bg-muted/60"
                  >
                    <KeyRound size={18} />
                    <span>Change Password</span>
                  </Button>
                  <Button
                    onClick={() => {
                      logout().finally(() => navigate("/login"));
                    }}
                    variant="ghost"
                    size="sm"
                    className="w-full justify-start gap-3 rounded-none px-4 py-2 text-left text-sm hover:bg-muted/60"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
