import { useIdentityStore } from "@/features/identity/stores";

export function useIdentity() {
  return useIdentityStore();
}

export function useIsAuthenticated() {
  return useIdentityStore((s) => Boolean(s.user));
}
