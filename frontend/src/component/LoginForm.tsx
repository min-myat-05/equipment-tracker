import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/TUM-4-1536x1152.jpg";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

export default function LoginForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const previousTheme = theme ?? "system";
    if (previousTheme !== "light") {
      setTheme("light");
    }
    return () => {
      if (previousTheme !== "light") {
        setTheme(previousTheme);
      }
    };
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!email.trim() || !password.trim()) {
      setError("Email and password are required.");
      return;
    }
    setIsSubmitting(true);
    login(email, password)
      .then((result) => {
        if (!result.ok) {
          setError(result.error ?? "Login failed.");
          return;
        }
        navigate("/dashboard");
      })
      .finally(() => setIsSubmitting(false));
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full mt-24 max-w-md rounded-lg border border-white/50 bg-white/60 text-slate-900 shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Login</h1>
        <p className="text text-slate-900 mt-1">
          Enter your email and password to continue.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label
              className="text-sm  text-slate-900  font-medium"
              htmlFor="login-email"
            >
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label
              className="text-sm  text-slate-900 font-medium"
              htmlFor="login-password"
            >
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="********"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
