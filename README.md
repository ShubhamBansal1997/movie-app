# Movie APP

## How to setup the APP
Create a .env files in the root directory
and add the following:
```
NODE_ENV=development
PORT=8082
JWT_SECRET=thisisasamplesecret
JWT_ACCESS_EXPIRATION_MINUTES=240
JWT_REFRESH_EXPIRATION_DAYS=30

DATABASE_URL="postgres://postgres:12345@localhost:5432/taskphin"
```

```
npm install
npm run prisma:generate # to initialize prisma client
npm run prisma:migrate # to run migrations
npm run dev
```

### Directory Structure
```
├── README.md
├── package-lock.json
├── package.json
└── src
    ├── app.js
    ├── config  (Configuration files)
    │   ├── config.js
    │   ├── passport.js
    │   └── tokens.js
    ├── controllers (Controllers)
    ├── db
    │   └── prisma.js
    ├── index.js
    ├── middlewares (Middlewares)
    ├── prisma
    │   ├── migrations
    │   └── schema.prisma
    ├── routes (Routes)
    │   └── v1
    ├── services (Services)
    ├── utils (Utils)
    └── validations (Validations)
```