export type errorAuthTypes = {
  MUST_UNIQUE: {
    status: number;
    message: {
      phone_number: string;
      email: string;
      nickname: string;
    };
  };
};

export const ERROR_REGISTER: errorAuthTypes = {
  MUST_UNIQUE: {
    status: 400,
    message: {
      phone_number: "user with this phone number already exists.",
      email: "user with this email address already exists.",
      nickname: "A user with that nickname already exists.",
    },
  },
};

export const parseErrorMessage = (error) => {
  let errorMessage = "Une erreur est survenue. Veuillez réessayer.";

  if (!error) {
    return;
  }

  if (error?.status === ERROR_REGISTER.MUST_UNIQUE.status) {
    if (
      ERROR_REGISTER.MUST_UNIQUE.message.phone_number ===
      error?.data?.phone_number[0]
    ) {
      return (errorMessage =
        "Un utilisateur avec ce numéro de téléphone existe déjà.");
    }
    if (ERROR_REGISTER.MUST_UNIQUE.message.email === error?.data?.email[0]) {
      return (errorMessage =
        "Un utilisateur avec cette adresse email existe déjà.");
    }
    if (
      ERROR_REGISTER.MUST_UNIQUE.message.nickname === error?.data?.nickname[0]
    ) {
      return (errorMessage = "Un utilisateur avec ce pseudo existe déjà.");
    }
  }
  return errorMessage;
};
