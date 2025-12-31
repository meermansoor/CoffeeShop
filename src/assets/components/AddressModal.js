import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors/colors';
import { useDispatch, useSelector } from 'react-redux';
import { setAddress } from '../../redux/slices/userSlice';

const AddressModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();

  const initialAddress = useSelector(state => state.user.address);

  const [address, setAddressState] = useState({
    line1: '',
    line2: '',
    city: '',
    province: '',
    postalCode: '',
    country: '',
  });

  // Prefill inputs when modal opens
  useEffect(() => {
    if (visible && initialAddress) {
      setAddressState(initialAddress);
    }
  }, [visible, initialAddress]);

  const updateField = (key, value) => {
    setAddressState(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const updateAddressHandler = () => {
    dispatch(setAddress(address));
    onClose();
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity style={styles.overlay} activeOpacity={1} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons name="chevron-back" size={24} color={Colors.dark} />
            <Text style={styles.title}>Enter Address</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={20} color="#D8D8D8" />
            </TouchableOpacity>
          </View>

          <Input
            placeholder="Address line"
            value={address.line1}
            onChangeText={text => updateField('line1', text)}
          />

          <Input
            placeholder="Postal Code"
            value={address.postalCode}
            keyboardType="number-pad"
            onChangeText={text => updateField('postalCode', text)}
          />

          <Input
            placeholder="City"
            value={address.city}
            onChangeText={text => updateField('city', text)}
          />

          <Input
            placeholder="Province / State"
            value={address.province}
            onChangeText={text => updateField('province', text)}
          />

          <Input
            placeholder="Country"
            value={address.country}
            onChangeText={text => updateField('country', text)}
          />

          <TouchableOpacity style={styles.button} onPress={updateAddressHandler}>
            <Text style={styles.buttonText}>Update Address</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const Input = ({ value, onChangeText, placeholder, keyboardType = 'default' }) => (
  <View style={styles.inputFields}>
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      keyboardType={keyboardType}
      placeholderTextColor={Colors.gray}
    />
    <Ionicons name="location-sharp" size={20} color={Colors.gray} />
  </View>
);

export default AddressModal;


const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
    alignItems:'center'
  },
  buttonText: {
    fontFamily: 'Sora-SemiBold',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },

  button: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 19,
    paddingHorizontal: 16,
    marginTop: 10,
    marginHorizontal: 5,
  },
  container: {
    width: '100%',
    minHeight: '70%',
    marginTop: 50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },

  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    fontFamily: 'Sora-Bold',
  },
  inputFields: {
    alignSelf: 'center',
    width: '95%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 50,

    paddingHorizontal: 10,
    fontSize: 16,
  },
});
