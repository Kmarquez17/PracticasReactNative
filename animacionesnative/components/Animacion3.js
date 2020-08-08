import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

const Animacion3 = () => {
  const [animacion] = useState(new Animated.Value(14));

  useEffect(() => {
    Animated.timing(animacion /*Valor comienzo de la animacion*/, {
      toValue: 40, //Valor en la que tiene que llegar la animacion
      duration: 500, //Valor en el tiempo que tiene que llegar la animacion
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View>
      <Animated.Text
        style={[
          styles.texto,
          {
            fontSize: animacion,
          },
        ]}>
        Animacion3
      </Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Animacion3;
