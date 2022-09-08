import React from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, FieldValues } from 'react-hook-form';
import { Button } from '../../components/Form/Button';
import { InputControl } from '../../components/Form/InputControl';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { api } from '../../services/api';
import {
  Container,
  Content,
  GoBackButton,
  Header,
  HeaderTitle,
  Icon,
  Title,
  UserAvatar,
} from './styles';
import { useAuth } from '../../context/AuthContext';
import avatarDefault from '../../assets/Pernalonga.jpg';

interface ScreenNavigationProp {
  goBack: () => void;
}
interface IFormInputs {
  [name: string]: any;
}
const formSchema = yup.object({
  old_password: yup.string().required('Campo obrigatório.'),
  password: yup.string().required('Campo obrigatório.'),
  password_confirmation: yup
    .string()
    .required('Campo obrigatório.')
    .oneOf([yup.ref('password'), null], 'Confirmação incorreta'),
});
export const UserProfilePassword: React.FunctionComponent = () => {
  const { user, updateUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleUpdatePassword = async (form: IFormInputs) => {
    const data = {
      name: user.name,
      email: user.email,
      old_password: form.old_password,
      password: form.password,
      password_confirmation: form.password_confirmation,
    };

    console.log(data);
    try {
      const response = await api.put('profile', data);
      updateUser(response.data);
      Alert.alert('Senha atualizada', 'Senha atualizada com sucesso.');
      goBack();
    } catch (error) {
      Alert.alert(
        'Ocorreu algum erro ao atualizar',
        'Ocorreu algum erro ao atualizar a senha. Tente novamente.',
      );
    }
  };

  return (
    <KeyboardAvoidingView
      enabled
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ flex: 1 }}
      >
        <Container>
          <Header>
            <GoBackButton onPress={goBack}>
              <Icon name="chevron-left" />
            </GoBackButton>
            <HeaderTitle>Seu Perfil </HeaderTitle>
            <UserAvatar
              source={
                user.avatar_url ? { uri: user.avatar_url } : avatarDefault
              }
            />
          </Header>
          <Content>
            <Title>Alterar Senha</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="old_password"
              placeholder="Senha Atual"
              error={undefined}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password"
              placeholder="Nova Senha"
              error={undefined}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              secureTextEntry
              name="password_confirmation"
              placeholder="Confirmar senha"
              error={undefined}
            />
            <Button
              title="Salvar Alterações"
              onPress={handleSubmit(handleUpdatePassword)}
              disabled={
                !!errors.old_password ||
                !!errors.password ||
                !!errors.password_confirmation
              }
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
