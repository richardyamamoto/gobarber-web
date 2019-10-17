# Go Barber Web

This application is going to be developed aiming to studying the technologies:  Node.Js, ReactJS, Redux, Redux Saga, React Hooks and a bundle of libraries. This documentation will serve as a consult material.
___
<div id="index">

## Index
- [Environment Configuration](#environment)
- [Setting Routes](#routes)
- [Configuring Reactotron](#configreactotron)
- [Private Routes](#privateroutes)
- [Layouts for Pages](#layoutspages)
- [Global Styles](#globalstyles)
- [Root Import](#rootimport)
- [Stylizing Authentication](#stylizingauth)
- [Using Unform](#unform)
- [Validations](#validations)
- [Configuring Redux](#redux)
- [User Authentication](#authentication)
- [Storing Profile](#storingprofile)
- [Persisting Authentication](#persist)
- [Loading while Authentication](#loadingauth)
___
<div id="environment">

## Environment Configuration

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

↑ back to: [Index](#index)
___
<div id="routes">

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
↑ back to: [Index](#index)
___
<div id="configreactotron">

## Configuring Reactotron
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
↑ back to: [Index](#index)
___
<div id="layoutspages">

## Pages Layouts
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
↑ back to: [Index](#index)
___
<div id="globalstyles">

## Global Styles
Create [src/styles/Global.js](src/styles/Global.js)

Import the method `createGlobalStyle` from Styled-components then export default
```js
import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle``;
```
For further details [Global.js](src/styles/Global.js)

↑ back to: [Index](#index)
___
<div id="rootimport">

## Using Root Import

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

↑ back to: [Index](#index)
___
<div id="stylizingauth">

## Stylizing Authentication
The SignIn and SignUp page are very similar, so the Auth layout will be used to stylizing this pages.

First go to `SignIn` page [index.js](src/pages/SignIn/index.js)

Start creating fragments inside the return, then create a form with two inputs, one button and one Link component

Import the `Link` from `react-router-dom` and the `logo`

```jsx
import { Link } from 'react-router-dom';
import logo from '~/assets/logo.svg';

export default function SignIn() {
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <form>
        <input type="email" placeholder="Seu e-mail" />
        <input type="password" placeholder="Sua senha" />
        <button type="submit">Acessar</button>
        <Link to="/register">Criar conta</Link>
      </form>
    </>
  );
}
```
Now on [src/pages/_layouts/auth/index.js](src/pages/_layouts/auth/index.js)

Create a new Styled component `Container` to align the content on center, then place this component like this:
```jsx
<Wrapper>
  <Container>
    {children}
  </Container>
</Wrapper>
```

Go to [src/pages/_layouts/auth/styles.js](src/pages/_layouts/auth/styles.js) and make pertinent changes.

Copy the changes made on `SignIn` page and paste on `SignUp` page [index.js](src/pages/SignUp/index.js), after that, just create a new input to the user name and the route of the Link component.
```jsx
<>
  <img src={logo} alt="GoBarber" />
  <form>
    <input type="text" placeholder="Nome completo" />
    <input type="email" placeholder="Seu e-mail" />
    <input type="password" placeholder="Sua senha" />
    <button type="submit">Criar conta</button>
    <Link to="/">Já tenho login</Link>
  </form>
</>
```
↑ back to: [Index](#index)
___
<div id="unform">

## Using Unform
To capture the produced input values, it's usual to create an state and used the property `onChange` to listen to this event.

To avoid this procedure, we are going to use a lib from rocketseat called Unform [Documentation](https://github.com/Rocketseat/unform). To install it
```bash
yarn add @rocketseat/unform
```
Now on [SignIn](src/pages/SignIn/index.js) import
```js
import { Form, Input } from '@rocketseat/unform'
```
Replace the `<form>` and `<input>` by the unform Components imported.

The component `<Input>` must have the property `name`
>The name could be the same as `type`. It will be the object key name.
```jsx
<Input name="email" type="email" placeholder="Seu e-mail" />
```
And `<Form>` the property `onSubmit`
>This property waits for a function to execute.
```jsx
<Form onSubmit={handleSubmit}>
```
We need to create the function responsible to handle submit. So create a new function inside the function component, and it will receive the `data` from the form as parameter.
```js
function handleSubmit(data) {
  // Block of code...
  console.tron.log(data)
  // To ensure data is there.
}
```
↑ back to: [Index](#index)
___
<div id="validations">

## Validations

We will use Yup to validate the input data (The same used on back-end).

Install Yup
```bash
yarn add yup
```

Then on SingIn page [index.js](src/pages/SignIn/index.js)

Import Yup:
```js
import * as Yup from 'yup'
```
>Yup does not have an export default, that's why we use asterisk and `as` to import everything.

Create a constant to receive the schema. Inside each validations we can put a personalized error message by passing a string.
```js
const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });
```
Now at SingUn page [index.js](src/pages/SignUp/index.js), repeat the same process and include the field `name` and the validation `.min(6)` on password.
```js
const schema = Yup.object().shape({
  name: Yup.string().required('Insira seu nome completo'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('E-mail é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha mínima com 6 caracteres')
    .required('Senha é obrigatória'),
});
```
↑ back to: [Index](#index)
___
<div id="redux">

## Configuring Redux, Redux Saga

Install dependencies:
```bash
yarn add redux react-redux redux-saga reactotron-redux reactotron-redux-saga immer
```

Let's start configuring the Reactotron. Makes this changes at: [ReactotronConfig.js](src/config/ReactotronConfig.js)

After that create the folder structure:
```
src
  |_store
      |_index.js
      |_createStore.js
      |_modules
          |_auth
          |   |_reducer.js
          |   |_actions.js
          |   |_sagas.js
          |_rootReducer.js
          |_rootSaga.js
```
Let's start by [auth/reducer.js](src/store/modules/auth/reducer.js)

Reducer always going to be a function. This function receive as parameter the initial state and the action. Switch case is the flux controller that will run the right action.

Before create the function, create a constant to receive the initial state.
```js
const INITIAL_STATE = {};
export default function auth(state = INITIAL_STATE, action) {
  switch(action.type) {
    default:
      return state;
  }
}
```
On [auth/sagas.js](src/store/modules/auth/sagas.js)

Import the `all` method from `redux-saga/effects`, then export default it.
```js
import { all } from 'redux-saga/effects'

export default all([]);
```

Then at [modules/rootReducer.js](src/store/modules/rootReducer.js)

Import the method `combineReducers` and the reducer from auth. After that export by default the combineReducers with an array containing the reducers

```js
import { combineReducers } from 'redux';

import auth from './auth/reducer';

export default combineReducers([
  auth,
])
```

Go to [modules/rootSaga.js](src/store/modules/rootSaga.js)

Import the `all` method from `redux-saga/effects` and the sagas from auth. Export by default the generator `function* rootSaga() {}`, returning the `all([])` method with the imported sagas inside.
```js
import { all } from 'redux-saga/effects';

import auth from './auth/sagas.js';

export default function* rootSaga() {
  return yield all([auth]);
}
```

Now we are going to configure the Redux and Redux Saga. Go to [store/index.js](src/store/index.js)

Import the `createSagaMiddlewares` from `redux-saga`, import the `createStore` (the file we created before), `rootReducer` and `rootSaga`.

Create a constant to receive the `crateSagaMiddlewares()` and another one to receive array of `sagaMiddleware`. Create anoter constant to receive the `createStore(rootReducer, middlewares)`. Then `sagaMiddleware.run(rootSaga)` and to finish, export default the store constant.

We'll create `sagaMonitor` to check if a development environment.
```js
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor =
  process.env.NODE_ENV === 'development'
    ? console.tron.createSagaMonitor()
    : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

const store = createStore(rootReducer, middlewares);

sagaMiddleware.run(rootSaga);

export default store;
```
Now on [createStore.js](src/store/createStore.js). Import the `createStore`, `compose` and `applyMiddleware` from `redux`. Inside the function check if we are at development environment. And make the following changes.
```js
import { createStore, compose, applyMiddleware } from 'redux';

export default (reducers, middlewares) => {
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? compose(
          console.tron.createEnhancer(),
          applyMiddleware(...middlewares)
        )
      : applyMiddleware(...middlewares);

  return createStore(reducers, enhancer);
};
```
After configure everything, we have to go to [App.js](src/App.js) and import the `Provider` from `redux` and our `store`.
>-  Provider must wrap all the other components and receive the propety `store` with our store.

>-  Store must be imported after ReactotronConfig.

↑ back to: [Index](#index)
___
<div id="authentication">

## User Authentication

Install Axios to handle the API consumption.
```bash
yarn add axios
```
At folder services create [api.js](src/services/api.js). Then put this inside:
```js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:<PORT>',
});

export default api;
```
><PORT> Must be the port used by API

Let's create some actions on -> [actions.js](src/store/modules/auth/actions.js):
- `signInRequest(email, password)`;
- `signInSuccess(token, user)`;
- `signFailure()`;
```js
export function signInRequest(email, password) {
  return {
    type: '@auth/SIGN_IN_REQUEST',
    payload: { email, password },
  };
}

export function signInSuccess(token, user) {
  return {
    type: '@auth/SIGN_IN_SUCCESS',
    payload: { token, user },
  };
}

export function signFailure() {
  return {
    type: '@auth/SIGN_FAILURE',
  };
}
```
Then on [sagas.js](src/store/modules/auth/sagas.js)

Import the methods `takeLatest`, `call`, `put` from `redux-saga/effects`, import the `api` from services, `history` from services too and method `signInSuccess` from our actions

Inside the `export default` put the `takeLatest()` inside the array, this method waits as 1st parameter the action type dispatched and as 2nd the function to be executed.

Now we create the function `signIn`. By unsctructuring the parameters of this function, we can recover the `payload` property dispatched from the action.
```js
import { all, takeLatest, call, put } from 'redux-saga/effects';
import api from '~/services/api';
import history from '~/services/history';
import { signInSuccess } from './actions';

export function signIn({payload}){
  const { email, password } = payload;
  const response = yield call(api.get, 'sessions', {
    email,
    password,
  })
  const { token, user } = response.data;
  if(!user.provider) {
    console.tron.error('Usuário não é prestador');
  }
  yield put(signInSuccess(token, user));
  history.push('/dashboard');
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)])
```
After that go to [SignIn/index.js](src/pages/SignIn/index.js)

Import the `useDispatch` from `react-redux` and `signInRequest` from `actions.js`
```js
import { useDispatch } from 'react-redux';
import { signInRequest } from '~/store/modules/auth/actions';
```
Before the function `handleSubmit()`, create a const become the method `useDispatch()`.

Now on the function `handleSubmit()`, unstructure the parameter to get the `{ email, password }` from `data`, then use the `dispatch(signInReques(email, password))`
```js
...
const dispatch = useDispatch();
function handleSubmit({ email, password }) {
  dispatch(signInRequest(email, password));
  // Just to check
  console.tron.log(email, password);
}
```
Now go to [auth/reducer.js](src/store/modules/auth/reducer.js)

Import the produce from `immer`
```js
import produce from 'immer';
```
Then create new case and manipulate the data coming from action.
```js
case '@auth/SIGN_IN_SUCCESS':
  return produce(state, draft => {
    draft.token = action.payload.token;
    draft.signed = true;
  })
```
Finally go to [Route.js](src/routes/Route.js), import `store` and make some changes on constant `signed`:
```js
import store from '~/store';
```
Use the `.getState()` to get any state from store.
```js
const { signed } = store.getState().auth;
```
Try to Sign in with provider user.

↑ back to: [Index](#index)
___
<div id="storingprofile">

## Storing Profile

We are going to store the user in session.

Create a new reducer to store and manage the user profile.

At `store/module`, create:
```
 src
  |_store
      |_modules
          |_user
              |_reducer.js
              |_actions.js
              |_sagas.js
```
At [sagas.js](src/store/modules/user/sagas.js)

Import the `all` method from `redux-saga/effects` and export default `all`
```js
import { all } from 'redux-saga/effects';

export default all([]);
```
Then on [reducer.js](src/store/modules/user/reducer.js). Create a structure similar to [auth/reducer.js](src/store/modules/auth/reducer.js)

>One Reducer can listen to another actions from other modules.

Edit the `INITIAL_STATE` to receive the user profile.

Then on switch case, change the return of the `produce`:
```js
const INITIAL_STATE = {
  profile: null,
}
...
case `@auth/SIGN_IN_SUCCESS`:
  return produce(state, draft => {
    draft.profile = action.payload.user;
  })
```
After that go to [rootReducer.js](src/store/modules/rootReducer.js) and import the `user/reducer.js` then on [rootSaga.js](src/store/modules/rootSaga.js) import the `user/sagas.js`

↑ back to: [Index](#index)
___
<div id="persist">

## Persisting Authentication

We are going persist the user data on the storage of the browser. To do that, install the lib `redux-persist`

```bash
yarn add redux-persist
```
Create [persistReducers](src/store/modules/persistReducers.js) at `src/store/modules/`.

Make the importation of `storage` from `redux-persist/lib/storage` and the method `persistReducer` from `redux-persist`

After that export default an arrow function with `reducers` as parameter. Inside the function body, create a const to allocate the `persistReducer()`

`persistReducer()`:
- 1st Parameter: Object of options
  - `key`: Identification of the local storage.
  - `storage`: The storage method we are going to use.
  - `whitelist`: An array with allowed reducers.
- 2nd Parameter: The reducers received on function parameters.

Then return the `persistedReducer`
```js
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducer = persistReducer({
    key:'gobarber',
    storage,
    whitelist: ['user', 'auth'],
  },
    reducers
  );
  return persistedReducer;
};
```
Now on [src/store/index.js](src/store/index.js)

Import method `persistStore` from `redux-persist` and the `persistReducers.js` we created.

On the constant `store`, wrap the `rootReducer` with `persistReducer` we created.
```js
const store = createStore(persistReducer(rootReducer), middlewares);
```
Then create constant `persistor` receiving the `persistStore` with `store` as parameter.
```js
const persistor = persistStore(store);
```

Instead of export default, export store and persistor
```js
export { store, persistor };
```
On [Route.js](src/routes/Route.js) and [App.js](src/App.js)

Change the importation of `store` to:
```js
import { store } from './store';
```
The application will work again.

At [App.js](src/App.js) yet, import `PersistGate` from `redux-persist/integration/react`

The component `persistGate` (has the property `persistor` receiving the `persistor` exported from `./store`), must be placed after `<Provider store={store}>` and wrapping `<Router story={story}>`.

```jsx
import { store, persistor } from './store';

function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <Router history={history}>
          <Routes />
          <GlobalStyle />
        </Router>
      </PersistGate>
    </Provider>
  );
}
```
>The `<PersistGate>` will render the elements only after get informations from local storage.

>To logout manually, go to the browser element inspector, search for application > Local Storage > Find key persist and clear.

↑ back to: [Index](#index)
___
<div id="loadingauth">

## Loading while Authentication

Go to auth reducer -> [reducer.js](src/store/modules/auth/reducer.js)

We are going to refactoring the switch case. The prouce is common to all the cases, so put it outside the cases, like this:
```js
export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_FAILURE': {
        draft.loading = false;
        break;
      }
      default:
    }
  });
}
```
Go to auth [auth/sagas.js](src/store/modules/auth/sagas.js) put a try catch wrapping the whole `singIn` function. On catch put the `signFailure`
```js
export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    if (!user.provider) {
      console.tron.error('Usuário não é prestador');
      yield put(signFailure());
      return;
    }

    yield put(signInSuccess(token, user));

    history.push('/dashboard');
  } catch (err) {
    yield put(signFailure());
  }
}
```
>The `signFailure()` will change loading to false.

On SignIn page -> [SignIn.js](src/pages/SignIn/index.js)

Import the `useSelector` to recover the loading state from auth.

Then on button, make a ternary operation to render according to `loading` value.
```jsx
import {..., useSelector} from 'react-redux';
...
<button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
```
↑ back to: [Index](#index)
___

## Showing off Toasts

We are going to use [react-toastify](https://github.com/fkhadra/react-toastify)

Install Toastify running
```bash
yarn add react-toastify
```
On [App.js](src/App.js) import the `ToastContainer` from `react-toastify` and put the component inside `Router` component.
```js
import { ToastContainer } from 'react-toastify';
...
<Router history={history}>
  <Routes />
  <GlobalStyle />
  <ToastContainer autoClose={3000} />
</Router>
```
>`autoClose` property is self explanatory.

Go to global styles ->[src/styles/Global.js](src/styles/Global.js) and import the toast styles.
```js
import 'react-toastify/dist/ReactToastify.css'
```

Navigate to sagas.js -> [src/store/modules/auth/sagas.js](src/store/modules/auth/sagas.js), import `toast` from `react-toastify`
```js
import { toast } from 'react-toastify';
```
Then put the `toast.error('Mensagem de erro')`
___
