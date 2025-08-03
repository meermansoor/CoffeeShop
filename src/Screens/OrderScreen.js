import React from 'react'
import {View , Text ,TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6'
import Bag from '../assets/images/svg/Bag.svg'


export default function OrderScreen(){

    return(
        <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome6 name="angle-left" color={'black'} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Order</Text>
        <View/>
      </View>

      <View>
        <Bag/>
      </View>
      </View>
    )
    
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        paddingHorizontal: 30,
      },
      headerText: {
        fontSize: 16,
        fontFamily: 'Sora-SemiBold',
        textAlign: 'center',
      },
})