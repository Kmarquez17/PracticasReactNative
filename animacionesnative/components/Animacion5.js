import React, {useState} from 'react';
import {
  View,
  Text,
  Animated,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

const Animacion5 = () => {
  const [animacion] = useState(new Animated.Value(1));
  const presionarBtn = () => {
    Animated.spring(animacion, {
      toValue: 0.8,

      useNativeDriver: false,
    }).start();
  };

  const soltarBtn = () => {
    Animated.spring(animacion, {
      toValue: 1,
      friction: 5, //Mas bajo mayor rebote
      tension: 30, //Msa bajo mas suave el movimiento
      useNativeDriver: false,
    }).start();
  };
  const estiloAnimacion = {
    transform: [{scale: animacion}],
  };
  return (
    <View style={styles.contenedor}>
      <TouchableWithoutFeedback
        // onPress={() => {}}
        onPressIn={() => {
          presionarBtn();
        }}
        onPressOut={() => {
          soltarBtn();
        }}>
        <Animated.View style={[styles.btn, estiloAnimacion]}>
          <Text style={styles.texto}>Iniciar Sesion</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    borderWidth: 1,
    borderColor: 'red',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'cornflowerblue',
    width: 280,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'red',
  },
  texto: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 28,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'pink',
  },
});

export default Animacion5;
