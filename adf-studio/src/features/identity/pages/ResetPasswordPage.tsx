import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/features/identity/components/AuthLayout";

export function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [done, setDone] = useState(false);

  return (
    <AuthLayout title="Reset password" subtitle="Choose a new password">
      <form
        data-testid="page-reset-password"
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          if (password.length >= 10) setDone(true);
        }}
      >
        <Input
          type="password"
          required
          minLength={10}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="New password (min 10)"
          aria-label="New password"
        />
        <Button type="submit" variant="accent" className="w-full">
          Update password
        </Button>
        {done && <p className="text-sm text-emerald-400">Password updated (Identity Layer).</p>}
      </form>
      <p className="mt-4 text-center text-sm">
        <Link className="text-accent" to="/identity/login">
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}
