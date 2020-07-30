import React from 'react';
import {StyleSheet, View, Text, Image} from 'react-native';

const Clima = ({resultado}) => {
  const {name, main} = resultado;
  if (!name) return null;
  const kelvin = 273.15;
  return (
    <View styles={styles.clima}>
      <Text style={[styles.texto, styles.actual]}>
        {parseInt(main.temp - kelvin)}
        <Text style={styles.temperatura}>&#x2103;</Text>
        <Image
          style={{width: 66, height: 66}}
          source={{
            uri: `http://api.openweathermap.org/img/w/${resultado.weather[0].icon}.png`,
          }}
        />
      </Text>

      <View style={styles.temperaturas}>
        <Text style={styles.texto}>
          Mini{' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_min - kelvin)}
          </Text>{' '}
          &#x2103;
        </Text>
        <Text style={styles.texto}>
          Max{' '}
          <Text style={styles.temperatura}>
            {parseInt(main.temp_max - kelvin)}
          </Text>{' '}
          &#x2103;
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  clima: {
    marginBottom: 20,
  },
  texto: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    marginRight: 20,
  },
  actual: {
    fontSize: 80,
    marginRight: 0,
    fontWeight: 'bold',
  },
  temperatura: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  temperaturas: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
});
export default Clima;
