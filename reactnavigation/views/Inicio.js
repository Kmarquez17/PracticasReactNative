import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const Incio = ({navigation}) => {
  const info = {
    clienteId: '17',
    totalPagar: 'C$150',
  };
  return (
    <View style={styles.contenedor}>
      <Text>Incio</Text>
      <Button
        title="Ir a nosotros"
        onPress={() => {
          navigation.navigate('Nosotros', info);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Incio;
