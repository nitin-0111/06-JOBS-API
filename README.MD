#### Setup

```bash
npm install && npm start
```

#### Database Connection

1. Import connect.js
2. Invoke in start()
3. Setup .env in the root
4. Add MONGO_URI with correct value

#### Routers

- auth.js
- jobs.js

#### User Model

Email Validation Regex

```regex
/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
```

#### Register User

- Validate - name, email, password - with Mongoose
- Hash Password (with bcryptjs)
- Save User
- Generate Token
- Send Response with Token

#### Login User

- Validate - email, password - in controller
- If email or password is missing, throw BadRequestError
- Find User
- Compare Passwords
- If no user or password does not match, throw UnauthenticatedError
- If correct, generate Token
- Send Response with Token

#### Mongoose Errors

- Validation Errors
- Duplicate (Email)
- Cast Error

#### Security

- helmet
- cors
- xss-clean
- express-rate-limit

Swagger UI

```yaml
/jobs/{id}:
  parameters:
    - in: path
      name: id
      schema:
        type: string
      required: true
      description: the job id
```

openapi: 3.0.0
info:
  title: jobs  API
  contact: {}
  version: '1.0'
servers:
- url: https://jobs-api-k0cp.onrender.com/api/v1
  variables: {}
paths:
  /auth/register:
    post:
      tags:
      - Auth
      summary: Register
      operationId: Register
      parameters: []
      requestBody:
        description: ''
        content:
          application/json:
            schema:
              allOf:
              - $ref: '#/components/schemas/RegisterRequest'
              - example:
                  name: nitin singh
                  email: nitin32@gmail.com
                  password: 123d4400
            example:
              name: nitin singh
              email: nitin32@gmail.com
              password: 123d4400
        required: true
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security: []
  /auth/login:
    post:
      tags:
      - Auth
      summary: Login user
      operationId: Loginuser
      parameters: []
      requestBody:
        description: ''
        content:
          application/json:
            schema:
              allOf:
              - $ref: '#/components/schemas/LoginuserRequest'
              - example:
                  email: nitin1@gmail.com
                  password: 123d4400
            example:
              email: nitin1@gmail.com
              password: 123d4400
        required: true
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security: []
  /jobs:
    post:
      tags:
      - Jobs
      summary: Create Job
      operationId: CreateJob
      parameters: []
      requestBody:
        description: ''
        content:
          application/json:
            schema:
              allOf:
              - $ref: '#/components/schemas/CreateJobRequest'
              - example:
                  company: nitin3
                  position: SDE2
            example:
              company: nitin3
              position: SDE2
        required: true
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security:
      - bearer: []
    get:
      tags:
      - Jobs
      summary: Get ALL Jobs
      operationId: GetALLJobs
      parameters: []
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security:
      - bearer: []
  /jobs/6458c5e6805f2928c295781c:
    get:
      tags:
      - Jobs
      summary: get singal job
      operationId: getsingaljob
      parameters: []
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security:
      - bearer: []
  /jobs/6458651b79e8eb50e471b273:
    patch:
      tags:
      - Jobs
      summary: update job
      operationId: updatejob
      parameters: []
      requestBody:
        description: ''
        content:
          application/json:
            schema:
              allOf:
              - $ref: '#/components/schemas/updatejobrequest'
              - example:
                  company: nint2
                  position: SDE2
            example:
              company: nint2
              position: SDE2
        required: true
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security:
      - bearer: []
    delete:
      tags:
      - Jobs
      summary: Delete job
      operationId: Deletejob
      parameters: []
      responses:
        '200':
          description: ''
          headers: {}
      deprecated: false
      security:
      - bearer: []
components:
  schemas:
    RegisterRequest:
      title: RegisterRequest
      required:
      - name
      - email
      - password
      type: object
      properties:
        name:
          type: string
        email:
          type: string
        password:
          type: string
      example:
        name: nitin singh
        email: nitin32@gmail.com
        password: 123d4400
    LoginuserRequest:
      title: LoginuserRequest
      required:
      - email
      - password
      type: object
      properties:
        email:
          type: string
        password:
          type: string
      example:
        email: nitin1@gmail.com
        password: 123d4400
    CreateJobRequest:
      title: CreateJobRequest
      required:
      - company
      - position
      type: object
      properties:
        company:
          type: string
        position:
          type: string
      example:
        company: nitin3
        position: SDE2
    updatejobrequest:
      title: updatejobrequest
      required:
      - company
      - position
      type: object
      properties:
        company:
          type: string
        position:
          type: string
      example:
        company: nint2
        position: SDE2
  securitySchemes:
    bearer:
      type: http
      scheme: bearer
security: []
tags:

- name: Auth
  description: ''
- name: Jobs
  description: ''