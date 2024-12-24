# User Registration API

## Overview

The `/users/register` endpoint allows new users to register by providing their details. The endpoint validates the input, securely hashes the user's password, stores the user in the database, and generates a JSON Web Token (JWT) for authentication.

---

## Endpoint: `/users/register`

### Method: `POST`

---

## Request Format

The request must be in JSON format and include the following fields:

| Field              | Type   | Required | Description                                                  |
| ------------------ | ------ | -------- | ------------------------------------------------------------ |
| fullname.firstname | String | Yes      | The first name of the user. Minimum length: 3.               |
| fullname.lastname  | String | No       | The last name of the user. Minimum length: 3.                |
| email              | String | Yes      | The email address of the user. Must be a valid email format. |
| password           | String | Yes      | The user's password. Minimum length: 6.                      |

### Example Request:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "securepassword"
}
```
