# Todo

- [x] Register
- [x] Login
- [x] Pofile
- [ ] chat
- [x] CRUD products

# fonctionnalité

- [x] Publier des annonces
- [x] Consulter les annonces
- [x] Créer un compte
- [ ] Affecter des transactions
- [x] Suivre des produits ou des vendeurs
- [x] Suivre l’évolution d’un achat jusqu’à la livraison

## Manuale

### Endpoints

- `POST api/client/login`
  Request:

```json
{
  "telephone": "032000000",
  "mot_de_passe": "thepassword"
}
```

Response:

```json
{
  "token": "7a43b3b266dd44da6e70b62311a983dcb3b2c465"
}
```

- `POST api/client/register` <br>
    - `email` et `image` sont facultatifs

Request:

```json
{
  "nom": "Non",
  "prenom": "Prenom",
  "username": "nom_utlisateur",
  "email": "xyz@gmail.com",
  "mot_de_passe": "thepassword",
  "telephone": "03200000",
  "age": "22"
}
```

Response: `Status 201 CREATED`

```json
{
  "age": 22,
  "telephone": "03200000",
  "image": null,
  "utilisateur": {
    "id": 3,
    "username": "nom_utlisateur",
    "first_name": "Prenom",
    "last_name": "Nom",
    "email": "xyz@gmail.com",
    "date_joined": "2023-08-14T19:02:08.815990Z"
  }
}
```

- `GET api/client/<int:pk>`
  **l'authentification est facultative, vous pouvez avoirs plus d'information en s'authentifiant**

Example:

```js
fetch('http://0.0.0.0:5000/api/client/1', {
    headers: {
        'Authorization': "token 7a43b3b266dd44da6e70b62311a983dcb3b2c465",
        'Accept': '*/*'
    },
    method: 'GET',
})
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

```

Response: `Status 200 Ok`

```json  
{
    "performance": {
        "transaction": [],
        "achat": [],
        "likes": 0,
        "vue": 0
    },
    "client": {
        "age": 22,
        "telephone": "0325911514",
        "image": null,
        "utilisateur": {
            "id": 1,
            "username": "joe",
            "first_name": "Fitahiana",
            "last_name": "Nomeniavo Joe",
            "email": "24nomeniavo@gmail.com",
            "date_joined": "2023-08-13T17:31:33.192191Z"
        }
    },
    "produit": []
}
```

- `PUT api/client/<int:pk>`
    - **M-A-jour le profiles**
- `DELETE api/client/<int:pk>`
    - **Effacer un profilé**
- `GET api/categorie`
  Response:

```json
{
  "count": 1,
  "next": null,
  "previous": null,
  "results": [
    {
      "id": 1,
      "criteres": [
        {
          "id": 1,
          "nom": "criter_1",
          "status": false
        },
        {
          "id": 2,
          "nom": "criter_2",
          "status": false
        }
      ],
      "nom": "categirie_1"
    }
  ]
}
```

- `GET api/produit`

```json
{
}
```

- `POST api/produit`
  Example:

```js
const formData = new FormData();
formData.append("nom", "pix")
formData.append("description", "some description")
for (const image of value.images) {
    formData.append("uploaded_images", image);
}

// {
//     "nom": [
//         "This field is required."
//     ],
//     "description": [
//         "This field is required."
//     ],
//     "localite": [
//         "This field is required."
//     ],
//     "prix": [
//         "This field is required."
//     ],
//     "categorie": [
//         "This field is required."
//     ],
//     "utilisateur": [
//         "This field is required."
//     ],
//     "modes_de_payement": [
//         "This field is required."
//     ]
// }

###
facultative
//  prix_livraison_local: decimal
//  prix_livraison_national: decimal
//  payement_integre: boolean
//  quantite: int 1 par defaut


fetch('http://0.0.0.0:5000/api/produit', {
    headers: {
        'Authorization': "token 7a43b3b266dd44da6e70b62311a983dcb3b2c465",
        'Accept': '*/*'
    },
    method: 'POST',
    body: formData,
})
    .then(response => {
        console.log('Response:', response);
    })
    .catch(error => {
        console.error('Error:', error);
    });

```

- `PUT produit/add_payement/<int:pk>`
  pk est id produit

- Need authentication token
  Request:

```json
  [
  {
    "nom": "MobileMoney",
    "telephone": "032000000"
  },
  {
    "nom": "MobileMoney",
    "telephone": "038000000"
  }
]
```
