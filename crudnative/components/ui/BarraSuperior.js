import React from 'react';
import {Button} from 'react-native-paper';

const BarraSuperior = ({navigation}) => {
  const hadlePress = () => {
    navigation.navigate('NuevoCliente');
  };
  return (
    <Button icon='plus-circle' color={'#fff'} onPress={() => hadlePress()}>
      Cliente
    </Button>
  );
};

export default BarraSuperior;
