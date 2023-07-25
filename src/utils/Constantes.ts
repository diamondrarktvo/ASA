import { annonceTypes, announcerTypes, categorieTypes } from "./Types";

const annonce: annonceTypes[] = [
    {
        id: 1,
        title: "Annonce 1",
        image: require('_images/logo.jpg'),
        description: "Description de l'annonce 1"
    },
    {
        id: 2,
        title: "Annonce 2",
        image: require('_images/logo.jpg'),
        description: "Description de l'annonce 2"
    },
    {
        id: 3,
        title: "Annonce 3",
        image: require('_images/logo.jpg'),
        description: "Description de l'annonce 3"
    },
    {
        id: 4,
        title: "Annonce 4",
        image: require('_images/logo.jpg'),
        description: "Description de l'annonce 4"
    },
    {
        id: 5,
        title: "Annonce 5",
        image: require('_images/logo.jpg'),
        description: "Description de l'annonce 5"
    },
]

const categorie: categorieTypes[] = [
    {
        id: 1,
        title: "Categorie 1"
    },
    {
        id: 2,
        title: "Categorie 2"
    },
    {
        id: 3,
        title: "Categorie 3"
    },
    {
        id: 4,
        title: "Categorie 4"
    },
    {
        id: 5,
        title: "Categorie 5"
    },
]

const announcer: announcerTypes[] = [
    {
        id: 1,
        name: "Annonceur 1",
        image: require('_images/logo.jpg'),
        phoneNumber: "0345648425"
    },
    {
        id: 2,
        name: "Annonceur 2",
        image: require('_images/logo.jpg'),
        phoneNumber: "0345687825"
    },
    {
        id: 3,
        name: "Annonceur 3",
        image: require('_images/logo.jpg'),
        phoneNumber: "0346532595"
    },
    {
        id: 4,
        name: "Annonceur 4",
        image: require('_images/logo.jpg'),
        phoneNumber: "0335489654"
    },
    {
        id: 5,
        name: "Annonceur 5",
        image: require('_images/logo.jpg'),
        phoneNumber: "0347938171"
    },
]

export const Constantes = {
    DATA: {
        annonce,
        categorie,
        announcer
    }
}