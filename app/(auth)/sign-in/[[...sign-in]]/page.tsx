
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignIn
      redirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || "/onboarding"}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_UP_URL || "/sign-up"}
    />
  );
}
