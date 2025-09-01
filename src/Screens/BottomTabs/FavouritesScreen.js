import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import ProductTile from '../../assets/components/ProductDisplayTile';

const FavouritesScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const favouriteItems = useSelector(state => state.favourites.favouriteItems);

  // Debug logging
  useEffect(() => {
    console.log('FavouritesScreen - Total favourites:', favouriteItems.length);
    console.log('FavouritesScreen - Favourite items:', favouriteItems);
  }, [favouriteItems]);

  const renderFavouriteItem = ({ item }) => (
    <ProductTile
      id={item.id}
      name={item.name}
      description={item.description}
      price={item.price}
      rating={item.rating}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome6 name="angle-left" color={'black'} size={24} />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Favourites</Text>
          <Text style={styles.favouritesCount}>{favouriteItems.length} items</Text>
        </View>
        <View />
      </View>
      
      {favouriteItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No favourites yet</Text>
          <Text style={styles.emptySubText}>Add some products to your favourites!</Text>
        </View>
      ) : (
        <FlatList
          data={favouriteItems}
          keyExtractor={(item) => item.id + '_' + item.name}
          numColumns={2}
          columnWrapperStyle={styles.rowContainer}
          renderItem={renderFavouriteItem}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

export default FavouritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 20,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
    textAlign: 'center',
  },
  titleContainer: {
    alignItems: 'center',
  },
  favouritesCount: {
    fontSize: 12,
    fontFamily: 'Sora-Regular',
    color: '#999',
    marginTop: 4,
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  rowContainer: {
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: 'Sora-SemiBold',
    color: '#666',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 14,
    fontFamily: 'Sora-Regular',
    color: '#999',
    textAlign: 'center',
  },
});
