import React, {useState} from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-community/picker';

const Fomulario = ({busqueda, setBusqueda, setConsultar}) => {
  const initialState = {
    ciudades: [
      {
        name: 'Nicaragua',
        value: 'NI',
      },
      {
        name: 'Estados Unidos',
        value: 'US',
      },
      {
        name: 'Mexico',
        value: 'MX',
      },

      {
        name: 'España',
        value: 'ES',
      },
      {
        name: 'Colombia',
        value: 'CO',
      },
      {
        name: 'Argentina',
        value: 'AR',
      },
      {
        name: 'Costa Rica',
        value: 'CR',
      },
    ],
  };

  const [ciudades, setCiudades] = useState(initialState.ciudades);
  const [animacionBoton] = useState(new Animated.Value(1));
  const {pais, ciudad} = busqueda;

  const handleConsultarClima = () => {
    // console.log(busqueda);
    if (pais.trim() === '' || ciudad.trim() === '') {
      mostrarAlerta();
      return;
    }

    //consultar la API
    setConsultar(true);
  };
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Agrega una ciudad y el pais para una busqueda', [
      {text: 'Entendido'},
    ]);
  };

  const handleAnimacionEntrada = () => {
    Animated.spring(animacionBoton, {
      toValue: 0.9,
      useNativeDriver: true
    }).start();
  };

  const handleAnimacionSalida = () => {
    Animated.spring(animacionBoton, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
      tension: 30,
    }).start();
  };

  const estiloAnimacion = {
    transform: [{scale: animacionBoton}],
  };
  return (
    <>
      <View style={styles.formulario}>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Ciudad"
            value={ciudad}
            onChangeText={(ciudad) => {
              setBusqueda({...busqueda, ciudad});
            }}
            placeholderTextColor="#666"
          />
        </View>

        <View>
          <Picker
            selectedValue={pais}
            onValueChange={(pais) => {
              setBusqueda({...busqueda, pais});
            }}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}>
            <Picker.Item label="-- Seleccione un pais --" value="" />
            {ciudades.map((ciudad, idx) => {
              let {name, value} = ciudad;
              return <Picker.Item label={name} value={value} key={idx} />;
            })}
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPress={() => {
            handleConsultarClima();
          }}
          onPressIn={() => {
            handleAnimacionEntrada();
          }}
          // delayPressIn={1000}
          onPressOut={() => {
            handleAnimacionSalida();
          }}>
          <Animated.View style={[styles.btnBuscar, estiloAnimacion]}>
            <Text style={styles.textoBuscar}>Buscar Clima</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnBuscar: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textoBuscar: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase',
    textAlign: 'center',
    fontSize: 18,
  },
});

export default Fomulario;
