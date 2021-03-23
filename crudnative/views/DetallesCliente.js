import React from 'react';
import {View, StyleSheet, Alert, Platform} from 'react-native';
import {Headline, Text, Subheading, Button, FAB} from 'react-native-paper';
import globlaStyles from '../styles/global';

import axios from 'axios';

const DetallesCliente = ({navigation, route}) => {
  const {id, nombre, telefono, correo, empresa} = route.params.item;
  const {setConsultarAPI} = route.params;

  const mostrarConfirmacion = () => {
    Alert.alert(
      'Deseas eliminar este cliente?',
      'Un contacto eliminido no se puede eliminar',
      [
        {
          text: 'Si eliminar',
          onPress: () => {
            eliminarContacto();
          },
        },
        {text: 'Cancelar', style: 'cancel'},
      ],
    );
  };
  const eliminarContacto = async () => {
    try {
      const URL =
        Platform.OS === 'ios'
          ? `http://localhost:3000/clientes/${id}`
          : `http://192.168.52.1:3000/clientes/${id}`;
      await axios.delete(URL);
      //Redireccionar
      navigation.navigate('Inicio');

      //Volver a consultar API
      setConsultarAPI(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={globlaStyles.contenedor}>
      <Headline style={globlaStyles.titulo}>{nombre}</Headline>
      <Text style={styles.texto}>
        Empresa: <Subheading>{empresa}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Correo: <Subheading>{correo}</Subheading>
      </Text>
      <Text style={styles.texto}>
        Teléfono: <Subheading>{telefono}</Subheading>
      </Text>
      <Button
        mode="contained"
        icon="cancel"
        style={styles.btn}
        onPress={() => {
          mostrarConfirmacion();
        }}>
        Eliminar Cliente
      </Button>
      <FAB
        icon="pencil"
        style={globlaStyles.fab}
        onPress={() => {
          navigation.navigate('NuevoCliente', {
            cliente: route.params.item,
            setConsultarAPI,
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    marginBottom: 20,
    fontSize: 18,
  },
  btn: {
    marginTop: 80,
    backgroundColor: 'red',
    color: 'white',
  },
});

export default DetallesCliente;
