import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Colors from '../../assets/Colors/colors';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';

export default function NotificationScreen() {
  const navigation = useNavigation();
  const [notificationCount, setNotificationCount] = useState(0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <FontAwesome6 name="angle-left" color={'black'} size={24} />
        </TouchableOpacity>
        <Text style={styles.title}>Notification</Text>
        <View />
      </View>
      {notificationCount > 0 ? (
        <Text style={styles.notificationCount}>
          You have {notificationCount} new notifications
        </Text>
      ) : (
        <Text style={styles.notificationCount}>
          No new notifications available
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    marginTop: 40,
    marginHorizontal: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 16
  },
  title: {
    fontSize: 16,
    fontFamily: 'Sora-SemiBold',
  },
  backButton: {
    padding: 4
  },
  notificationCount: {
    marginHorizontal: 30,
    marginTop: 16,
    fontFamily: 'Sora-Regular',
    fontSize: 14,
    color: Colors.gray,
    textAlign: 'center',
  }
});
