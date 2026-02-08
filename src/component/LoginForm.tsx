import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/TUM-4-1536x1152.jpg";

export default function LoginForm() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!email.trim() || !password.trim()) return;
    navigate("/dashboard");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="w-full max-w-md rounded-lg border bg-black/30 shadow-sm p-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-sm text-slate-300 mt-1">
          Enter your email and password to continue.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="login-email">
              Email
            </label>
            <input
              id="login-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium" htmlFor="login-password">
              Password
            </label>
            <input
              id="login-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/30"
              placeholder="********"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full rounded bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Sign in
          </button>
        </form>
      </div>
    </div>
  );
}
