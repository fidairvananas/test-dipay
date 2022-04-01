# TEST DIPAY

## Running Project
- `npm run start`

## Endpoints :

List of available endpoints:

- `POST /users`
- `POST /authentications`
- `GET /notes`
- `GET /notes/:id`
- `POST /notes`
- `PUT /notes/:id`
- `DELETE /notes/:id`


&nbsp;


## 1. POST /users

Request:

- body:

```json
{
  "username": "string",
  "password": "string",
  "fullName": "string"
}
```

_Response (201 - Created)_

```json
{
  "status": "string",
  "data": {
    "userId" : "integer"
  }
}

```


## 2. POST /authentications

Request:

- body:

```json
{
  "username": "string",
  "password": "string",
}
```

_Response (201 - Created)_

```json
{
  "status": "string",
  "data": {
    "accessToken" : "integer"
  }
}

```


## 3. GET /notes

Request:

- headers:
```json
{
  "access_token": "string",
  
}
```

_Response (200 - Ok)_

```json
{
  "status": "string",
  "data": {
    "notes" : [
      {
        "id": "integer",
        "title": "string",
        "description": "string",
        "creatorId": {
          "fullName": "string"
        }
      }
      ,,,
    ]
  }
}

```

## 4. GET /notes/:id

Request:
- params :

```json
{
  "id": "integer",
}
```


- headers:

```json
{
  "access_token": "string",
}
```

_Response (200 - Ok)_

```json
{
  "status": "string",
  "data": {
    "note" : {
        "id": "integer",
        "title": "string",
        "description": "string",
        "creatorId": {
          "fullName": "string"
        }
      }
  }
}

```

## 5. POST /notes

Request:

- headers:

```json
{
  "access_token": "string",
}
```

- body :

```json
{
  "title": "string",
  "description": "string"
}

```


_Response (201 - Created)_

```json
{
  "status": "string",
  "data": {
    "noteId" : "integer"
  }
}

```


## 6. PUT /notes/:id

Request:

- params:

```json
{
  "id": "integer",
}

```

- headers:

```json
{
  "access_token": "string",
}
```

- body :

```json
{
  "title": "string",
  "description": "string"
}

```


_Response (200 - Ok)_

```json
{
  "status": "string",
  "data": {
    "note" : {
        "id": "integer",
        "title": "string",
        "description": "string",
        "creatorId": {
          "fullName": "string"
        }
      }
  }
}

```


## 7. DELETE /notes/:id

Request:

- params:

```json
{
  "id": "integer",
}
```

- headers:

```json
{
  "access_token": "string",
}
```


_Response (200 - Ok)_

```json
{
  "status": "string",
  "message":"string"
}

```

