import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  TouchableHighlight,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const [inputTexto, setInputTexto] = useState('');
  const [nombreStorage, setNombreStorage] = useState('');

  useEffect(() => {
    const obtenerDatosStorage = async () => {
      try {
        const nombre = await AsyncStorage.getItem('nombre');
        setNombreStorage(nombre);
      } catch (error) {
        console.log(error);
      }
    };
    obtenerDatosStorage();
  }, []);
  const handleGuardarDatos = async () => {
    try {
      await AsyncStorage.setItem('nombre', inputTexto);
      setNombreStorage(inputTexto);
      setInputTexto('');
    } catch (error) {
      console.log(error);
    }
  };

  const handleEliminarDatos = async () => {
    try {
      await AsyncStorage.removeItem('nombre');
      setInputTexto('');
      setNombreStorage('');
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <View style={styles.contenedor}>
        {nombreStorage ? <Text>Nombre: {nombreStorage}</Text> : null}

        <TextInput
          placeholder="Escribe tu nombre"
          style={styles.input}
          value={inputTexto}
          onChangeText={(texto) => {
            setInputTexto(texto);
          }}
        />
        <Button title="Guardar" color="#333" onPress={handleGuardarDatos} />

        {nombreStorage ? (
          <TouchableHighlight
            style={styles.btnEliminar}
            onPress={handleEliminarDatos}>
            <Text style={styles.txtEliminar}>Eliminar Nombre &times;</Text>
          </TouchableHighlight>
        ) : null}
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderColor: '#666',
    borderBottomWidth: 1,
    width: 300,
    height: 40,
    marginBottom: 10,
  },
  btnEliminar: {
    backgroundColor: 'red',
    marginTop: 20,
    padding: 10,
  },
  txtEliminar: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    width: 300,
  },
});

export default App;
