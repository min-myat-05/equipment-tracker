import { useEffect, useRef, useState } from "react";
import { LogOut } from "lucide-react";
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
  const userName = user?.name ?? "User";

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

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setIsProfileOpen((open) => !open)}
              className="flex items-center space-x-3 rounded-full px-2 py-1 transition hover:bg-accent/10"
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
              <div className="text-sm text-muted-foreground">{userName}</div>
            </button>

            {isProfileOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-card border border-border rounded-lg shadow-xl z-50 animate-in fade-in-0 slide-in-from-top-1 duration-200">
                <Button
                  onClick={() => {
                    logout();
                    navigate("/login");
                  }}
                  className="flex items-center gap-3 w-full text-left py-2 rounded-md hover:bg-accent hover:text-accent-foreground transition-all duration-200"
                >
                  <LogOut size={18} />
                  <span>Logout</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
