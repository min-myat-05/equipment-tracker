import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import backgroundImage from "../assets/TUM-4-1536x1152.jpg";
import { useTheme } from "next-themes";
import { useAuth } from "@/context/AuthContext";

export default function RegisterForm() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    // Intentionally run once to avoid flipping themes on updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);
    const result = await register({ name, email, password });
    setIsSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Registration failed.");
      return;
    }

    setSuccess("Account created. Wait for Super Admin approval.");
    setTimeout(() => navigate("/login"), 1200);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full mt-20 max-w-md rounded-lg border border-white/50 bg-white/60 text-slate-900 shadow-sm p-6">
        <h1 className="text-2xl font-semibold text-slate-900">Create Account</h1>
        <p className="text-slate-900 mt-1 text-sm">
          Register to request access. Your account starts as pending.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-slate-900 font-medium" htmlFor="register-name">
              Full Name
            </label>
            <input
              id="register-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="Jane Doe"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-900 font-medium" htmlFor="register-email">
              Email
            </label>
            <input
              id="register-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-900 font-medium" htmlFor="register-password">
              Password
            </label>
            <input
              id="register-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="********"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-900 font-medium" htmlFor="register-confirm">
              Confirm Password
            </label>
            <input
              id="register-confirm"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="w-full rounded border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="********"
              required
            />
          </div>

          {error && <div className="text-sm text-red-600">{error}</div>}
          {success && <div className="text-sm text-emerald-600">{success}</div>}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:opacity-70"
          >
            {isSubmitting ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-slate-900 mt-4">
          Already have an account?{" "}
          <Link className="text-primary underline" to="/login">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
