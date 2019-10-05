# Go Barber Web

This application is going to be developed aiming to studying the technologies:  Node.Js, ReactJS, Redux, Redux Saga, React Hooks and a bundle of libraries. This documentation will serve as a consult material.
___

## Index
- [Environment Configuration](#environment)

___

## Environment Configuration
<div id="environment">

We use Eslint and Prettier to organize our code to become easier to read and have pattern when developing.

[Eslint - Documentation](https://eslint.org/docs/user-guide/getting-started)

[Prettier - Documentation](https://prettier.io/docs/en/index.html)

- Install the Eslint as a dev dependency.
  - `yarn add eslint -D`
- Then Install Prettier and their connections with Eslint.
  - `yarn add prettier eslint-config-prettier eslint-plugin-prettier -D`
- After all as we are going to use React Hooks, install its dependency too.
  - `yarn add eslint-plugin-react-hooks -D`
- Initialize the Eslint to start the configuration
  - `yarn eslint --init`
> The Eslint uses Npm as a package manager and it creates a `package-lock.json`, as we are using Yarn, delete the `package-lock.json` and run `yarn` to include the new configurations to the `yarn.lock` and `package.json`
- At the final of the precess, it will create a `.eslintrc.js` configuration file.
- Create `.prettierrc` configuration file and with the right click of the mouse create the `.editorconfig`
- Paste inside these files the commands on this link: [Configuration files](https://gist.github.com/richardyamamoto/d884e24dc86ccc636d2d69bac6660486)
___

