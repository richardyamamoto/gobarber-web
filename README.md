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

## Setting Routes

Install React router dom
```bash
yarn add react-router-dom
```
Install the history to navigate the user
```
yarn add history
```
Create the following folders inside `src`.
- src
  - pages
    - Dashboard
      - index.js
    - Profile
      - index.js
    - SignIn
      - index.js
    - SignUp
      - index.js
  - routes
    - index.js
  - services
    - history.js

Inside each page `index.js` create a **react function component(rfc)**

Now on [src/routes/index.js](src/routes/index.js)

Import:
```js
import React from 'react';
import { Switch, Routes } from 'react-router-dom';
// Pages
import SignIn from '../pages/SignIn/index';
import SignUp from '../pages/SignUp';
import Profile from '../pages/Profile';
import Dashboard from '../pages/Dashboard';
```
Then export the function Routes, returning jsx.
```jsx
export default function Routes() {
  return (
   <Switch>
      <Route path="/" exact component={SignIn} />
      <Route path="/register" component={SignUp} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/profile" component={Profile} />
    </Switch>
  )
}
```
Switch must be outside every component route.

>The `exact` property is used to the exact route being read.

Now on [src/App.js](src/App.js)

Import:
```js
import { Router } from 'react-router-dom';
import Routes from './routes';
import history from './services/history';
```
The Router component has the property `history` that receive `history`, and must be outside Routes component.
```js
function App() {
  return (
    <Router history={history}>
      <Routes />
    </Router>
  );
}
```
>Every `history.push()` will be listened by Router.

To make this happen we need to create the history file.

At [src/services/history.js](src/services/history.js)

Import and create:
```js
import { createBrowserHistory } from 'history'

const history = createBrowserHistory();

export default history;
```
___
