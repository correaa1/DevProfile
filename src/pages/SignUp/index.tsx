import React from 'react';
import { KeyboardAvoidingView, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { InputControl } from '../../components/Form/InputControl';
import {
  BackToSignIn,
  BackToSignInTitle,
  Container,
  Content,
  Icon,
  Logo,
  Title,
} from './styles';
import logo from '../../assets/marijuana.png';

interface IFormInputs {
  [name: string]: any;
}

interface ScreenNavigationProp {
  goBack: (screen: string) => void;
}
export const SignUp: React.FunctionComponent = () => {
  const { handleSubmit, control } = useForm<FieldValues>();
  const { goBack } = useNavigation();
  const handleSignIn = (form: IFormInputs) => {
    const data = {
      name: form.name,
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
            <Title>Crie sua conta</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder=" Nome Completo"
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder=" Email"
              keyboardType="email-address"
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="password"
              placeholder=" Senha"
              secureTextEntry
            />

            <Button title="Criar conta" />
          </Content>
        </Container>
      </ScrollView>
      <BackToSignIn onPress={() => goBack()}>
        <Icon name="arrow-left" />
        <BackToSignInTitle>Voltar para Logon</BackToSignInTitle>
      </BackToSignIn>
    </KeyboardAvoidingView>
  );
};
