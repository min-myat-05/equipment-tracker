import { useEffect, useRef, useState } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "./Mode-Toggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
export default function Header() {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement | null>(null);
  const userName = "User Name";
  const userEmail = "user@example.com";

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

            {isProfileOpen ? (
              <div className="absolute z-50 right-0 mt-2 w-56 rounded-xl border border-border/60 bg-background shadow-lg">
                <div className="border-b border-border/60 px-4 py-3">
                  <div className="text-sm font-semibold text-foreground">
                    {userName}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {userEmail}
                  </div>
                </div>
                <div className="py-2">
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent/10"
                  >
                    <User size={16} />
                    Profile
                  </button>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent/10"
                  >
                    <Settings size={16} />
                    Settings
                  </button>
                </div>
                <div className="border-t border-border/60 py-2">
                  <button
                    type="button"
                    onClick={() => navigate("/login")}
                    className="flex w-full items-center gap-2 px-4 py-2 text-sm text-foreground hover:bg-accent/10"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  );
}
