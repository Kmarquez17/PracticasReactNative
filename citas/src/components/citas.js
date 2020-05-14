import React from 'react';
import {StyleSheet, Text, View, TouchableHighlight} from 'react-native';

const citas = ({cita, handleEliminar}) => {
  const dialgoElminar = id => {
    handleEliminar(id);
   
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{cita.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propetario:</Text>
        <Text style={styles.texto}>{cita.propetario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.texto}>{cita.sintomas}</Text>
      </View>

      <View>
        <TouchableHighlight
          onPress={() => {
            dialgoElminar(cita.id);
          }}
          style={styles.btnEliminar}>
          <Text style={styles.textoEliminar}>Eliminar &times;</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default citas;

const styles = StyleSheet.create({
  cita: {
    backgroundColor: '#FFF',
    borderBottomColor: '#E1E1E1',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  label: {fontWeight: 'bold', fontSize: 18, marginTop: 20},
  texto: {fontSize: 18},
  btnEliminar: {padding: 10, backgroundColor: 'red', marginVertical: 10},
  textoEliminar: {color: '#FFF', fontWeight: 'bold', textAlign: 'center'},
});
