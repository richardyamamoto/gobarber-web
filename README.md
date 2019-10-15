# Go Barber Web

This application is going to be developed aiming to studying the technologies:  Node.Js, ReactJS, Redux, Redux Saga, React Hooks and a bundle of libraries. This documentation will serve as a consult material.
___

## Index
- [Environment Configuration](#environment)
- [Setting Routes](#routes)
- [Configuring Reactotron](#configreactotron)
- [Private Routes](#privateroutes)
- [Layouts for Pages](#layoutspages)
- [Global Styles](#globalstyles)
- [Root Import](#rootimport)

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
<div id="routes">
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
## Configuring Reactotron
<div id="configreactotron">
Install the integration of Reactotron with ReactJS

```bash
yarn add reactotron-react-js
```
Create the folder `config` inside `src` and the configuration file.
[src/config/ReactotronConfig.js](src/config/ReactotronConfig.js)

Then at [src/App.js](src/App.js) import the ReacotronConfig inside
```js
import './config/ReactotronConfig';
```
Initialize the application to check if Reactotron is connected
```js
yarn start
```
___

## Private Routes
<div id="privateroutes">
We are going create private routes that will allow users to navigate only with validation.

First create [Route.js](src/routes/Route.js) at `src/routes/`

Import:
```js
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

```
Create the function component RouteWrapper

Then recover the properties of the components by unstructuring the parameters and inside the function verify if the user is signed and if the route is private.
```js
export default function RouteWrapper({
  component:Component,
  isPrivate = false,
  ...rest,
  }) {
    const signed = false,
    if(!signed && isPrivate) {
      return <Redirect to="/" />
    };
    if(signed && !isPrivate) {
      return <Redirect to="dashboard"/>
    }
    return <Route {...rest} component={Component}/>
  }
```
>The constant `signed` is static only for test.

Install Prop-Types
```bash
yarn add prop-types
```
Import Prop-Types
```js
import PropTypes from 'prop-types';
```
Then validate and create default value for `component` and `isPrivate`
```js
RouteWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  isPrivate: PropTypes.bool,
}

RouterWrapper.defaultProps = {
  isPrivate: false,
}
```

At [src/routes/index.js](src/routes/index.js)

Delete the importation of Route from react-router-dom and import the Route component we created.
```js
import { Switch } from 'react-router-dom';
import Route from './Route';
```
Place the property `isPrivate` on Dashboard and Profile component
```js
export default function Routes() {
  return (
    <Switch>
      ...
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/profile" component={Profile} isPrivate />
    </Switch>
  );
}
```
___

## Pages Layouts
<div id="layoutspages">
Layouts works analog to templates.

Create another folder inside `src/pages` named `_layouts`.

And create `auth/index.js` and `default/index.js` inside `_layouts`

>- src
>   - pages
>     - _layouts
>       - auth
>         - index.js
>       - default
>         - index.js

Install Styled Components
```bash
yarn add styled-components
```
On [src/pages/_layouts/auth/index.js](src/pages/_layouts/auth/index.js)

Create a react function component named AuthLayout. On parameters of the function, recover the `children` by unstructuring. Then put it between the Styled Component.
```js
export default function AuthLayout({ children }) {
  return <Wrapper>{ children }</Wrapper>;
}
```
Create the styled component file: [src/pages/_layouts/auth/styles.js](src/pages/_layouts/auth/styles.js)

Make the same process to default layout.

Then on [src/routes/Route.js](src/routes/Route.js)

Import layouts:
```js
import AuthLayout from '../pages/_layouts/auth';
import DefaultLayout from '../pages/_layouts/default';
```
And right before the last return, create a constant called `Layout` that will become our layout. By using ternaty operator, we can change which layout to render based on `signed` variable value.
```jsx
const Layout = signed ? DefaultLayout : AuthLayout;
```
By the way, the component `Route` will have the `component` property replaced by `render`, that will receive all the props from the page an directly return them into the component.
```jsx
return (
    <Route
    {...rest}
    render={props => (
      <Layout>
        <Component {...props}>
      </Layout>
  )}/>
);
```
___

## Global Styles
<div id="globalstyles">
Create [src/styles/Global.js](src/styles/Global.js)

Import the method `createGlobalStyle` from Styled-components then export default
```js
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle``;
```
For further details [Global.js](src/styles/Global.js)
___

## Using Root Import
<div id="rootimport">

We will set another way to import files, components, etc.

Install
```bash
yarn add customize-cra react-app-rewired -D
```
>Only for development ambience.

Install Babel plugin:
```bash
yarn add babel-plugin-root-import -D
```
At the root folder create: [config-overrides.js](config-overrides.js)

The normal import looks like:
```js
import AuthLayout from '../pages/_layouts/auth'
```
Now instead of using `'../'`, we are going to use `'~'` and this symbol will be the representation of `src` folder.

On [package.json](package.json) replace the start, build and test from scripts:
```json
"scripts": {
    "start": "react-app-rewired start",
    "build": "react-app-rewired build",
    "test": "react-app-rewired test",
    "eject": "react-scripts eject"
  },
```
Intall Eslint plugin
```bash
yarn add eslint-import-resolver-babel-plugin-root-import -D
```
Make the following changes on:  [.eslintrc.js](.eslintrc.js)
```js
settings: {
  "import/resolver": {
    "babel-plugin-root-import": {
      rootPathSuffix: "src"
    },
  },
},
```
Create at the root folder: [jsconfig.json](jsconfig.json)

This file will allow the VSCode to redirect us to the right path when "ctrl + left click" over the importation path.
___
