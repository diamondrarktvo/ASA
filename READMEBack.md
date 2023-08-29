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
    "name": "subcategory_name",
    "category": 1,
  },
  {
    "id": 2,
    "name": "subcategory_name",
    "category": 1,
  }
]
```

## Criteia

### List Criteias
- **URL**: `/criteia/<int:id_subcategory>`
- **Method**: GET
- **Description**: Retrieve all criteias of a subcategory.
```json
[
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
        "type": "list",
        "sub_category": 1
    },
    {
        "id": 2,
        "response": [],
        "name": "Secteur d'activite",
        "type": "str",
        "sub_category": 1
    },
    {
        "id": 3,
        "response": [],
        "name": "Fonction",
        "type": "str",
        "sub_category": 1
    }
]
```