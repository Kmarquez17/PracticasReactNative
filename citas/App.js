import React, {useState} from 'react';
import {StyleSheet, Text, View, FlatList} from 'react-native';
import Citas from './src/components/citas';
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

  //Eliminar la cita de un paciente dado de Alta
  const handleEliminar = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <View style={styles.contenedor}>
      <Text style={styles.titulo}>Administración de Citas</Text>
      <Text style={styles.titulo}>
        {citas.length > 0 ? 'Administra tu citas' : 'No hay citas, Agrega una '}
      </Text>
      <FlatList
        data={citas}
        renderItem={({item}) => (
          <Citas cita={item} handleEliminar={handleEliminar} />
        )}
        keyExtractor={cita => cita.id}
      />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  contenedor: {backgroundColor: '#AA076B', flex: 1},
  titulo: {
    color: '#FFF',
    marginTop: 30,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
