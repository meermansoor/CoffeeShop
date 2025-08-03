import { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Colors from '../assets/Colors/colors';

export default function DetailScreen() {
  const route = useRoute();
  const product = route.params;

  const navigation = useNavigation();
  const [sizeSelected, setSizeSelected] = useState('s');
  const [expanded, setExpanded] = useState(false);

  
  
  const toggleExpanded = () => setExpanded(!expanded);

  const longDescription =
    'This is a luxurious blend crafted from premium Arabica beans, delicately roasted and paired with creamy milk and deep chocolate or espresso tones. It’s an ideal choice whether you enjoy it hot or iced. Perfect for cozy mornings, afternoon pick-me-ups, or evening relaxation. Sip and savor the rich notes with every cup.';

  const products = [
    {
      id: '1',
      name: 'Caffe Mocha',
      description: 'Deep Foam',
      price: 4.53,
      rating: 4.8,
    },
    {
      id: '2',
      name: 'Flat White',
      description: 'Espresso',
      price: 3.53,
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Mocha Fusi',
      description: 'Ice/Hot',
      price: 7.53,
      rating: 4.8,
    },
    {
      id: '4',
      name: 'Caffe Panna',
      description: 'Ice/Hot',
      price: 5.53,
      rating: 4.9,
    },
  ];


  function buyButtonHandler(){
    return navigation.navigate('OrderScreen')
  }


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <FontAwesome6 name="angle-left" color={'black'} size={24} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Detail</Text>
        <TouchableOpacity>
          <FontAwesome6 name="heart" color={'black'} size={24} />
        </TouchableOpacity>
      </View>
      <Image
        source={require('../assets/images/productImages/pimage.jpg')}
        style={styles.image}
      />
      <View style={styles.nameContainer}>
        <View style={styles.DetailText}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.type}>Ice / Hot </Text>
          <View style={styles.ratingConatiner}>
            <Image
              source={require('../assets/images/star-icon.png')}
              style={styles.ratingIcon}
            />
            <Text style={styles.ratingText}>{product.rating}</Text>
            <Text style={styles.reviewCount}>(200)</Text>
          </View>
        </View>
        <View style={styles.iconContainer}>
          <Image
            source={require('../assets/images/bike.png')}
            style={styles.deliveryIcons}
          />
          <Image
            source={require('../assets/images/milk.png')}
            style={styles.deliveryIcons}
          />
          <Image
            source={require('../assets/images/bean.png')}
            style={styles.deliveryIcons}
          />
        </View>
      </View>
      <View style={styles.descriptionContainer}>
        <View
          style={{
            height: 2,
            backgroundColor: '#ccc',
            marginVertical: 10,
            width: '90%',
            alignSelf: 'center',
          }}
        />
        <Text style={styles.descriptionTitle}>Description</Text>

        <Text
          style={{
            fontFamily: 'Sora-Regular',
            color: Colors.gray,
            marginTop: 10,
          }}
          numberOfLines={expanded ? undefined : 3}
        >
          {longDescription}
        </Text>

        <Text
          onPress={toggleExpanded}
          style={{
            color: Colors.primary,
            fontFamily: 'Sora-SemiBold',
            marginTop: 5,
          }}
        >
          {expanded ? 'Show less' : 'Read more'}
        </Text>
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={[styles.descriptionTitle]}>Size</Text>
        <View style={styles.sizeContainer}>
          {['s', 'm', 'l'].map(size => (
            <TouchableOpacity
              key={size}
              onPress={() => setSizeSelected(size)}
              style={[
                styles.sizeButton,
                sizeSelected === size && styles.sizeButtonSelected,
              ]}
            >
              <Text
                style={[
                  styles.sizeText,
                  sizeSelected === size && styles.sizeTextSelected,
                ]}
              >
                {size.toUpperCase()}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <View style={styles.footer}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceTitle}>Price</Text>
          <Text style={styles.price}>${product.price}</Text>
        </View>
        <TouchableOpacity style={styles.buyButton} onPress={buyButtonHandler}>
          <Text style={styles.buttonText}> Buy Now</Text>
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
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  headerText: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
  },
  image: {
    width: '93%',
    height: 250,
    borderRadius: 20,
    alignSelf: 'center',
  },
  nameContainer: {
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  iconContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  DetailText: {
    marginHorizontal: 20,
    padding: 5,
  },
  ratingIcon: {
    width: 30,
    height: 30,
    marginTop: 10,
  },
  name: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 20,
  },
  type: {
    fontFamily: 'Sora-Regular',
    color: Colors.gray,
  },
  deliveryIcons: {
    width: 30,
    height: 30,
  },
  ratingConatiner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
    marginLeft: 5,
    marginTop: 10,
  },
  reviewCount: {
    fontFamily: 'Sora-Regular',
    marginLeft: 3,
    color: Colors.gray,
    textAlign: 'center',
    marginTop: 10,
  },
  descriptionContainer: {
    marginHorizontal: 20,
    marginVertical: 5,
  },
  descriptionTitle: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 15,
  },
  sizeContainer: {
    flexDirection: 'row',
    marginVertical: 15,
    justifyContent: 'center',
  },
  sizeButton: {
    width: 96,
    height: 41,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.gray,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  sizeText: {
    fontFamily: 'Sora-Regular',
  },
  sizeButtonSelected: {
    backgroundColor: 'rgba(198, 124, 78, 0.3)',
    borderColor: Colors.primary,
  },

  sizeTextSelected: {
    color: 'rgba(198, 124, 78, 1)',
    fontFamily: 'Sora-SemiBold',
  },

  footer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginTop: 20,
    padding: 20,
    gap: 10,
    borderTopRightRadius: 16,
    borderTopLeftRadius: 16,
    elevation: 4,
  },

  priceTitle: {
    fontFamily: 'Sora-Regular',
    fontSize: 16,
    color: Colors.gray,
    marginVertical: 1,
  },
  price: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 18,
    color: Colors.primary,
  },
  buyButton: {
    width: '65%',
    height: 57,
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 16,
  },
  buttonText: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    textAlignVertical: 'center',
  },
});
