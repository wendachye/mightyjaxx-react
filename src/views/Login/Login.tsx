import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { login, selectUser } from 'redux/slices/userSlice';
import { theme } from 'styles/theme';
import * as yup from 'yup';

import Button from 'components/Button';
import Card from 'components/Card';
import Container from 'components/Container';
import Form from 'components/Form';
import Input from 'components/Input';
import Label from 'components/Label/Label';
import Logo from 'components/Logo';
import Title from 'components/Title';
import useMediaQuery from 'hooks/useMediaQuery';
import { useDispatch, useSelector } from 'hooks/useRedux';
import { ContainerWrapper } from './Login.styles';

interface FormInputs {
  email: string;
  password: string;
}

const resolver = yupResolver(
  yup
    .object({
      email: yup.string().trim().email('Invalid email format').required('Email is required'),
      password: yup
        .string()
        .trim()
        .min(8, 'Password must have at least 8 characters')
        .required('Password is required'),
    })
    .required()
);

const Login = () => {
  const dispatch = useDispatch();
  const isDesktop = useMediaQuery(`(min-width:${theme.breakpoints.sm})`);
  const { isLoggedIn, loading, error } = useSelector(selectUser);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({ resolver });

  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmitLogin = async (data: FormInputs) => {
    const { email, password } = data;
    const loginData: State.UserLoginTiggerPayload = { email, password };
    dispatch(login.trigger(loginData));
  };

  return (
    <ContainerWrapper>
      <Container>
        <Card minWidth="17.5rem">
          <Logo width={isDesktop ? '7.5rem' : '5rem'} height={isDesktop ? '7.5rem' : '5rem'} />
          <Title as="h2">ADMIN LOGIN</Title>
          <Form onSubmit={handleSubmit(onSubmitLogin)}>
            <Input
              {...register('email')}
              type="text"
              placeholder="Email"
              error={errors.email?.message}
            />
            <Input
              {...register('password')}
              type="password"
              placeholder="Password"
              error={errors.password?.message}
            />
            <Button type="submit" disabled={loading} loading={loading}>
              Login
            </Button>
            {error && <Label margin="0.375rem 0">{error}</Label>}
          </Form>
        </Card>
      </Container>
    </ContainerWrapper>
  );
};

export default Login;
