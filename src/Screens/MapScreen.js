import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Animated,
  Image,
} from 'react-native';
import React, { useState, useRef } from 'react';
import MapView, { PROVIDER_GOOGLE, MAP_TYPES } from 'react-native-maps';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import BikeIcon from '../assets/images/svg/bike.svg';
import Colors from '../assets/Colors/colors';

const MapScreen = () => {
  const navigation = useNavigation();
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(120)).current;

  const toggleExpansion = () => {
    const toValue = isExpanded ? 120 : 320;

    Animated.timing(animatedHeight, {
      toValue,
      duration: 300,
      useNativeDriver: false,
    }).start();

    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        mapPadding={{ top: 20, bottom: 20, left: 20, right: 20 }}
        mapType={MAP_TYPES.STANDARD}
        initialRegion={{
          latitude: 19.076,
          longitude: 72.8777,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        showsUserLocation={true}
        showsMyLocationButton={true}
        showsCompass={true}
        showsPointsOfInterest={true}
      />

      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.backButton}
      >
        <FontAwesome6 name="angle-left" color={'black'} size={20} />
      </TouchableOpacity>

      {/* <TouchableOpacity
        style={styles.rightButton}
      >
        <FontAwesome6 name="angle-right" color={'black'} size={20} />
      </TouchableOpacity> */}
      <Animated.View
        style={[styles.etaAddressContainer, { height: animatedHeight }]}
      >
        <View style={styles.dragHandle} />

        <TouchableOpacity
          onPress={toggleExpansion}
          style={styles.etaAddressContent}
          activeOpacity={0.8}
        >
          <View style={styles.mainInfo}>
            <Text style={styles.etaText}>10 minutes left</Text>
            <Text style={styles.addressText}>Delivery to Jl. Kpg Sutoyo</Text>

            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={styles.progressFilled} />
                <View style={styles.progressFilled} />
                <View style={styles.progressEmpty} />
                <View style={styles.progressEmpty} />
              </View>
            </View>
          </View>

          <FontAwesome6
            name={isExpanded ? 'chevron-down' : 'chevron-up'}
            color="#666"
            size={14}
            style={styles.expandIcon}
          />
        </TouchableOpacity>

        {isExpanded && (
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.scrollViewContainer}
            contentContainerStyle={styles.scrollViewContent}
          >
            <View style={styles.expandedContent}>
              {/* Delivery Status Card */}
              <View style={styles.deliveryCard}>
                <View style={styles.deliveryIconContainer}>
                  <BikeIcon width={44} height={44} />
                </View>
                <View style={styles.deliveryTextContainer}>
                  <Text style={styles.deliveryTitle}>Delivered your order</Text>
                  <Text style={styles.deliveryDescription}>
                    We will deliver your goods to you in the shortest possible
                    time.
                  </Text>
                </View>
              </View>

              <View style={styles.driverCard}>
                <View style={styles.driverProfile}>
                  <View style={styles.profilePicture}>
                    <Image
                      source={require('../assets/images/driver.png')}
                      style={styles.profilePicture}
                    />
                  </View>
                  <View style={styles.driverInfo}>
                    <Text style={styles.driverName}>Brooklyn Simmons</Text>
                    <Text style={styles.driverRole}>Personal Courier</Text>
                  </View>
                </View>
                <TouchableOpacity style={styles.contactButton}>
                  <FontAwesome6 name="phone" color="white" size={16} />
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        )}
      </Animated.View>
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  backButton: {
    position: 'absolute',
    width: 45,
    height: 45,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    top: 25,
    left: 20,
  },
  rightButton: {
    position: 'absolute',
    right: 20,
    top: 25,
    width: 45,
    height: 45,
    borderRadius: 12,
    padding: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
  },
  etaAddressContainer: {
    position: 'absolute',
    width: '100%',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 10,
  },
  etaAddressContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  etaText: {
    fontSize: 16,
    fontFamily: 'Sora-Bold',
    marginLeft: 5,
    textAlign: 'center',
  },
  addressText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
    textAlign: 'center',
    fontFamily: 'Sora-Regular',
  },
  expandIcon: {
    marginLeft: 10,
  },
  dragHandle: {
    width: 45,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 2.5,
    alignSelf: 'center',
    marginBottom: 10,
  },
  mainInfo: {
    flex: 1,
  },
  progressContainer: {
    marginTop: 10,
    width: '100%',
    alignSelf: 'center',
  },
  progressBar: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    gap: 4,
  },
  progressFilled: {
    flex: 1,
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressEmpty: {
    flex: 1,
    height: '100%',
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
  },
  deliveryCard: {
    flexDirection: 'row',
    height: 77,
    paddingVertical: 8,
    paddingRight: 10,
    paddingLeft: 12,
    borderColor: Colors.gray,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 15,
    alignItems: 'center',
  },
  deliveryIconContainer: {
    height: 56,
    width: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
  },
  deliveryTextContainer: {
    flex: 1,
  },
  deliveryTitle: {
    fontSize: 14,
    fontFamily: 'Sora-SemiBold',
    color: Colors.dark,
    marginBottom: 5,
  },
  deliveryDescription: {
    fontSize: 12,
    color: Colors.gray,
    fontFamily: 'Sora-Light',
  },
  driverCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '100%',
  },
  driverProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  profilePicture: {
    width: 56,
    height: 56,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  driverInfo: {
    flex: 1,
  },
  driverName: {
    fontSize: 16,
    fontFamily: 'Sora-Bold',
  },
  driverRole: {
    fontSize: 14,
    color: '#666',
    fontFamily: 'Sora-Regular',
  },
  contactButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  expandedContent: {
    width: '100%',
    paddingTop: 15,
    paddingHorizontal: 10,
  },
  scrollViewContainer: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
});
