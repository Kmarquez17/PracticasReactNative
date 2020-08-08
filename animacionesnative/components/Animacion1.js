import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, Animated} from 'react-native';

const Animacion1 = () => {
  const [animacion] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animacion /*Valor comienzo de la animacion*/, {
      toValue: 1, //Valor en la que tiene que llegar la animacion
      duration: 500, //Valor en el tiempo que tiene que llegar la animacion
      useNativeDriver: false
    }).start();
  }, []);

  return (
    <Animated.View
      style={{
        opacity: animacion,
      }}>
      <Text style={styles.texto}>Animacion1</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 30,
    textAlign: 'center',       
  },
});

export default Animacion1;
