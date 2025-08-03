import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../assets/Colors/colors';
import { useState } from 'react';
import ProductTile from '../assets/components/ProductDisplayTile';

function HomePage() {
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
      rating:4.9
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState('1');

  const handleCategoryPress = categoryId => {
    setSelectedCategory(categoryId);
  };

  const renderCategoryItem = item => {
    return (
      <TouchableOpacity
        key={item.id}
        style={[
          styles.categoryItem,
          item.id === selectedCategory && { backgroundColor: Colors.primary },
        ]}
        onPress={() => handleCategoryPress(item.id)}
      >
        <Text
          style={[
            styles.categoryItemText,
            item.id === selectedCategory && { color: Colors.background },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView>
      <View style={styles.background}>
        <View style={styles.SecondBox} />
      </View>
      <View style={styles.container}>
        <View style={styles.FirstBox} />
        <View style={styles.locationContainer}>
          <Text style={styles.locationText}>Location</Text>
          <TouchableOpacity style={styles.locationButton}>
            <Text style={styles.locationButtonText}>New York</Text>
            <Ionicons name="chevron-down" size={20} color="#D8D8D8" />
          </TouchableOpacity>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.input}>
            <Ionicons name="search" size={24} color="#D8D8D8" />
            <TextInput placeholder="Search for Coffee" />
          </View>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => console.log('hello motherfuckers')}
          >
            <MaterialDesignIcons name="tune-variant" size={24} color="#D8D8D8" />
          </TouchableOpacity>
        </View>
        <View style={styles.promoContainer}>
          <Image
            source={require('../assets/images/promo.png')}
            style={styles.promoImage}
          />
        </View>
        <View style={styles.categoryContainer}>
          <FlatList
            data={[
              { id: '1', name: 'Coffee' },
              { id: '2', name: 'Tea' },
              { id: '3', name: 'Juice' },
              { id: '4', name: 'Cake' },
              { id: '5', name: 'Ice Cream' },
            ]}
            renderItem={({ item }) => renderCategoryItem(item)}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={{ gap: 12 }}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <View sytle={styles.coffeeItemsContainer}>
          <FlatList
            data={products}
            keyExtractor={item => item.id}
            numColumns={2}
            columnWrapperStyle={{
              marginBottom: 10,
              marginHorizontal:20,
            }}
            renderItem={({ item }) => (
              <ProductTile
                name={item.name}
                description={item.description}
                price={item.price}
                rating={item.rating}
              />
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}

export default HomePage;

const styles = StyleSheet.create({
  background: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: -1,
  },
  FirstBox: {
    backgroundColor: Colors.dark,
    height: '30%',
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 0,
  },
  SecondBox: {
    backgroundColor: Colors.background,
    height: '70%',
    width: '100%',
    position: 'absolute',
    top: '30%',
    left: 0,
    right: 0,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: Colors.dark,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: Colors.dark,
  },
  locationContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  locationText: {
    color: '#A2A2A2',
    fontSize: 12,
    fontFamily: 'Sora-Regular',
    marginBottom: 5,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationButtonText: {
    color: '#D8D8D8',
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    marginRight: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  filterButton: {
    height: 52,
    width: 52,
    alignItems: 'center',
    justifyContent:'center',
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 10,
    marginLeft: 10,
  },
  filterText: {
    color: Colors.background,
    fontSize: 12,
    fontFamily: 'Sora-Regular',
  },
  input: {
    flex: 1,
    height: 52,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  promoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 10,
    marginHorizontal: 20,
  },
  promoImage: {
    width: '100%',
    height: 140,
    borderRadius: 16,
    marginTop: 10,
    marginHorizontal: 10,
  },
  categoryContainer: {
    marginTop: 10,
    marginHorizontal: 30,
  },
  categoryItem: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.background,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
  },
  categoryItemText: {
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    color: Colors.dark,
    textAlign: 'center',
  },
  selectedCategoryItem: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    marginRight: 10,
  },
  selectedCategoryItemText: {
    color: Colors.background,
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
  },
});
