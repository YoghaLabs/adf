import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/features/identity/components/AuthLayout";
import { authClient } from "@/features/identity/sdk/authClient";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onPasswordLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    const { error: err } = await authClient.signIn.email({ email, password });
    setBusy(false);
    if (err) {
      setError(err.message || "Login failed");
      return;
    }
    navigate("/");
  };

  const onMagicLink = async () => {
    setBusy(true);
    setError(null);
    const { error: err } = await authClient.signIn.magicLink({
      email,
      callbackURL: "/",
    });
    setBusy(false);
    if (err) setError(err.message || "Magic link failed");
    else setError("Magic link sent (check server log in local/dev).");
  };

  const oauth = async (provider: "github" | "gitlab" | "google" | "microsoft") => {
    setBusy(true);
    try {
      await authClient.signIn.social({ provider, callbackURL: "/" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "OAuth not configured");
      setBusy(false);
    }
  };

  return (
    <AuthLayout title="Sign in" subtitle="Enterprise Identity for ADF Studio">
      <form data-testid="page-login" className="space-y-3" onSubmit={onPasswordLogin}>
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
        />
        <Input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          aria-label="Password"
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <Button type="submit" variant="accent" className="w-full" disabled={busy}>
          Sign in with password
        </Button>
        <Button type="button" variant="outline" className="w-full" disabled={busy || !email} onClick={onMagicLink}>
          Send magic link
        </Button>
      </form>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {(["github", "gitlab", "google", "microsoft"] as const).map((p) => (
          <Button key={p} variant="ghost" disabled={busy} onClick={() => void oauth(p)}>
            {p}
          </Button>
        ))}
      </div>
      <div className="mt-4 flex justify-between text-sm">
        <Link className="text-accent" to="/identity/forgot-password">
          Forgot password
        </Link>
        <Link className="text-accent" to="/identity/register">
          Register
        </Link>
      </div>
    </AuthLayout>
  );
}
