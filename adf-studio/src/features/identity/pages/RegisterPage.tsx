import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/features/identity/components/AuthLayout";
import { authClient } from "@/features/identity/sdk/authClient";

export function RegisterPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 10) {
      setError("Password policy: minimum 10 characters");
      return;
    }
    setBusy(true);
    setError(null);
    const { error: err } = await authClient.signUp.email({ name, email, password });
    setBusy(false);
    if (err) {
      setError(err.message || "Registration failed");
      return;
    }
    navigate("/");
  };

  return (
    <AuthLayout title="Create account" subtitle="Register via Identity Layer">
      <form data-testid="page-register" className="space-y-3" onSubmit={onSubmit}>
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required aria-label="Name" />
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          aria-label="Email"
        />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password (min 10)"
          required
          aria-label="Password"
        />
        {error && <p className="text-sm text-rose-400">{error}</p>}
        <Button type="submit" variant="accent" className="w-full" disabled={busy}>
          Register
        </Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Already have an account?{" "}
        <Link className="text-accent" to="/identity/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
