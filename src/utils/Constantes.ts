import {
  annonceTypes,
  announcerTypes,
  categorieTypes,
  searchTypes,
  errorConstants,
} from "./Types";

const annonce: annonceTypes[] = [
  {
    id: 1,
    title: "Annonce 1",
    image: require("_images/logo.jpg"),
    description: "Description de l'annonce 1",
  },
  {
    id: 2,
    title: "Annonce 2",
    image: require("_images/logo.jpg"),
    description: "Description de l'annonce 2",
  },
  {
    id: 3,
    title: "Annonce 3",
    image: require("_images/logo.jpg"),
    description: "Description de l'annonce 3",
  },
  {
    id: 4,
    title: "Annonce 4",
    image: require("_images/logo.jpg"),
    description: "Description de l'annonce 4",
  },
  {
    id: 5,
    title: "Annonce 5",
    image: require("_images/logo.jpg"),
    description: "Description de l'annonce 5",
  },
];

const categorie: categorieTypes[] = [
  {
    id: 1,
    title: "Categorie 1",
    image: require("_images/logo.jpg"),
  },
  {
    id: 2,
    title: "Categorie 2",
    image: require("_images/logo.jpg"),
  },
  {
    id: 3,
    title: "Categorie 3",
    image: require("_images/logo.jpg"),
  },
  {
    id: 4,
    title: "Categorie 4",
    image: require("_images/logo.jpg"),
  },
  {
    id: 5,
    title: "Categorie 5",
    image: require("_images/logo.jpg"),
  },
];

const announcer: announcerTypes[] = [
  {
    id: 1,
    name: "Rakoto",
    image: require("_images/logo.jpg"),
    phoneNumber: "0345648425",
  },
  {
    id: 2,
    name: "Mety Amiko",
    image: require("_images/logo.jpg"),
    phoneNumber: "0345687825",
  },
  {
    id: 3,
    name: "Dama",
    image: require("_images/logo.jpg"),
    phoneNumber: "0346532595",
  },
  {
    id: 4,
    name: "Toky",
    image: require("_images/logo.jpg"),
    phoneNumber: "0335489654",
  },
  {
    id: 5,
    name: "Babaique",
    image: require("_images/logo.jpg"),
    phoneNumber: "0347938171",
  },
];

const search: searchTypes[] = [
  { id: 1, searchValue: "Voiture légère" },
  { id: 2, searchValue: "Jouets pour enfant de 4 ans" },
  { id: 3, searchValue: "Maison 4 chambres à louer" },
  { id: 4, searchValue: "Téléphone samsung 128 Gb" },
  { id: 5, searchValue: "Pantalon jean bleue" },
];

const ERROR_CONSTANT: errorConstants = {
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: {
    status: 404,
    message: "User matching query does not exist.",
  },
  INTERNAL_SERVER_ERROR: 500,
};

export const Constantes = {
  DATA: {
    annonce,
    categorie,
    announcer,
    search,
  },
  error: {
    ERROR_CONSTANT,
  },
};
