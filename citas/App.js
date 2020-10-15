import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import Citas from './src/components/citas';
import Formulario from './src/components/Formulario';
const App = () => {
  // Definir el state de citas
  const [citas, setCitas] = useState([]);

  useEffect(() => {
    const handleObtenerCitas = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage));
        }
      } catch (error) {
        console.log(error);
      }
    };
    handleObtenerCitas();
  }, []);
  const [mostrarFrom, setMostarFrom] = useState(false);

  //Almacenar las citas al Storage
  const handleAlmacenarCitas = async citasJSON => {
    await AsyncStorage.setItem('citas', citasJSON);
    try {
    } catch (error) {
      console.log(error);
    }
  };

  //Eliminar la cita de un paciente dado de Alta
  const handleEliminar = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    handleAlmacenarCitas(JSON.stringify(citasFiltradas));
  };

  //Agregamos nuevas citas al state
  const agregarCita = cita => {
    let citasNueva = [...citas, cita];
    setCitas(citasNueva);
    //Ocultar el formulario
    setMostarFrom(false);
    //Pasar citas al Storage
    handleAlmacenarCitas(JSON.stringify(citasNueva));
  };

  //Ocultar el teclago
  const cerraTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        cerraTeclado();
      }}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Administración de Citas</Text>
        <View>
          <TouchableHighlight
            onPress={() => {
              setMostarFrom(!mostrarFrom);
            }}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              {mostrarFrom ? 'Listado de citas' : 'Crear nueva cita'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarFrom ? (
            <>
              <Text style={styles.titulo}>Crear Nueva Cita</Text>
              <Formulario agregarCita={agregarCita} handleAlmacenarCitas />
            </>
          ) : (
            <>
              <Text style={styles.titulo}>
                {citas.length > 0
                  ? 'Administra tu citas'
                  : 'No hay citas, Agrega una '}
              </Text>
              <FlatList
                data={citas}
                style={styles.listado}
                renderItem={({item}) => (
                  <Citas cita={item} handleEliminar={handleEliminar} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default App;

const styles = StyleSheet.create({
  contenedor: {backgroundColor: '#AA076B', flex: 1},
  contenido: {flex: 1, marginHorizontal: '2.5%'},
  titulo: {
    color: '#FFF',
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  listado: {flex: 1},
  btnMostrarForm: {padding: 10, backgroundColor: '#7d024e', marginVertical: 10},
  textoMostrarForm: {color: '#FFF', fontWeight: 'bold', textAlign: 'center'},
});
