import React from 'react';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  Content,
  ContentTitle,
  EmailData,
  EmailTitle,
  GoBackButton,
  Header,
  HeaderTitle,
  UserAvatar,
  UserDetailsAvatar,
  UserEmailDetail,
  UserNameDetail,
  NameTitle,
  NameData,
} from './styles';
import { IUser } from '../../model/user';
import { api } from '../../services/api';
import { Icon } from '../SignIn/styles';
import avatarDefault from '../../assets/Pernalonga.jpg';
import { useAuth } from '../../context/AuthContext';

interface RouteParams {
  userId: string;
}

interface ScreenNavigationProp {
  goBack: () => void;
}

export const UserDetails: React.FunctionComponent = () => {
  const [userDetails, setUserDetails] = React.useState<IUser>({} as IUser);
  const route = useRoute();
  const { userId } = route.params as RouteParams;
  const { user } = useAuth();
  const { goBack } = useNavigation<ScreenNavigationProp>();
  React.useEffect(() => {
    const loadUser = async () => {
      const response = await api.get(`/users/${userId}`);
      setUserDetails(response.data);
    };
    loadUser();
  }, [userId]);
  return (
    <Container>
      <Header>
        <GoBackButton onPress={goBack}>
          <Icon name="chevron-left" />
        </GoBackButton>
        <HeaderTitle>Usuários</HeaderTitle>
        <UserAvatar
          source={user.avatar_url ? { uri: user.avatar_url } : avatarDefault}
        />
      </Header>
      <Content>
        <ContentTitle>Detalhes dos usuarios</ContentTitle>
        <UserDetailsAvatar
          source={
            userDetails.avatar_url
              ? { uri: userDetails.avatar_url }
              : avatarDefault
          }
        />
        <UserNameDetail>
          <NameTitle>Name</NameTitle>
          <NameData>{userDetails.name}</NameData>
        </UserNameDetail>
        <UserEmailDetail>
          <EmailTitle>Email</EmailTitle>
          <EmailData>{userDetails.email}</EmailData>
        </UserEmailDetail>
      </Content>
    </Container>
  );
};
