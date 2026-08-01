import { useState } from "react";
import { Link } from "react-router-dom";
import { Button, Input } from "@/components/ui";
import { AuthLayout } from "@/features/identity/components/AuthLayout";

export function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <AuthLayout title="Forgot password" subtitle="Reset via Identity Layer">
      <form
        data-testid="page-forgot-password"
        className="space-y-3"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <Input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          aria-label="Email"
        />
        <Button type="submit" variant="accent" className="w-full">
          Send reset link
        </Button>
        {sent && (
          <p className="text-sm text-emerald-400">
            If the account exists, a reset link will be issued (wire SMTP for production).
          </p>
        )}
      </form>
      <p className="mt-4 text-center text-sm">
        <Link className="text-accent" to="/identity/login">
          Back to login
        </Link>
      </p>
    </AuthLayout>
  );
}
