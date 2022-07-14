# FullStackDevChallenge

Welcome to Book-R-Us! We’re glad to have you on board as a full-stack engineer. Your first project at Books-R-Us will be to help us refine our monorepo that enables our online bookstore. Our engineering team has done a great job getting it this far and we need your help to get it across the finish line and ready for production.

Our team of UX designers, product owners, and architects have come up with some requirements for a user interface and a backend-for-frontend (BFF) API that will power the store. They’re looking for an easy-to-use, responsive UI that will give our users access to our growing library of books.

We estimate this challenge should take about 2-3 hours to complete. However, please use your submission to show-off your skill. We want to see how you would do things, what's important to you, and the areas where you really shine. Take any liberties you'd like to show us how YOU build.

## Requirements of This Challenge

1. Create a feature branch off of `main` to commit your changes.
1. Add a mutation to the `bff` project.
   - Update an existing book
     - API must have validation
1. Create a corresponding screen in the `web` project.
   - Edit an existing book
     - Frontend must have input validation
1. Add free-text search functionality to search for books based on the title, author, or category.
1. Open a PR back to `main`.
1. Email the Signal team that the challenge is ready for review.

## Books Database

| Column    | Type                 | Required | Description                                                      |
| --------- | -------------------- | -------- | ---------------------------------------------------------------- |
| id        | integer, pk          | Y        | The ID of the book                                               |
| title     | varchar(255)         | Y        | The title of the book                                            |
| author    | varchar(255)         | Y        | The name of the author                                           |
| isbn      | varchar(255), unique | Y        | The ISBN number of the book. This should be unique for all books |
| category  | varchar(255)         | Y        | The category of the book                                         |
| inventory | integer, unsigned    | Y        | The count of books in the inventory                              |
| notes     | varchar(255)         | N        | Optional notes on the book                                       |

## Backend-for-Frontend (BFF)

If you are new to the concept of a BFF, here is a little background to help get you started. The role of the BFF is to act as a proxy between the frontend and various microservices within our infrastructure. Data returned from our microservices may not be formatted or filtered according to the way the frontend needs to present them. Traditionally, this logic may be handled by frontend code, but because we are using a BFF, this logic can now be offloaded to an intermediate later outside of the frontend.

The BFFs main responsibilities are:

- Calling various microservices to retrieve data
- Formatting data base on the representation needs of the frontend
- Sending the formatted data to the frontend

A more in-depth explanation of BFFs can be found [here](https://blog.bitsrc.io/bff-pattern-backend-for-frontend-an-introduction-e4fa965128bf).

## Getting Started

Because this project is built with Nx (see more info on Nx below), it is recommended to use VSCode or WebStorm as your IDE for a more rich developer experience (we primarily use VSCode).

### Local Development

1. Install dependencies:
   ```sh
   npm i
   ```
1. To get started developing in the web project, run the following command:
   ```sh
   npm start bff
   ```
   a. Open a browser tab to [`http://localhost:3333/graphql`](http://localhost:3333/graphql) to access the GraphQL Playground.
1. To get started developing in the web project, run the following command:
   ```sh
   npm start web
   ```
   a. Open a browser tab to [`http://localhost:4200`](http://localhost:4200/).

### Generating Types from the BFF Schema

With the BFF `schema.gql` generated from Nest, we are also able to generate TypeScript types from that schema by running the following command:

```sh
npm run generate
```

This will output `generated.tsx` within the `data-access` lib project so that it can be used by apps like the `web` project.

# Nx Workspaces

This project was generated using [Nx](https://nx.dev).

<p style="text-align: center;"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="250"></p>

🔎 **Smart, Fast and Extensible Build System**

## Adding capabilities to your workspace

Nx supports many plugins which add capabilities for developing different types of applications and different tools.

These capabilities include generating applications, libraries, etc as well as the devtools to test, and build projects as well.

Below are our core plugins:

- [React](https://reactjs.org)
  - `npm install --save-dev @nrwl/react`
- Web (no framework frontends)
  - `npm install --save-dev @nrwl/web`
- [Angular](https://angular.io)
  - `npm install --save-dev @nrwl/angular`
- [Nest](https://nestjs.com)
  - `npm install --save-dev @nrwl/nest`
- [Express](https://expressjs.com)
  - `npm install --save-dev @nrwl/express`
- [Node](https://nodejs.org)
  - `npm install --save-dev @nrwl/node`

There are also many [community plugins](https://nx.dev/community) you could add.

## Generate an application

Run `nx g @nrwl/react:app my-app` to generate an application.

> You can use any of the plugins above to generate applications as well.

When using Nx, you can create multiple applications and libraries in the same workspace.

## Generate a library

Run `nx g @nrwl/react:lib my-lib` to generate a library.

> You can also use any of the plugins above to generate libraries as well.

Libraries are shareable across libraries and applications. They can be imported from `@full-stack-dev-challenge/mylib`.

## Development server

Run `nx serve my-app` for a dev server. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `nx g @nrwl/react:component my-component --project=my-app` to generate a new component.

## Build

Run `nx build my-app` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `nx test my-app` to execute the unit tests via [Jest](https://jestjs.io).

Run `nx affected:test` to execute the unit tests affected by a change.

## Running end-to-end tests

Run `nx e2e my-app` to execute the end-to-end tests via [Cypress](https://www.cypress.io).

Run `nx affected:e2e` to execute the end-to-end tests affected by a change.

## Understand your workspace

Run `nx graph` to see a diagram of the dependencies of your projects.

## Further help

Visit the [Nx Documentation](https://nx.dev) to learn more.
