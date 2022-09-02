import React from 'react';
import {
  Container,
  Header,
  Icon,
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

export const Home: React.FunctionComponent = () => {
  const { user } = useAuth();
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
          <Icon name="power" />
        </UserWrapper>
      </Header>
    </Container>
  );
};
