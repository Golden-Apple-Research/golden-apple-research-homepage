import { authClient } from "~/lib/auth/auth-client"; // Dein Better-Auth Client

export const KeycloakLogin = () => {
  const handleLogin = async () => {
    await authClient.signIn.social({
      provider: "keycloak",
      callbackURL: "/", // Wohin nach erfolgreichem Login?
    });
  };

  return (
    <div class="mx-auto mt-10 max-w-md">
      <h1 class="mb-6 text-center text-2xl font-bold">Sign In</h1>
      <div class="space-y-4">
        <button
          onClick={handleLogin}
          class="flex w-full cursor-pointer items-center justify-center gap-3 rounded-lg bg-gray-800 px-4 py-3 text-white transition-colors hover:bg-gray-900"
        >
          Sign In with Keycloak
        </button>
        <p class="mt-4 text-center text-sm text-gray-300">
          You'll be redirected to Keycloak to complete the sign-in process.
        </p>
      </div>
    </div>
  );
};
