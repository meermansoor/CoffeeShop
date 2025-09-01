// import React, { useEffect, useState } from 'react';
// import { StyleSheet, View, Platform, PermissionsAndroid } from 'react-native';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import Geolocation from 'react-native-geolocation-service';

// export default function MapScreen() {

//   const [location, setLocation] = useState(null);

//   useEffect(() => {
//     requestLocationPermission();
//     requestPermission();
//   }, []);

//   const requestPermission = async () => {
//     if (Platform.OS === 'android') {
//       const granted = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//       );
//       if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//         console.log('Location permission denied');
//         return;
//       }
//     }
//     Geolocation.getCurrentPosition(
//       pos => setLocation(pos.coords),
//       err => console.warn(err),
//       { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 },
//     );
//   };

//   const requestLocationPermission = async () => {
//     if (Platform.OS === 'android') {
//       try {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           {
//             title: 'Location Permission',
//             message: 'This app needs access to your location',
//             buttonNeutral: 'Ask Me Later',
//             buttonNegative: 'Cancel',
//             buttonPositive: 'OK',
//           },
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           console.log('Location permission denied');
//         }
//       } catch (err) {
//         console.warn(err);
//       }
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <MapView
//         provider={PROVIDER_GOOGLE}
//         style={styles.map}
//         initialRegion={{
//           latitude: 19.076,
//           longitude: 72.8777,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//         showsUserLocation={true}
//       >
//         {location && (
//           <Marker
//             coordinate={{
//               latitude: location.latitude,
//               longitude: location.longitude,
//             }}/>
//         )}
//       </MapView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });


import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MapView, { PROVIDER_GOOGLE , MAP_TYPES} from 'react-native-maps'


const MapScreen = () => {


  return (
    <>
    <MapView style={styles.map}
    provider={PROVIDER_GOOGLE}
     mapPadding={{top: 20, bottom: 20, left: 20, right: 20}}
     mapType={MAP_TYPES.STANDARD}
     initialRegion={{
      latitude: 19.076,
      longitude: 72.8777,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
    showsUserLocation={true}
    />
    <View style={styles.container}>

    </View>
    </>
  )
}

export default MapScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center',
    zIndex: 1,
  },
  mapContainer: {
    width: '99%',
    height: '100%',
    marginHorizontal: 20,
    
  },
  map: {
    width: '100%',
    height: '100%',
  },

})