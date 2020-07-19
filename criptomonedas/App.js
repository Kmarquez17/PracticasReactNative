import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  View,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';

import Header from './components/Header';
import Formulario from './components/Formulario';
import Cotizacion from './components/Cotizacion';

const App = () => {
  const [moneda, setMoneda] = useState('');
  const [criptomoneda, setCriptomoneda] = useState('');
  const [consultarApi, setConsultarApi] = useState(false);
  const [cargando, setCargando] = useState(false);

  const [resultado, setResultado] = useState({});

  useEffect(() => {
    const consultarCriptomoneda = async () => {
      if (consultarApi) {
        const URL = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`;
        const resultado = await axios.get(URL);
        setCargando(true);

        //Ocultar spinner y mostrar el resultado
        setTimeout(() => {
          setResultado(resultado.data.DISPLAY[criptomoneda][moneda]);
          setConsultarApi(false);
          setCargando(false);
        }, 2000);

        //setCriptomonedas(resultado.data.Data);
      }
    };

    consultarCriptomoneda();
    //Consultar la api para obtener la cotizacion
  }, [consultarApi]);
  return (
    <>
      <ScrollView>
        <Header />
        <Image
          style={styles.imagen}
          source={require('./assets/img/cryptomonedas.png')}
        />
        <View style={styles.contenido}>
          <Formulario
            moneda={moneda}
            setMoneda={setMoneda}
            criptomoneda={criptomoneda}
            setCriptomoneda={setCriptomoneda}
            setConsultarApi={setConsultarApi}
          />
        </View>
        <View style={{marginTop: 30}}>
          {cargando ? (
            <ActivityIndicator size="large" color="#5E49E2" />
          ) : (
            <Cotizacion resultado={resultado} />
          )}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  imagen: {
    width: '100%',
    height: 150,
    marginHorizontal: '0.5%',
  },
  contenido: {
    marginHorizontal: '2.5%',
  },
});

export default App;
