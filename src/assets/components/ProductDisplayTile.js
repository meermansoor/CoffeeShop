import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Colors from '../Colors/colors';
import { useNavigation } from '@react-navigation/native';

export default function ProductTile({
  route,
  name,
  description,
  price,
  rating,
  id,
}) {
  const navigation = useNavigation();

  const ProductTilePress = () => {
    return (
      navigation.navigate('DetailScr', { id: id, name: name ,description: description, price:price, rating:rating, }),
      console.log(`${id} sent`)
    );
  };

  const addButtonPress = () => {
    return console.log('addButton Pressed');
  };

  return (
    <TouchableOpacity style={styles.container} onPress={ProductTilePress}>
      <View style={styles.imageContainer}>
        <View style={styles.ratingContainer}>
          <Image
            style={styles.icon}
            source={require('../images/star-icon.png')}
          />
          <Text style={styles.rating}>{rating}</Text>
        </View>
        <Image
          source={require('../images/productImages/pimage.jpg')}
          style={styles.image}
        />
      </View>
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>${price.toFixed(2)}</Text>
        <TouchableOpacity style={styles.addButton} onPress={addButtonPress}>
          <Text style={{ color: 'white', fontSize: 20 }}> + </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
    padding: 8,
    paddingBottom: 12,
    backgroundColor: 'white',
    marginHorizontal: 5,
    borderRadius: 16,
  },
  imageContainer: {
    height: 128,
    elevation: 4,
  },
  ratingContainer: {
    width: 60,
    height: 30,
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0.45)',
    position: 'absolute',
    alignSelf: 'flex-end',
    justifyContent: 'space-evenly',
    zIndex: 1,
    borderBottomLeftRadius: 27,
    borderTopRightRadius: 10,
    padding: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    fontFamily: 'Sora-SemiBold',
    color: 'black',
  },
  description: {
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    color: '#a2a2a2',
    marginTop: 4,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  price: {
    fontSize: 18,
    color: 'black',
    fontWeight: '',
    marginTop: 8,
    fontFamily: 'Sora-SemiBold',
  },
  addButton: {
    width: 32,
    height: 32,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rating: {
    color: 'white',
    fontFamily: 'Sora-SemiBold',
    textAlign: 'right',
    fontSize: 10,
    marginLeft: 2,
  },
  icon: {
    width: 15,
    height: 15,
    marginTop: 1,
  },
});
