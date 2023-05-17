# Maze game

This is a game made with NextJS v13 and typescript.

![Maze game](https://iili.io/HUQzUMB.png "Maze game")


## Development
If this is the first time you run this app, make sure you have installed dependencies with `npm install`.

To run this project in development mode, run: `npm run dev`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.


## Build and run in local environment
To run locally you build bundle, run `npm run build` and run your production ready app with `npm run start`. 

## Assets
All assets in this app are hosted inside `/public. 

## Unit Testing
This app uses [Jest](https://jestjs.io/) + [React testing library](https://testing-library.com/) for unit testing. To run all the suit test just run `npm run test`. 

## Commits quality check
Every commit to this app runs Husky pre-commit by default. This Husky check is in charge of running prettier and eslint on every `.ts`, `.tsx` and `.scss` file before pushing code to the repo.

To avoid pre-commit checks you can´t commit files with the flag `--no-verify`. (not recommended)

To install Husky Git Hooks please run `npm run prepare`. 