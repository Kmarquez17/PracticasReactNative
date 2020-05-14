import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableHighlight,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import shortid from 'shortid';

const Formulario = ({agregarCita}) => {
  const [paciente, setPaciente] = useState('');
  const [propetario, setPropetario] = useState('');
  const [telefono, setTelefono] = useState('');
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
    let horaCap = '';
    let minutoCap = '';

    if (hora.getHours() >= 0 && hora.getHours() <= 9) {
      horaCap = '0' + hora.getHours();
    } else {
      horaCap = hora.getHours();
    }

    if (hora.getMinutes() >= 0 && hora.getMinutes() <= 9) {
      minutoCap = '0' + hora.getMinutes();
    } else {
      minutoCap = hora.getMinutes();
    }
    setHora(`${horaCap}:${minutoCap}`);
    hideTimePicker();
  };

  //Crear una cita
  const crearCita = () => {
    if (
      paciente.trim() === '' ||
      propetario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      mostrarAlerta();
      return;
    }

    //Crear la cita
    const cita = {
      id: shortid.generate(),
      paciente,
      propetario,
      telefono,
      fecha,
      hora,
      sintomas,
    };
    agregarCita(cita);
  };

  //Muestra la alerta si falla la validacion
  const mostrarAlerta = () => {
    Alert.alert(
      'Error', //Titulo
      'Todos los campos son obligatorios', //Mensaje
      [{text: 'Ok'}],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            //value={paciente}
            onChangeText={texto => {
              setPaciente(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Propetario:</Text>
          <TextInput
            style={styles.input}
            //value={propetario}
            onChangeText={texto => {
              setPropetario(texto);
            }}
          />
        </View>
        <View>
          <Text style={styles.label}>Telofono Contacto:</Text>
          <TextInput
            style={styles.input}
            //value={telefono}
            onChangeText={texto => {
              setTelefono(texto);
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
            //value={sintomas}
            onChangeText={texto => {
              setSintomas(texto);
            }}
          />
        </View>
        <View>
          <TouchableHighlight onPress={crearCita} style={styles.btnSubmit}>
            <Text style={styles.textoSubmit}>Crear nueva cita</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};

export default Formulario;

const styles = StyleSheet.create({
  formulario: {
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {fontWeight: 'bold', fontSize: 18, marginTop: 20},
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {padding: 10, backgroundColor: '#7d024e', marginVertical: 10},
  textoSubmit: {color: '#FFF', fontWeight: 'bold', textAlign: 'center'},
});
