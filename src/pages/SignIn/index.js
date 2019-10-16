import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import logo from '~/assets/logo.svg';

import { signInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  function handleSubmit({ email, password }) {
    dispatch(signInRequest(email, password));
    console.tron.log(email, password);
  }
  const schema = Yup.object().shape({
    email: Yup.string()
      .email('Insira um e-mail válido')
      .required('E-mail é obrigatório'),
    password: Yup.string().required('Senha é obrigatória'),
  });
  return (
    <>
      <img src={logo} alt="GoBarber" />
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="email" type="email" placeholder="Seu e-mail" />
        <Input name="password" type="password" placeholder="Sua senha" />
        <button type="submit">{loading ? 'Carregando...' : 'Acessar'}</button>
        <Link to="/register">Criar conta</Link>
      </Form>
    </>
  );
}
