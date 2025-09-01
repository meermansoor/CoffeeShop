import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Colors from '../assets/Colors/colors';
import { useSelector } from 'react-redux';
import Edit from '../assets/images/svg/Edit.svg';
import Document from '../assets/images/svg/Document.svg';
import CartItemTile from '../assets/components/CartItemTile';
import Discount from '../assets/images/svg/Discount';
import FontAwesome6Icon from 'react-native-vector-icons/FontAwesome6';

export default function OrderScreen() {
  const [selectedOption, setSelectedOption] = useState('Deliver');
  const cartItems = useSelector(state => state.cart.cartItems);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  const deliveryCharges = 2

  const finalAmount = totalPrice + deliveryCharges

  function cartItemRenderHandler({ item }) {
    return (
      <CartItemTile
        name={item.name}
        description={item.description}
        price={item.price}
        imageURL={item.imageURL}
        quantity={item.quantity}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome6 name="angle-left" color={'black'} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Order</Text>
        <View />
      </View>

      <View style={styles.optionContainer}>
        <TouchableOpacity
          style={[
            styles.buyButton,
            selectedOption === 'Deliver'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => {
            setSelectedOption('Deliver');
            console.log(cartItems.name);
          }}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption !== 'Deliver' && styles.inactiveText,
            ]}
          >
            Deliver
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.buyButton,
            selectedOption === 'PickUp'
              ? styles.activeButton
              : styles.inactiveButton,
          ]}
          onPress={() => setSelectedOption('PickUp')}
        >
          <Text
            style={[
              styles.buttonText,
              selectedOption !== 'PickUp' && styles.inactiveText,
            ]}
          >
            Pick Up
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.deliveryAddressContainer}>
        <Text style={[styles.title, { textAlign: 'auto' }]}>
          Delivery Address
        </Text>
        <Text style={styles.subText}>JI. Kpg Sutoyo</Text>
        <Text style={styles.addressText}>
          Kpg. Sutoyo No. 620, Bilzen, Tanjungbalai.
        </Text>
        <View style={styles.editAddressContainer}>
          <TouchableOpacity style={styles.editButton}>
            <Edit />
            <Text style={styles.editText}>Edit Address</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.editButton}>
            <Document />
            <Text style={styles.editText}>Add Note</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.line} />
      </View>
      <View>
        <FlatList
          data={cartItems}
          keyExtractor={item => item.id + '_' + item.name}
          renderItem={cartItemRenderHandler}
        />
      </View>
      <View style={styles.paymentContainer}>
      <View style={styles.discountContainer}>
        <View style={{ flexDirection: 'row' }}>
          <Discount />
          <Text style={styles.discountTxt}> Discount is Applied</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome6 name="angle-right" color={'black'} size={20} />
        </TouchableOpacity>
      </View>
        <Text
          style={[
            styles.title,
            { textAlign: 'auto', marginHorizontal: 20, marginVertical: 15 },
          ]}
        >
          Payment Summary
        </Text>
        <View style={styles.footer}>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>Price</Text>
          <Text style={styles.price}>${totalPrice}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.price}>Delivery Fee</Text>
          <Text style={styles.price} >${deliveryCharges}</Text>
        </View>
        </View>
      <TouchableOpacity style={styles.paymentOption}>
        <View style={{flexDirection:'row', gap:20, justifyContent:'center', alignItems:'center'}}>
        <FontAwesome6 name='wallet' color={Colors.primary} size={24} />
        <View>
        <Text style={styles.paymentText}>Cash/Wallet</Text>
        <Text style={[styles.paymentText,{color:Colors.primary}]}>{(totalPrice + deliveryCharges).toFixed(2)}</Text>
        </View>
        </View>
        <FontAwesome6 name='angle-down' color={'black'} size={24} />

      </TouchableOpacity>
      <TouchableOpacity style={styles.orderButton}>
        <Text style={styles.buttonText}> Order </Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
  },
  optionContainer: {
    height: 43,
    padding: 4,
    backgroundColor: '#EDEDED',
    marginHorizontal: 20,
    marginBottom:20,
    borderRadius: 8,
    flexDirection: 'row',
    gap: 10,
  },
  buyButton: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    paddingHorizontal: 24,
    justifyContent: 'center',
  },
  activeButton: {
    backgroundColor: Colors.primary,
    elevation: 2,
  },
  inactiveButton: {
    backgroundColor: '#EDEDED',
  },
  buttonText: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  inactiveText: {
    color: 'black',
  },
  deliveryAddressContainer: {
    marginTop: 20,
    marginHorizontal: 20,
  },
  subText: {
    marginTop: 5,
    fontFamily: 'Sora-SemiBold',
  },
  addressText: {
    fontFamily: 'Sora-Regular',
    color: Colors.gray,
  },
  editAddressContainer: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 8,
  },
  editButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 16,
    padding: 4,
    paddingHorizontal: 10,
  },
  editText: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    marginLeft: 4,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  line: {
    height: 2,
    backgroundColor: '#ccc',
    marginVertical: 20,
    width: '100%',
    alignSelf: 'center',
  },
  cartItemsContainer: {
    padding: 20,
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8,
  },
  itemName: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
  },
  itemDetails: {
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: '#555',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#999',
    fontFamily: 'Sora-Regular',
  },
  totalText: {
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    marginTop: 20,
    textAlign: 'right',
  },
  discountContainer: {
    flexDirection: 'row',
    marginHorizontal: 20,
    marginVertical: 10,
    justifyContent: 'space-between',
    borderWidth:1,
    borderColor:Colors.lightGray,
    borderRadius:16,
    padding:20
  },
  discountTxt: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 14,
    marginLeft: 16,
  },
  priceContainer:{
    flexDirection:'row',
    justifyContent:'space-between',
    marginHorizontal:25
  },
  price:{
    fontFamily:'Sora-Regular',
  },
  paymentContainer:{
    width:'100%',
    padding:8,
    gap:8,
    position: "absolute",
    bottom:0,
  },
  paymentOption:{
    flexDirection:'row',
    gap:16,
    marginTop:20,
    justifyContent:'space-between',
    alignItems:'center',
    paddingHorizontal:16,

  },
  paymentText:{
    fontFamily:'Sora-SemiBold',
    fontSize:14
  },
  orderButton:{
    backgroundColor:Colors.primary,
    borderRadius:16,
    paddingVertical:20,
    paddingHorizontal:16,
    marginTop:10,
    marginHorizontal:5,
  }

});

const payStyles = StyleSheet.create({

})

// AIzaSyBvZxPchfdOd6VvLIsYYt01iLnA9eiuhFg  Google Maps Api
