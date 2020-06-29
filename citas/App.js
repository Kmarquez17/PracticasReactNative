import React, {useState} from 'react';
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
import Citas from './src/components/citas';
import Formulario from './src/components/Formulario';
const App = () => {
  // Definir el state de citas
  const [citas, setCitas] = useState([
    {
      id: '1',
      paciente: 'Hooks',
      propetario: 'Kevin Marquez',
      sintomas: 'No come',
    },
    {
      id: '2',
      paciente: 'Kaiser',
      propetario: 'Juan Lopez',
      sintomas: 'Dolor en la pata izquierda',
    },
    {
      id: '3',
      paciente: 'Rochi',
      propetario: 'Dolores Garcia',
      sintomas: 'Sangrado de nariz',
    },
  ]);
  const [mostrarFrom, setMostarFrom] = useState(false);

  //Eliminar la cita de un paciente dado de Alta
  const handleEliminar = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  //Agregamos nuevas citas al state
  const agregarCita = cita => {
    let citasNueva = [...citas, cita];
    setCitas(citasNueva);
    //Ocultar el formulario
    setMostarFrom(false);
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
              <Formulario agregarCita={agregarCita} />
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
