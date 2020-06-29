import React, { useCallback, useRef } from 'react';
import { FiLogIn, FiLock, FiMail } from 'react-icons/fi';
import { FormHandles } from '@unform/core'
import logoImg from '../../assets/logo.svg';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { Form } from '@unform/web'
import * as Yup from 'yup';
import { useAuth } from '../../context/AuthContext';
import getValidationError from '../../utils/getValidationErrors';
import { Container, Content, Background } from './styles';


interface SignInFormData {
  email: string;
  password: string;
}


const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const { user, signIn } = useAuth();

  console.log(user);

  const handleSubmit = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current ?.setErrors({});
      const schema = Yup.object().shape({
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        password: Yup.string()
          .required('Senha obrigatório')
      });

      await schema.validate(data, {
        abortEarly: false,
        //retorna todos os erros juntos
      });
      signIn({
        email: data.email,
        password: data.password
      });
    } catch (err) {
      const errors = getValidationError(err);

      formRef.current ?.setErrors(errors);
      console.log(err);
    }
  }, [signIn]);

  return (

    <Container>
      <Content>
        <img src={logoImg} alt="GoBarber" />
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu logon</h1>
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input name="password" icon={FiLock} placeholder="Senha" type="Password" />
          <Button type="submit">Entrar</Button>
          <a href="forgot">Esqueci minha senha</a>
        </Form>

        <a href="forgot">
          <FiLogIn />
          Criar conta
      </a>
      </Content>
      <Background></Background>
    </Container>
  );
}
export default SignIn;
