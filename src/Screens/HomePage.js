import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
  ScrollView,
  Dimensions
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../assets/Colors/colors';
import { useEffect, useState } from 'react';
import ProductTile from '../assets/components/ProductDisplayTile';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const FIRST_BOX_HEIGHT = height * 0.3;
const SECOND_BOX_TOP = FIRST_BOX_HEIGHT;

function HomePage() {
  // const [products, setProducts] = useState();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    if (!user.isLoggedIn) {
      navigation.replace('LoginPage');
    }
  }, [user.isLoggedIn, navigation]);



  // useEffect(() => {
  //   fetch('https://<your-database-name>.firebaseio.com/products.json')
  //     .then((response) => response.json())
  //     .then((data) => {
  //       const loadedProducts = Object.keys(data).map((key) => ({
  //         id: key,
  //         ...data[key],
  //       }));
  //       setProducts(loadedProducts);
  //     })
  //     .catch((error) => console.error('Error fetching products:', error));
  // }, []);
  const products = [
    {
      id: '1',
      name: 'Caffe Mocha',
      description: 'Deep Foam',
      price: 4.53,
      rating: 4.8,
      category: 'Coffee',
    },
    {
      id: '2',
      name: 'Flat White',
      description: 'Espresso',
      price: 3.53,
      rating: 4.8,
      category: 'Coffee',
    },
    {
      id: '3',
      name: 'Mocha Fusi',
      description: 'Ice/Hot',
      price: 7.53,
      rating: 4.8,
      category: 'Coffee',
    },
    {
      id: '4',
      name: 'Caffe Panna',
      description: 'Ice/Hot',
      price: 5.53,
      rating: 4.9,
      category: 'Coffee',
    },
    {
      id: '5',
      name: 'Green Tea',
      description: 'Refreshing',
      price: 2.99,
      rating: 4.5,
      category: 'Tea',
    },
    {
      id: '6',
      name: 'Earl Grey',
      description: 'Classic Blend',
      price: 3.25,
      rating: 4.7,
      category: 'Tea',
    },
    {
      id: '7',
      name: 'Orange Juice',
      description: 'Fresh Squeezed',
      price: 4.99,
      rating: 4.6,
      category: 'Juice',
    },
    {
      id: '8',
      name: 'Chocolate Cake',
      description: 'Rich & Moist',
      price: 6.99,
      rating: 4.9,
      category: 'Cake',
    },
    {
      id: '9',
      name: 'Vanilla Ice Cream',
      description: 'Creamy Delight',
      price: 3.99,
      rating: 4.4,
      category: 'Ice Cream',
    },
    {
      id: '10',
      name: 'Americano',
      description: 'Strong & Bold',
      price: 3.99,
      rating: 4.6,
      category: 'Coffee',
    },
    {
      id: '11',
      name: 'Cappuccino',
      description: 'Perfect Balance',
      price: 4.25,
      rating: 4.7,
      category: 'Coffee',
    },
    {
      id: '12',
      name: 'Chamomile Tea',
      description: 'Calming Herbs',
      price: 2.75,
      rating: 4.3,
      category: 'Tea',
    },
  ];

  const getCategoryName = (categoryId) => {
    const categoryMap = {
      '1': 'Coffee',
      '2': 'Tea',
      '3': 'Juice',
      '4': 'Cake',
      '5': 'Ice Cream',
    };
    return categoryMap[categoryId] || 'Coffee';
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = product.category === getCategoryName(selectedCategory);
    const matchesSearch = searchText.trim() === '' || 
      product.name.toLowerCase().includes(searchText.toLowerCase()) ||
      product.description.toLowerCase().includes(searchText.toLowerCase());
    
    return matchesCategory && matchesSearch;
  });


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
    <ScrollView 
      style={styles.scrollView}
      contentContainerStyle={styles.scrollViewContent}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.background}>
        <View style={styles.SecondBox} />
      </View>
      <View style={styles.container}>
        <View style={styles.FirstBox} />
        <View style={styles.locationContainer}>
          <View style={styles.locationLeft}>
            <Text style={styles.locationText}>Location</Text>
            <TouchableOpacity style={styles.locationButton}>
              <Text style={styles.locationButtonText}>New York</Text>
              <Ionicons name="chevron-down" size={20} color="#D8D8D8" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name || 'Guest'}</Text>
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={() => dispatch(logout())}
            >
              <Ionicons name="log-out-outline" size={20} color="#D8D8D8" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.searchContainer}>
          <View style={styles.input}>
            <Ionicons name="search" size={24} color="#D8D8D8" />
            <TextInput 
              placeholder="Search for Coffee" 
              placeholderTextColor={'#D8D8D8'} 
              inputMode='search' 
              keyboardType='search'
              style={{color: '#D8D8D8'}}
              value={searchText}
              onChangeText={setSearchText}
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#D8D8D8" />
              </TouchableOpacity>
            )}
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

        <View style={styles.coffeeItemsContainer}>
          {filteredProducts.length === 0 ? (
            <View style={styles.noItemsContainer}>
              <Text style={styles.noItemsText}>No items available</Text>
              <Text style={styles.noItemsSubText}>
                {searchText.trim() !== '' 
                  ? `No products found matching "${searchText}" in ${getCategoryName(selectedCategory)}`
                  : `No products found for ${getCategoryName(selectedCategory)}`
                }
              </Text>
            </View>
          ) : (
            <FlatList
              data={filteredProducts}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={{
                gap: 10,
                marginBottom: 10,
                marginHorizontal:10,
              }}
              renderItem={({ item }) => (
                <ProductTile
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  rating={item.rating}
                />
              )}
            />
          )}
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
    zIndex: -2, // Lower z-index to ensure it's behind everything
  },
  FirstBox: {
    backgroundColor: Colors.dark,
    height: FIRST_BOX_HEIGHT, // Fixed pixel height instead of percentage
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1, // Higher than background but lower than content
  },
  SecondBox: {
    backgroundColor: Colors.background,
    height: height - FIRST_BOX_HEIGHT, // Cover remaining height
    width: '100%',
    position: 'absolute',
    top: SECOND_BOX_TOP, // Fixed top position based on FirstBox height
    left: 0,
    right: 0,
    zIndex: -1, // Higher than background but lower than content
  },
  container: {
    flex: 1,
    minHeight: '100%',
    position: 'relative',
    height: '100%', // Fixed height to prevent changes
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
    zIndex: 1, // Ensure content is above background
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  locationLeft: {
    flex: 1,
  },
  userInfo: {
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  userName: {
    color: '#D8D8D8',
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    marginBottom: 5,
    textAlign: 'right',
  },
  logoutButton: {
    padding: 5,
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
    zIndex: 1, // Ensure content is above background
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
    zIndex: 1, // Ensure content is above background
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
    zIndex: 1, // Ensure content is above background
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
  noItemsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
    minHeight: 300,
  },
  noItemsText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.dark,
    marginBottom: 10,
  },
  noItemsSubText: {
    fontSize: 14,
    color: '#A2A2A2',
    textAlign: 'center',
  },
  coffeeItemsContainer: {
    minHeight: 400,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1, // Ensure content is above background
  },
  scrollView: {
    flex: 1,
    zIndex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    position: 'relative',
    zIndex: 1,
  },

});
