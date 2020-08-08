import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Animated} from 'react-native';

const Animacion4 = () => {
  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion /*Valor comienzo de la animacion*/, {
      toValue: 360, //Valor en la que tiene que llegar la animacion
      duration: 500, //Valor en el tiempo que tiene que llegar la animacion
      useNativeDriver: false,
    }).start();
  }, []);

  const interpolacion = animacion.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  const estiloAnimacion = {
    transform: [{rotate: interpolacion}],
  };
  console.log(estiloAnimacion);

  return (
    <View>
      <Animated.Text style={[styles.caja, estiloAnimacion]}></Animated.Text>
    </View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'cornflowerblue',
  },
});

export default Animacion4;
