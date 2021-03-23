import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {FlatList, View} from 'react-native';
import {List, Headline, Button, FAB} from 'react-native-paper';
import globlaStyles from '../styles/global';

const Inicio = ({navigation}) => {
  const [clientes, setClientes] = useState([]);
  const [consultarAPI, setConsultarAPI] = useState(true);
  useEffect(() => {
    const obtenerClienteAPI = async () => {
      try {
        const URL =
          Platform.OS === 'ios'
            ? 'http://localhost:3000/clientes'
            : 'http://192.168.52.1:3000/clientes';
        const result = await axios.get(URL);

        setClientes(result.data);
        setConsultarAPI(false);
      } catch (error) {
        console.log(error);
      }
    };
    if (consultarAPI) {
      obtenerClienteAPI();
    }
  }, [consultarAPI]);

  return (
    <View style={globlaStyles.contenedor}>
      <Button
        icon="plus-circle"
        onPress={() => {
          navigation.navigate('NuevoCliente', {setConsultarAPI});
        }}>
        Nuevo Cliente
      </Button>
      <Headline style={globlaStyles.titulo}>
        {clientes.length === 0 ? 'Aún no hay clientes' : 'Clientes'}
      </Headline>
      <FlatList
        keyExtractor={(cliente) => cliente.id.toString()}
        data={clientes}
        renderItem={({item}) => (
          <List.Item
            title={item.nombre}
            description={item.empresa}
            onPress={() => {
              navigation.navigate('DetallesCliente', {item, setConsultarAPI});
            }}
          />
        )}
      />
      <FAB
        icon="plus"
        style={globlaStyles.fab}
        onPress={() => {
          navigation.navigate('NuevoCliente', {setConsultarAPI});
        }}
      />
    </View>
  );
};

export default Inicio;
