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
import { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialDesignIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Colors from '../assets/Colors/colors';
import ProductTile from '../assets/components/ProductDisplayTile';
import FilterModal from '../assets/components/FilterModal';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/slices/userSlice';
import { getCurrentLocation, getAddressFromCoordinates } from '../firebase/GeoCode';
import { useNavigation } from '@react-navigation/native';
import AlertModal from '../assets/components/AlertModal';
import firestore from '@react-native-firebase/firestore';
import { addProduct, addProducts } from '../redux/slices/productSlice';



const { width, height } = Dimensions.get('window');
const FIRST_BOX_HEIGHT = height * 0.3;
const SECOND_BOX_TOP = FIRST_BOX_HEIGHT;

function HomePage() {
  const [addressLoc, setAddressLoc] = useState();
  const [productsData, setProductsData] = useState();
  const [selectedCategory, setSelectedCategory] = useState('1');
  const [searchText, setSearchText] = useState('');
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [filters, setFilters] = useState({ minPrice: null, maxPrice: null, minRating: null, targetRating: null });
  const [showAlert, setShowAlert] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector(state => state.user);
  const navigation = useNavigation();


  useEffect(() => {
    if (!user.isLoggedIn) {
      navigation.replace('LoginPage');
    }
  }, [user.isLoggedIn, navigation]);

  useEffect(() => {

  const handleGetLocation = async () => {
    try {
      const { latitude, longitude } = await getCurrentLocation();
      const address = await getAddressFromCoordinates(latitude, longitude);

      setAddressLoc(address);

    } catch (err) {
      console.error(err);
    }
  };
  
    handleGetLocation();
},[])
  



useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snapshot = await firestore()
          .collection('products')
          .get();
  
        const productsList = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
  
        dispatch(addProducts(productsList));
      } catch (err) {
        console.error('Error fetching products:', err);
      } finally {
      }
    };
    
    fetchProducts();
  }, [dispatch]);
  
  
  
  
  const products =  useSelector(state => state.product.items) || [];


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
    const matchesPriceMin =
      filters.minPrice === null || typeof filters.minPrice !== 'number'
        ? true
        : product.price >= filters.minPrice;
    const matchesPriceMax =
      filters.maxPrice === null || typeof filters.maxPrice !== 'number'
        ? true
        : product.price <= filters.maxPrice;
    const matchesRating =
      filters.minRating === null || typeof filters.minRating !== 'number'
        ? true
        : product.rating >= filters.minRating;
    
    return matchesCategory && matchesSearch && matchesPriceMin && matchesPriceMax && matchesRating;
  })
  .sort((a, b) => {
    if (typeof filters.targetRating !== 'number') return 0;
    const da = Math.abs((a.rating || 0) - filters.targetRating);
    const db = Math.abs((b.rating || 0) - filters.targetRating);
    return da - db;
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
            <TouchableOpacity style={styles.locationButton} >
              <Text style={styles.locationButtonText}>{addressLoc}</Text>
              <Ionicons name="chevron-down" size={20} color="#D8D8D8" />
            </TouchableOpacity>
          </View>
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{user.name}</Text>
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
            onPress={() => setIsFilterVisible(true)}
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
              scrollEnabled={false}
              data={filteredProducts}
              keyExtractor={item => item.id}
              numColumns={2}
              columnWrapperStyle={styles.ListWrapper}
              renderItem={({ item }) => (
                <ProductTile
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  rating={item.rating}
                  imageURL={item.imageURL}
                />
              )}
            />
          )}
        </View>
      </View>
      <FilterModal
        visible={isFilterVisible}
        onClose={() => setIsFilterVisible(false)}
        filters={filters}
        onApply={(next) => {
          setFilters(next);
          setIsFilterVisible(false);
        }}
      />
      <AlertModal
        visible ={showAlert}
        onClose={() => setShowAlert(false)}
      />
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
    zIndex: -2, 
  },
  FirstBox: {
    backgroundColor: Colors.dark,
    height: FIRST_BOX_HEIGHT, 
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: -1, 
  },
  SecondBox: {
    backgroundColor: Colors.background,
    height: height - FIRST_BOX_HEIGHT, 
    width: '100%',
    position: 'absolute',
    top: SECOND_BOX_TOP, 
    left: 0,
    right: 0,
    zIndex: -1, 
  },
  container: {
    flex: 1,
    minHeight: '100%',
    position: 'relative',
    height: '100%', 
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
    zIndex: 1, 
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
    zIndex: 1, 
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
    zIndex: 1, 
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
    zIndex: 1, 
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
    zIndex: 1,  
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
  ListWrapper: {
    gap: 10,
    marginBottom: 10,
    marginHorizontal:10,
  },

});
