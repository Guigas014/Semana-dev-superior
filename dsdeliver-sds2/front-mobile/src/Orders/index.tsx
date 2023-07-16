import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, Image, ScrollView, View, Alert } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { fetchOrders } from '../api';

import Header from '../Header';
import OrderCard from '../OrderCard';
import { Order } from '../types';


export default function Orders() {
  const [ orders, setOrders ] = useState<Order>([]);
  const [ isLoading, setIsLoading ] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();


  const fetchData = () => {
    setIsLoading(true)

    fetchOrders()
      .then(response => setOrders(response.data)) 
      .catch(error => Alert.alert('Erro ao buscar os pedidos!'))
      .finally(() => setIsLoading(false))
  }

  useEffect(() => {
    if (isFocused) {
      fetchData()
    }
  }, [isFocused]);  

  
  const handleOnPress = (order: Order) => {
    navigation.navigate('OrderDetails', { order });  
  }


  return (
    <>
      <Header />
      <ScrollView style={styles.container}>
        {isLoading ? (
            <Text style={styles.loading}>Buscando pedidos...</Text>
          ) 
          : (
            orders.map(order => (
              <TouchableWithoutFeedback 
                key={order.id} 
                onPress={() => handleOnPress(order)}
              >
                <OrderCard order={order} />
              </TouchableWithoutFeedback>
            ))
          )
        }
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingRight: '5%',
    paddingLeft: '5%', 
    backgroundColor: '#F5F5F5',
  },
  loading: {
    fontWeight: 'bold',
    fontSize: 18,
    lineHeight: 25,
    letterSpacing: -0.24,
    color: '#DA5C5C',
    fontFamily: 'OpenSans_700Bold',

    paddingTop: 100,
    textAlign: 'center',
  }
});
