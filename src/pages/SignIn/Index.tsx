import React from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import { useForm, FieldValues } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '../../components/Form/Button';
import {
  Container,
  Content,
  Title,
  Logo,
  ForgotPasswordButton,
  ForgotPasswordTitle,
  CreateAccount,
  CreateAccountTitle,
  Icon,
} from './styles';
import logo from '../../assets/marijuana.png';
import { InputControl } from '../../components/Form/InputControl';

interface ScreenNavigationProp {
  navigate: (screen: string) => void;
}

interface IFormInputs {
  [name: string]: any;
}

const formSchema = yup.object({
  email: yup.string().email('Email invalido').required('Informe o email.'),
  password: yup.string().required('Informe a senha.'),
});

export const SignIn: React.FunctionComponent = () => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({ resolver: yupResolver(formSchema) });
  const navigation = useNavigation<ScreenNavigationProp>();
  const handleSignIn = (form: IFormInputs) => {
    const data = {
      email: form.email,
      password: form.password,
    };

    console.log(data);
  };
  return (
    <KeyboardAvoidingView
      enable
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Content>
            <Logo source={logo} />
            <Title>Faça seu login</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder=" Email"
              keyboardType="email-address"
              error={errors.email && errors.email.message}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password"
              placeholder=" Senha"
              secureTextEntry
              error={errors.password && errors.password.message}
            />

            <Button title="Entrar" onPress={handleSubmit(handleSignIn)} />

            <ForgotPasswordButton>
              <ForgotPasswordTitle>Esqueci minha senha</ForgotPasswordTitle>
            </ForgotPasswordButton>
          </Content>
        </Container>
      </ScrollView>
      <CreateAccount
        onPress={() => {
          navigation.navigate('SignUp');
        }}
      >
        <Icon name="log-in" />
        <CreateAccountTitle>Criar uma conta</CreateAccountTitle>
      </CreateAccount>
    </KeyboardAvoidingView>
  );
};
