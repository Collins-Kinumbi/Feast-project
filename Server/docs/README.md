# Feast API Documentation

Base URL: `https://feast-rest-api.onrender.com/api/v1/welcome`

---

## Table of Contents

1. [Welcome Endpoint](#welcome-endpoint)
2. [Authentication](#authentication)

   - [Sign Up](#sign-up)
   - [Login](#login)
   - [Check Authentication](#check-authentication)
   - [Forgot Password](#forgot-password)
   - [Reset Password](#reset-password)
   - [Logout](#logout)

3. [Recipes](#recipes)

   - [Get All Recipes](#get-all-recipes)
   - [Add a Recipe](#add-a-recipe)
   - [Get My Recipes](#get-my-recipes)
   - [Get a Single Recipe](#get-a-single-recipe)
   - [Update a Recipe](#update-a-recipe)
   - [Delete a Recipe](#delete-a-recipe)

4. [Users](#users)

   - [Get All Users](#get-all-users)
   - [Get User by ID](#get-user-by-id)
   - [Update Details](#update-details)
   - [Update Avatar](#update-avatar)
   - [Update Password](#update-password)
   - [Delete Account](#delete-account)

5. [Error Handling](#error-handling)

---

## Welcome Endpoint

**GET** `/welcome`
Returns a simple welcome message.

**Response**

```json
{
  "message": "Welcome to Feast..."
}
```

---

## Authentication

All authentication endpoints are under `/auth` and do not require a token except where noted.

### Sign Up

**POST** `/auth/signup`

Create a new user account.

**Body** (JSON)

| Field      | Type   | Required | Description           |
| ---------- | ------ | -------- | --------------------- |
| `name`     | String | Yes      | Full name of the user |
| `email`    | String | Yes      | Unique email address  |
| `password` | String | Yes      | Minimum 8 characters  |

**Response**

- `201 Created` on success

```json
{
  "status": "success",
  "data": { "user": { /* user object */, "token": "<jwt>" } }
}
```

### Login

**POST** `/auth/login`

Authenticate an existing user.

**Body** (JSON)

| Field      | Type   | Required | Description      |
| ---------- | ------ | -------- | ---------------- |
| `email`    | String | Yes      | Registered email |
| `password` | String | Yes      | User password    |

**Response**

- `200 OK` on success

```json
{
  "status": "success",
  "data": { "user": { /* user object */, "token": "<jwt>" } }
}
```

### Check Authentication

**GET** `/auth/checkAuth`

Check if the provided JWT is valid.

**Headers**

| Key             | Value          |
| --------------- | -------------- |
| `Authorization` | `Bearer <jwt>` |

**Response**

- `200 OK` with user info if valid

```json
{
  "status": "success",
  "data": {
    "user": {
      /* user object */
    }
  }
}
```

### Forgot Password

**POST** `/auth/forgotPassword`

Send a password reset email.

**Body** (JSON)

| Field   | Type   | Required | Description      |
| ------- | ------ | -------- | ---------------- |
| `email` | String | Yes      | Registered email |

**Response**

- `200 OK` on success

```json
{ "status": "success", "message": "Reset token sent to email." }
```

### Reset Password

**PATCH** `/auth/resetPassword/:token`

Reset user password using the token sent via email.

**Params**

| Name    | Type   | Required | Description          |
| ------- | ------ | -------- | -------------------- |
| `token` | String | Yes      | Password reset token |

**Body** (JSON)

| Field        | Type   | Required | Description           |
| ------------ | ------ | -------- | --------------------- |
| `password`   | String | Yes      | New password          |
| `confirmPwd` | String | Yes      | Must match `password` |

**Response**

- `200 OK` on success

```json
{ "status": "success", "data": { "token": "<new-jwt>" } }
```

### Logout

**GET** `/auth/logout`

Invalidate the current JWT (clears cookie).

**Response**

- `200 OK`

```json
{ "status": "success", "message": "You are logged out." }
```

---

## Recipes

All recipe endpoints are under `/recipes`.

### Get All Recipes

**GET** `/recipes`

Fetches all recipes (public).

**Response**

- `200 OK`

```json
{
  "status": "success",
  "results": <number>,
  "data": { "recipes": [ /* array of recipe objects */ ] }
}
```

### Add a Recipe

**POST** `/recipes`

Add a new recipe (authenticated).

**Headers**

| Key             | Value          |
| --------------- | -------------- |
| `Authorization` | `Bearer <jwt>` |

**Body** (multipart/form-data)

| Field          | Type   | Required | Description             |
| -------------- | ------ | -------- | ----------------------- |
| `title`        | String | Yes      | Recipe title            |
| `ingredients`  | String | Yes      | Comma-separated list    |
| `instructions` | String | Yes      | Cooking steps           |
| `image`        | File   | No       | Recipe image (JPEG/PNG) |

**Response**

- `201 Created`

```json
{
  "status": "success",
  "data": {
    "recipe": {
      /* new recipe object */
    }
  }
}
```

### Get My Recipes

**GET** `/recipes/my-recipes`

Fetch recipes created by the authenticated user.

**Headers**

| Key             | Value          |
| --------------- | -------------- |
| `Authorization` | `Bearer <jwt>` |

**Response**

- `200 OK`

```json
{ "status": "success", "results": <number>, "data": { "recipes": [ /* array */ ] } }
```

### Get a Single Recipe

**GET** `/recipes/:id`

Fetch one recipe by its ID.

**Params**

| Name | Type   | Required | Description     |
| ---- | ------ | -------- | --------------- |
| `id` | String | Yes      | Recipe ObjectID |

**Response**

- `200 OK`

```json
{
  "status": "success",
  "data": {
    "recipe": {
      /* recipe object */
    }
  }
}
```

### Update a Recipe

**PATCH** `/recipes/:id`

Modify a recipe (authenticated, owner or admin).

**Headers**

| Key             | Value          |
| --------------- | -------------- |
| `Authorization` | `Bearer <jwt>` |

**Params** same as Get a Single Recipe

**Body** (multipart/form-data or JSON)

- Any updatable fields (`title`, `ingredients`, `instructions`) and optional new `image`.

**Response**

- `200 OK`

```json
{
  "status": "success",
  "data": {
    "recipe": {
      /* updated object */
    }
  }
}
```

### Delete a Recipe

**DELETE** `/recipes/:id`

Remove a recipe (authenticated, owner or admin).

**Headers** same as Update

**Response**

- `204 No Content`

---

## Users

All user endpoints are under `/users`.

### Get All Users

**GET** `/users`

Fetch all users (public).

**Response**

- `200 OK`

```json
{ "status": "success", "results": <number>, "data": { "users": [ /* array of users */ ] } }
```

### Get User by ID

**GET** `/users/:id`

Fetch a single user by ID.

**Params**

| Name | Type   | Required | Description   |
| ---- | ------ | -------- | ------------- |
| `id` | String | Yes      | User ObjectID |

**Response**

- `200 OK`

```json
{
  "status": "success",
  "data": {
    "user": {
      /* user object */
    }
  }
}
```

### Update Details

**PATCH** `/users/updateDetails`

Update name, email, or other profile details (authenticated).

**Headers**

| Key             | Value          |
| --------------- | -------------- |
| `Authorization` | `Bearer <jwt>` |

**Body** (JSON)

- Fields to update, e.g. `name`, `email`.

**Response**

- `200 OK`

```json
{
  "status": "success",
  "data": {
    "user": {
      /* updated object */
    }
  }
}
```

### Update Avatar

**PATCH** `/users/updateAvatar`

Upload or change profile avatar (authenticated).

**Headers** same as Update Details

**Body** (multipart/form-data)

| Field    | Type | Required | Description         |
| -------- | ---- | -------- | ------------------- |
| `avatar` | File | Yes      | JPEG/PNG image file |

**Response**

- `200 OK`

```json
{
  "status": "success",
  "data": {
    "user": {
      /* updated object */
    }
  }
}
```

### Update Password

**PATCH** `/users/updatePassword`

Change the current user’s password (authenticated).

**Headers** same as above

**Body** (JSON)

| Field             | Type   | Required | Description                |
| ----------------- | ------ | -------- | -------------------------- |
| `currentPassword` | String | Yes      | Existing password          |
| `newPassword`     | String | Yes      | New password (min 8 chars) |

**Response**

- `200 OK`

```json
{ "status": "success", "data": { "token": "<new-jwt>" } }
```

### Delete Account

**DELETE** `/users/deleteAccount`

Remove the authenticated user’s account.

**Headers** same as above

**Response**

- `204 No Content`

---

## Error Handling

- All invalid routes return `404 Not Found` with:

```json
{ "status": "fail", "message": "Can't find <route> on this server!" }
```

- Validation, authentication, and operational errors return appropriate `4xx` or `5xx` codes with JSON:

```json
{ "status": "error", "message": "Detailed error message" }
```
