import { View, Text, Image, StyleSheet } from 'react-native';
import Colors from '../Colors/colors';
import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useDispatch } from 'react-redux';
import {incrementQuantity, decrementQuantity }from '../../redux/slices/cartSlice.js'

export default function CartItemTile({
    id,
    name,
    price,
    quantity,
    imageURL,
    description,
  }) {

    const dispatch = useDispatch();

    const addToCart = () => {
      dispatch(incrementQuantity(name));
    };
    
    const removeFromCart = () => {
      dispatch(decrementQuantity(name));
    };
    
    return (
      <View style={styles.container}>
        <Image
          source={require('../images/productImages/pimage.jpg')}
          style={styles.image}
        />
        <View style={styles.detailsContainer}>
          <View style={styles.infoContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subText}>{description}</Text>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity style={styles.icon} onPress={removeFromCart}>
              <AntDesign name='minus' size={18}/>
            </TouchableOpacity>
            <Text style={styles.quantityText}>{quantity}</Text>
            <TouchableOpacity style={styles.icon} onPress={addToCart}>
            <AntDesign name='plus' size={16} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
  

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      padding: 12,
      backgroundColor: '#f2f2f2',
      borderRadius: 12,
      marginHorizontal: 20,
      alignItems: 'center',
      marginBottom: 12,
    },
    image: {
      width: 54,
      height: 54,
      borderRadius: 12,
      marginRight: 12,
    },
    detailsContainer: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    infoContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
    },
    name: {
      fontFamily: 'Sora-SemiBold',
      fontSize: 16,
      color: Colors.dark,
    },
    subText: {
      fontFamily: 'Sora-Regular',
      color: Colors.gray,
      fontSize: 12,
    },
    quantityContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 15,
      marginHorizontal:20,
    },
    // icon: {
    //   width: 24,
    //   height: 24,
    //   borderRadius: 15,
    //   backgroundColor: 'white',
    //   justifyContent:'center',
    //   alignItems:'center',
    //   elevation:1,

    // },
    iconText: {
      fontFamily: 'Sora-Regular',
      fontSize: 14,
      color: Colors.dark,
    },
    quantityText: {
      fontFamily: 'Sora-SemiBold',
      fontSize: 16,
      color: Colors.dark,
    },
  });
  
