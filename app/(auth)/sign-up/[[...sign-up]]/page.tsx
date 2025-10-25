
import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <SignUp
      redirectUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || "/"}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || "/sign-in"}
    />
  );
}
