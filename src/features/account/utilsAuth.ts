export type errorAuthTypes = {
  E400: {
    status: number;
    message: {
      phone_numberAlreadyUsed: string;
      emailAlreadyUsed: string;
      nicknameAlreadyUsed: string;
      phone_number_not_valid: string;
      email_not_valid: string;
      nickname_not_valid: string;
      noImage: string;
    };
  };
};

export type errorNoAuthTypes = {
  status: number;
  message: string;
};

export const ERROR_REGISTER: errorAuthTypes = {
  E400: {
    status: 400,
    message: {
      phone_numberAlreadyUsed: "user with this phone number already exists.",
      emailAlreadyUsed: "user with this email address already exists.",
      nicknameAlreadyUsed: "A user with that nickname already exists.",
      phone_number_not_valid: "Enter a valid phone number.",
      email_not_valid: "Enter a valid email address.",
      nickname_not_valid: "Enter a valid nickname.",
      noImage:
        "The submitted data was not a file. Check the encoding type on the form.",
    },
  },
};

export const ERROR_NO_AUTH: errorNoAuthTypes = {
  status: 401,
  message: "Authentication credentials were not provided.",
};

export const parseErrorMessage = (error: any): string => {
  let errorMessage = "Une erreur est survenue. Veuillez réessayer.";

  if (!error) {
    return errorMessage;
  }

  console.log("error?.data e: ", error?.data);

  if (error.status && error.status === ERROR_REGISTER.E400.status) {
    if (error.data) {
      if (error.data.phone_number) {
        if (
          error.data.phone_number[0] ===
          ERROR_REGISTER.E400.message.phone_numberAlreadyUsed
        ) {
          return (errorMessage =
            "Un utilisateur avec ce numéro de téléphone existe déjà.");
        }
        if (
          error.data.phone_number[0] ===
          ERROR_REGISTER.E400.message.phone_number_not_valid
        ) {
          return (errorMessage =
            "Veuillez entrer un numéro de téléphone valide.");
        }
      }
      if (error.data.email) {
        if (
          error.data.email[0] === ERROR_REGISTER.E400.message.emailAlreadyUsed
        ) {
          return (errorMessage =
            "Un utilisateur avec cette adresse email existe déjà.");
        }
        if (
          error.data.email[0] === ERROR_REGISTER.E400.message.email_not_valid
        ) {
          return (errorMessage = "Veuillez entrer une adresse email valide.");
        }
      }

      if (error.data.image) {
        if (error.data.image[0] === ERROR_REGISTER.E400.message.noImage) {
          return (errorMessage = "Veuillez entrer une image valide.");
        }
      }

      if (error.data.nickname) {
        if (
          error.data.nickname[0] ===
          ERROR_REGISTER.E400.message.nicknameAlreadyUsed
        ) {
          return (errorMessage = "Un utilisateur avec ce pseudo existe déjà.");
        }
        if (
          error.data.nickname[0] ===
          ERROR_REGISTER.E400.message.nickname_not_valid
        ) {
          return (errorMessage = "Veillez entrer un pseudo valide.");
        }
      }
    } else {
      return errorMessage;
    }
  }

  if (error?.status === ERROR_NO_AUTH.status) {
    if (error?.data.detail === ERROR_NO_AUTH.message) {
      return (errorMessage =
        "Vous devez être connecté pour effectuer cette action ou votre session a expiré, veuillez vous reconnecter.");
    }
  }
  return errorMessage;
};

export const transformDataToFormData = (data: any) => {
  const formData = new FormData();

  for (let key in data) {
    if (key === "token" || (key === "image" && !data[key])) continue;
    if (key === "image" && data[key]) {
      formData.append("image", {
        //@ts-ignore
        uri: data[key],
        type: "image/jpeg",
        name: "image.jpg",
      });
      continue;
    }
    formData.append(key, data[key]?.toString());
  }

  return formData;
};
