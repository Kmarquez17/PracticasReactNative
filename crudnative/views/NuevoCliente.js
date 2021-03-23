import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import axios from 'axios';
import {
  TextInput,
  Headline,
  Button,
  Paragraph,
  Dialog,
  Portal,
} from 'react-native-paper';

import globalStyles from '../styles/global';

const NuevoCliente = ({navigation, route}) => {
  const {setConsultarAPI} = route.params;
  //Campos formularios
  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [empresa, setEmpresa] = useState('');
  const [alerta, setAlerta] = useState(false);

  //Detectar si estamos editando o no
  useEffect(() => {
    if (route.params.cliente) {
      const {nombre, telefono, correo, empresa} = route.params.cliente;
      setNombre(nombre);
      setTelefono(telefono);
      setCorreo(correo);
      setEmpresa(empresa);
    }
  }, []);

  const guardarCliente = async () => {
    //Validar
    if (nombre === '' || telefono === '' || correo === '' || empresa === '') {
      setAlerta(true);
      return;
    }
    //Generar el cliente
    const cliente = {
      nombre,
      telefono,
      correo,
      empresa,
    };

    //console.log(cliente);
    //Guardar el cliente

    try {
      let URL = '';
      //Si estamos editando
      if (route.params.cliente) {
        const {id} = route.params.cliente;
        cliente.id = id;
        URL =
          Platform.OS === 'ios'
            ? `http://localhost:3000/clientes/${id}`
            : `http://192.168.52.1:3000/clientes/${id}`;
        await axios.put(URL, cliente);
      } else {
        URL =
          Platform.OS === 'ios'
            ? 'http://localhost:3000/clientes'
            : 'http://192.168.52.1:3000/clientes';
        await axios.post(URL, cliente);
      }
    } catch (error) {
      console.log(error);
    }

    //Reset formulario
    setNombre('');
    setTelefono('');
    setCorreo('');
    setEmpresa('');

    //Redireccionar
    navigation.navigate('Inicio');

    //Pasar a true para traer el nuevo cliente insertado
    setConsultarAPI(true);
  };

  return (
    <View style={globalStyles.contenedor}>
      <Headline style={globalStyles.titulo}>Añadir nuevo Cliente</Headline>
      <TextInput
        label="Nombre:"
        placeholder="Nombre"
        onChangeText={(texto) => {
          setNombre(texto);
        }}
        style={styles.input}
        value={nombre}
      />
      <TextInput
        label="Teléfono:"
        placeholder="Teléfono"
        onChangeText={(texto) => {
          setTelefono(texto);
        }}
        style={styles.input}
        value={telefono}
      />
      <TextInput
        label="Correo:"
        placeholder="correo@correo.com"
        onChangeText={(texto) => {
          setCorreo(texto);
        }}
        style={styles.input}
        value={correo}
      />
      <TextInput
        label="Empresa:"
        placeholder="Empresa"
        onChangeText={(texto) => {
          setEmpresa(texto);
        }}
        style={styles.input}
        value={empresa}
      />

      <Button
        icon="pencil-circle"
        mode="contained"
        onPress={() => {
          guardarCliente();
        }}>
        {route.params.cliente ? 'Editar Cliente' : 'Guardar Cliente'}
      </Button>

      <Portal>
        <Dialog
          visible={alerta}
          onDismiss={() => {
            setAlerta(false);
          }}>
          <Dialog.Title>Error</Dialog.Title>
          <Dialog.Content>
            <Paragraph>Todos los campos son obligatorios</Paragraph>
          </Dialog.Content>
          <Dialog.Actions>
            <Button
              onPress={() => {
                setAlerta(false);
              }}>
              Ok
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    marginBottom: 20,
    backgroundColor: 'transparent',
  },
});

export default NuevoCliente;
