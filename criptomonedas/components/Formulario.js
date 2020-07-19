import React, {useState, useEffect} from 'react';

import {StyleSheet, View, Text, TouchableHighlight, Alert} from 'react-native';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';

const Formulario = ({
  moneda,
  setMoneda,
  criptomoneda,
  setCriptomoneda,
  setConsultarApi,
}) => {
  const [criptomonedas, setCriptomonedas] = useState([]);

  useEffect(() => {
    const consultarAPI = async () => {
      const URL = `https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD`;
      const resultado = await axios.get(URL);
      setCriptomonedas(resultado.data.Data);
    };

    consultarAPI();
  }, []);

  const obtenerMoneda = (moneda) => {
    setMoneda(moneda);
  };

  const obtenerCriptoMoneda = (cripto) => {
    setCriptomoneda(cripto);
  };

  const handleCotizarPrecio = () => {
    if (moneda.trim() === '' || criptomoneda.trim === '') {
      mostrarAlerta();
      return;
    }

    //Cambiar el state de consultar API
    setConsultarApi(true);
  };

  const mostrarAlerta = () => {
    Alert.alert('Error....', 'Ambos campos son obligatorio', [
      {
        text: 'Ok',
      },
    ]);
  };

  console.log(criptomonedas.length);

  return (
    <View>
      <Text style={styles.label}>Monedas</Text>
      <Picker
        selectedValue={moneda}
        onValueChange={(modena) => obtenerMoneda(modena)}
        itemStyle={{height: 120}}>
        <Picker.Item label="Seleccione -" value="" />
        <Picker.Item label="Dolar de Estados Unidos" value="USD" />
        <Picker.Item label="Peso Mexicano" value="MXN" />
        <Picker.Item label="Euro" value="EUR" />
        <Picker.Item label="Libra Esterlina" value="GBP" />
      </Picker>
      <Text style={styles.label}>CriptoMonedas</Text>

      <Picker
        selectedValue={criptomoneda}
        onValueChange={(cripto) => obtenerCriptoMoneda(cripto)}
        itemStyle={{height: 120}}>
        <Picker.Item label="Seleccione -" value="" />
        {criptomonedas.length > 0
          ? criptomonedas.map((cripto) => {
              const {Id, Name, FullName} = cripto.CoinInfo;
              return <Picker.Item key={Id} label={FullName} value={Name} />;
            })
          : null}
      </Picker>

      <TouchableHighlight
        style={styles.btnCotizar}
        onPress={handleCotizarPrecio}>
        <Text style={styles.textCotizar}>Cotizar</Text>
      </TouchableHighlight>
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: 'Lato-Black',
    textTransform: 'uppercase',
    fontSize: 22,
    marginVertical: 20,
  },
  btnCotizar: {
    backgroundColor: '#5E49E2',
    padding: 10,
    marginTop: 20,
    borderRadius: 50,
  },
  textCotizar: {
    color: '#fff',
    textTransform: 'uppercase',
    fontFamily: 'Lato-Black',
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Formulario;
