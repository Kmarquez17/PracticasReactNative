import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

const App = () => {
  const handleOcultarTeclado = () => {
    Keyboard.dismiss();
  };
  const [busqueda, setBusqueda] = useState({
    pais: '',
    ciudad: '',
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [bgColor, setBgColor] = useState('rgb(71,149,212)');
  const {ciudad, pais} = busqueda;

  const bgColorApp = {
    backgroundColor: bgColor,
  };

  useEffect(() => {
    handleConsultarClima = async () => {
      if (consultar) {
        let keyAPI = '98a6dc00384191c844d4e4be3abdb038';
        const URL = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${keyAPI}`;
        console.log(URL);
        try {
          const respuesta = await fetch(URL);
          const resultado = await respuesta.json();
          //guardando el resultado del API
          setResultado(resultado);
          //Volver a false para poder consultar nuevamente
          setConsultar(false);
          //Ocultar el teclado
          handleOcultarTeclado();

          //Modificas los colores de fondo basado en le temperatura

          const kelvin = 273.15;
          const {main} = resultado;
          const actual = main.temp - kelvin;

          if (actual < 10) {
            setBgColor('rgb(105,108,149)');
          } else if (actual >= 10 && actual < 25) {
            setBgColor('rgb(71,149,212)');
          } else {
            setBgColor('rgb(178,28,61)');
          }
        } catch (error) {
          mostrarAlerta();
        }
      }
    };
    handleConsultarClima();
  }, [consultar]);

  const mostrarAlerta = () => {
    Alert.alert('Error', 'No hay resultado intenta con otra ciudad o pais', [
      {text: 'Entendido'},
    ]);
  };
  return (
    <>
      <TouchableWithoutFeedback
        onPress={() => {
          handleOcultarTeclado();
        }}>
        <View style={[styles.app, bgColorApp]}>
          <View style={styles.contenido}>
            <Clima resultado={resultado} />
            <Formulario
              busqueda={busqueda}
              setBusqueda={setBusqueda}
              setConsultar={setConsultar}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  app: {
    flex: 1,
    justifyContent: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
