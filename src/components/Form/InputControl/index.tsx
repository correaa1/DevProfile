import React from 'react';
import { TextInputProps } from 'react-native';
import { Container, Error } from './styles';
import { Control, Controller } from 'react-hook-form';
import { Input } from '../Input';

interface Props extends TextInputProps {
  control: Control;
  name: string;
  error:string | undefined;
}

export const InputControl: React.FunctionComponent<Props> = ({
  control,
  name,
  error,
  ...otherProps
}) => {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <Input onChangeText={onChange} value={value}{...otherProps} />
        )}
        name={name}
      />
      {error && <Error>{error}</Error>}
    </Container>
  );
};
