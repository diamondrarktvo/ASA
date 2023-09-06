## Table of Contents

- [Purchase](#purchase)
- [User](#user)
- [Authentication](#authentication)
- [Category](#category)
- [Product](#product)
- [Payment Method](#payment-method)
- [View and Like](#view-and-like)
- [Follow](#follow)

## User

### Create User

- **URL**: `/user`
- **Method**: POST
- **Description**: Create a new user.
- **Request**: User data to be created.

| Required     | Optional              |
| ------------ | --------------------- |
| nickname     | email                 |
| password     | is_professional       |
| last_name    | company_name          |
| first_name   | unique_company_number |
| phone_number | image                 |
| age          |                       |

```json
{
  "nickname": "pseudo",
  "password": "mot_de_passe",
  "last_name": "Nom",
  "first_name": "Prenom",
  "phone_number": "numero_telephone",
  "age": "22"
}
```

- **Response**: The created user object. `Status Created 201`

```json
{
  "id": 1,
  "nickname": "pseudo",
  "email": "",
  "is_active": true,
  "date_joined": "2023-08-18T19:06:15.249934Z",
  "first_name": "Prenom",
  "last_name": "Nom",
  "phone_number": "numero_telephone",
  "age": 22,
  "is_professional": false,
  "company_name": "",
  "unique_company_number": "",
  "image": null
}
```

### Update User

- **URL**: `/user`
- **Method**: PUT
- **Description**: Update user information.
- **Need Authentication**:

**Password fields is Removed in the Required**

| Required     | Optional              |
| ------------ | --------------------- |
| nickname     | email                 |
| last_name    | is_professional       |
| first_name   | company_name          |
| phone_number | unique_company_number |
| age          | image                 |

```http request
Authorization: token 0cb6a0cc962b5211960676ae9a20ad650c206db2
```

- **Request**: Updated user data.

```json
{
  "nickname": "pseudo",
  "last_name": "Nom",
  "first_name": "Prenom",
  "phone_number": "numero_telephone",
  "age": "22"
}
```

- **Response**: The created user object. `Status Accepted 202`

```json
{
  "id": 1,
  "nickname": "pseudo",
  "email": "",
  "is_active": true,
  "date_joined": "2023-08-18T19:06:15.249934Z",
  "first_name": "Prenom",
  "last_name": "Nom",
  "phone_number": "numero_telephone",
  "age": 22,
  "is_professional": false,
  "company_name": "",
  "unique_company_number": "",
  "image": null
}
```

### Get User

- **URL**: `/user/<int:pk>`
- **Method**: GET
- **Description**: Retrieve user details.
- **Response**: The requested user object. `Status Ok 200`

```json
{
  "id": 1,
  "nickname": "pseudo",
  "email": "",
  "is_active": true,
  "date_joined": "2023-08-18T19:06:15.249934Z",
  "first_name": "Prenom",
  "last_name": "Nom",
  "phone_number": "numero_telephone",
  "age": 22,
  "is_professional": false,
  "company_name": "",
  "unique_company_number": "",
  "image": null
}
```

### Delete User

- **URL**: `/user/<int:pk>`
- **Method**: DELETE
- **Description**: Delete a user.
- **Need Authentication**:

```http request
Authorization: token 0cb6a0cc962b5211960676ae9a20ad650c206db2
```

- **Response**: No content. `Status No content 204`

## Authentication

### User Authentication Token

- **URL**: `/user/auth`
- **Method**: POST
- **Description**: Authenticate a user.
- **Request**: Credential.

```json
{
  "phone_number": "numero_telephone",
  "password": "mot_de_passe"
}
```

- **Response**: User authentication token. `Status Ok 200`

```json
{
  "token": "926c06bd87e786e085a72b163e0d8e26f1ec6b11"
}
```

## Category

### List Categories

- **URL**: `/category`
- **Method**: GET
- **Description**: Retrieve all categories.

```json
[
  {
    "id": 1,
    "name": "category_name",
    "image": null
  },
  {
    "id": 2,
    "name": "category_name",
    "image": null
  }
]
```

## SubCategory

### List SubCategories

- **URL**: `/subcategory/<int:id_category>`
- **Method**: GET
- **Description**: Retrieve all subcategories of a category.

```json
[
  {
    "id": 1,
    "criteria": [
      {
        "id": 1,
        "response": [
          {
            "value": "CDD"
          },
          {
            "value": "CDI"
          },
          {
            "value": "Intérim"
          },
          {
            "value": "Autre"
          }
        ],
        "name": "Type de contrat",
        "type": "choice"
      },
      {
        "id": 2,
        "response": [],
        "name": "Secteur d'activité",
        "type": "text"
      },
      {
        "id": 3,
        "response": [],
        "name": "Fonction",
        "type": "text"
      },
      {
        "id": 4,
        "response": [
          {
            "value": "0 à 2 ans"
          },
          {
            "value": "2 à 5 ans"
          },
          {
            "value": "plus de 5 ans"
          }
        ],
        "name": "Expérience",
        "type": "choice"
      },
      {
        "id": 5,
        "response": [
          {
            "value": "CP"
          },
          {
            "value": "BEPC"
          },
          {
            "value": "BAC"
          },
          {
            "value": "BAC +2"
          },
          {
            "value": "BAC +3"
          },
          {
            "value": "BAC +5"
          }
        ],
        "name": "Niveau d'etudes",
        "type": "choice"
      },
      {
        "id": 6,
        "response": [
          {
            "value": "Temps partiel"
          },
          {
            "value": "Temps plein"
          }
        ],
        "name": "Travail à",
        "type": "choice"
      },
      {
        "id": 7,
        "response": [],
        "name": "Reference",
        "type": "text"
      }
    ],
    "nom": "Offre d'emploi",
    "category": 1
  }
]
```

## Vendeur Favoris

### Add new Favoris

- **URL**: `/follow/seller`
- **Method**: Post
- **Description**: follow other user
- **Need Authentication**:
- **Request**:

```json
{
  "seller_id": 1
}
```

- **Response**

```json
{
  "id": 1,
  "seller": {
    "id": 1,
    "nickname": "nickname",
    "image": null
  },
  "timestamp": "2023-09-06T17:53:41.890339Z"
}
```

### List all follow

- **URL**: `/follow/seller`
- **Method**: Get
- **Description**:
- **Need Authentication**:

- **Response**: `Status Ok 200`

```json
[
  {
    "id": 1,
    "seller": {
      "id": 1,
      "nickname": "nickname",
      "image": null
    },
    "timestamp": "2023-09-06T17:53:41.890339Z"
  }
]
```

### Delete favoris

- **URL**: `/follow/seller/<int:pk>`
- **Method**: Delete
- **Description**:
- **Need Authentication**:
- **Response**: `Status No content 204`
