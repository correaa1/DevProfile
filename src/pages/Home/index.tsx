import React from 'react';
import {
  Container,
  Header,
  Icon,
  LogoutButton,
  UserAvatar,
  UserAvatarButton,
  UserGreeting,
  UserInfo,
  UserInfoDatail,
  UserName,
  UserWrapper,
} from './styles';

import avatarDefault from '../../assets/avatar1.png';
import { useAuth } from '../../context/AuthContext';
import { Alert } from 'react-native';

export const Home: React.FunctionComponent = () => {
  const { user, signOut } = useAuth();

  const handleSignOut = () => {
    Alert.alert('Tem certeza', 'deseja realmente sair da aplicação?', [
      {
        text: 'Cancelar',
        onPress: () => {},
      },
      {
        text: 'Sair',
        onPress: () => signOut(),
      },
    ]);
  };

  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <UserAvatarButton onPress={() => {}}>
              <UserAvatar
                source={
                  user.avatar_url ? { uri: user.avatar_url } : avatarDefault
                }
              />
            </UserAvatarButton>
            <UserInfoDatail>
              <UserGreeting>Olá,</UserGreeting>
              <UserName>{user.name}</UserName>
            </UserInfoDatail>
          </UserInfo>
          <LogoutButton onPress={handleSignOut}>
            <Icon name="power" />
          </LogoutButton>
        </UserWrapper>
      </Header>
    </Container>
  );
};
