export const handleFirebaseError = (code: string): string | null => {
  switch (code) {
    case "auth/email-already-in-use":
      return "E-Mail already used";

    case "auth/weak-password":
      return "Password minimal 6 characters long";

    case "auth/username-already-in-use":
      return "Username already used";

    default:
      return null;
  }
};
