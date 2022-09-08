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
  name: yup.string().required('Informe o nome completo.'),
  email: yup.string().email('Email inválido.').required('Informe o email.'),
});
export const UserProfileEdit: React.FunctionComponent = () => {
  const { user, updateUser } = useAuth();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FieldValues>({
    resolver: yupResolver(formSchema),
    defaultValues: {
      name: user.name,
      email: user.email,
    },
  });

  const { goBack } = useNavigation<ScreenNavigationProp>();

  const handleProfileEdit = async (form: IFormInputs) => {
    const data = {
      name: form.name,
      email: form.email,
    };

    console.log(data);
    try {
      const response = await api.put('profile', data);
      updateUser(response.data);
      Alert.alert(
        'Perfil atualizado',
        'Os dados do seu perfil foram atualizados.',
      );
      goBack();
    } catch (error) {
      Alert.alert(
        'Ocorreu algum erro ao atualizar',
        'Ocorreu algum erro ao atualizar o perfil. Tente novamente.',
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
            <Title>Editar Dados do perfil</Title>
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="name"
              placeholder="Nome completo"
              error={undefined}
            />
            <InputControl
              autoCapitalize="none"
              autoCorrect={false}
              control={control}
              name="email"
              placeholder="Email"
              keyboardType="email-address"
              error={undefined}
            />
            <Button
              title="Salvar Alterações"
              onPress={handleSubmit(handleProfileEdit)}
              disabled={!!errors.name || !!errors.email}
            />
          </Content>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
