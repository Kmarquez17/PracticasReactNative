import React, {useState} from 'react';
import {StyleSheet, Text, View, Button, TextInput} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const Formulario = () => {
  const [paciente, setPaciente] = useState('');
  const [propetario, setPropetario] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  //Muestra o oculta Date Picker
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmarFecha = date => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };

    setFecha(date.toLocaleDateString('es-ES', options));
    hideDatePicker();
  };

  //Muestra o oculta Time Picker
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmarHora = hora => {
    const options = {
      hour: 'numeric',
      minute: '2-digit',
    };

    setHora(hora.toLocaleDateString('en-US', options));
    hideTimePicker();
  };

  return (
    <>
      <View style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              console.log(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Propetario:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              console.log(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Telofono Contacto:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => {
              console.log(texto);
            }}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmarFecha}
            onCancel={hideDatePicker}
            locale="es_ES"
          />
          <Text>{fecha}</Text>
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmarHora}
            onCancel={hideTimePicker}
            locale="es_ES"
          />
          <Text> {hora}</Text>
        </View>
        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => {
              console.log(texto);
            }}
          />
        </View>
      </View>
    </>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: '2.5%',
  },
  label: {fontWeight: 'bold', fontSize: 18, marginTop: 20},
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
});
