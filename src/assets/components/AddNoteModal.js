import {
  Modal,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors/colors';

const AddNote = ({ visible, onClose }) => {
  const [note, setNote] = useState('');

  const submitNoteHandler = () => {
    console.log('Note Submitted:', note);
    onClose();
  };
  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
      style={styles.modal}
    >
      <TouchableOpacity style={styles.overlay} onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.header}>
            <Ionicons name="chevron-back" size={24} color={Colors.dark} />
            <Text style={styles.title}>Add Note</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close-circle" size={20} color="#D8D8D8" />
            </TouchableOpacity>
          </View>

          <View style={styles.inputFields}>
            <TextInput
              placeholder="Enter Text here"
              style={styles.input}
              onChangeText={setNote}
              value={note}
              keyboardType="default"
              keyboardAppearance="dark"
              numberOfLines={4}
              placeholderTextColor={Colors.gray}
            />
          </View>

          <TouchableOpacity style={styles.button} onPress={submitNoteHandler}>
            <Text style={styles.buttonText}>Submit Note</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddNote;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
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
    position: 'absolute',
    left: 20,
    width: '100%',
    minHeight: '40%',
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
    marginVertical: 5,
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
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 10,
  },
  input: {
    flex: 1,
    height: 150,
    textAlignVertical: 'top',
    paddingHorizontal: 10,
    fontSize: 16,
  },
});
