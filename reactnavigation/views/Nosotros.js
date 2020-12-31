import React from 'react';
import {Text, StyleSheet, View, Button} from 'react-native';

const Nosotros = ({navigation, route}) => {
  const {
    params: {clienteId, totalPagar},
  } = route;

  console.log(clienteId);
  return (
    <View style={styles.contenedor}>
      <Text>{clienteId}</Text>
      <Button
        title="Volver"
        onPress={() => {
          navigation.navigate('Inicio');
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

export default Nosotros;
