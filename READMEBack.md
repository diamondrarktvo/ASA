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

```http request
Authorization: token 0cb6a0cc962b5211960676ae9a20ad650c206db2
```

- **Request**: Updated user data.

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

## Purchase

### List Purchases

- **URL**: `/purchase`
- **Method**: GET
- **Description**: Retrieve a list of purchases.
- **Response**: A list of purchase objects.

### Create Purchase

- **URL**: `/purchase`
- **Method**: POST
- **Description**: Create a new purchase.
- **Request**: Purchase data to be created.
- **Response**: The created purchase object.

### Retrieve Purchase

- **URL**: `/purchase/<int:pk>`
- **Method**: GET
- **Description**: Retrieve a specific purchase.
- **Response**: The requested purchase object.

### Delete Purchase

- **URL**: `/purchase/<int:pk>`
- **Method**: DELETE
- **Description**: Delete a specific purchase.
- **Response**: No content.

### Confirm Purchase

- **URL**: `/purchase/confirm/<int:pk>`
- **Method**: PATCH
- **Description**: Confirm a purchase.
- **Request**: Updated purchase data.
- **Response**: The updated purchase object.
