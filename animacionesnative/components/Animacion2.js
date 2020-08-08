import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';

const Animacion2 = () => {
  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion /*Valor comienzo de la animacion*/, {
      toValue: 450, //Valor en la que tiene que llegar la animacion
      duration: 1000, //Valor en el tiempo que tiene que llegar la animacion
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <Animated.View
      style={[
        styles.caja,
        {
          width: animacion,
          height: animacion
        },
      ]}></Animated.View>
  );
};

const styles = StyleSheet.create({
  caja: {
    width: 100,
    height: 100,
    backgroundColor: 'cornflowerblue',
  },
});

export default Animacion2;
