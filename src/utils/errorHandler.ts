export const handleAuthError = (
  code: string
): { message: string; field: string } | null => {
  switch (code) {
    case "auth/email-already-in-use":
      return { message: "E-Mail already used", field: "email" };

    case "auth/weak-password":
      return {
        message: "Password minimal 6 characters long",
        field: "password",
      };

    case "auth/username-already-in-use":
      return { message: "Username already used", field: "username" };

    case "auth/user-not-found":
      return { message: "Wrong Info", field: "email" };

    case "auth/wrong-password":
      return { message: "Wrong Info", field: "password" };

    default:
      return null;
  }
};
