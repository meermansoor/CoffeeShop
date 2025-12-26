import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Colors from '../Colors/colors';

const AlertModal = ({
  visible = false,
  onClose = () => {},
  title = 'Alert',
  message = '',
  icon = 'checkmark-circle',
  iconColor = Colors.primary,
  autoClose = true,
  duration = 1500,
}) => {
  useEffect(() => {
    if (!visible || !autoClose) return;

    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [visible, autoClose, duration, onClose]);

  if (!visible) return null;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Ionicons name={icon} size={52} color={iconColor} />

          <Text style={styles.title}>{title}</Text>

          {message ? (
            <Text style={styles.message}>{message}</Text>
          ) : null}

          {!autoClose && (
            <TouchableOpacity style={styles.button} onPress={onClose}>
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default AlertModal;

  

const styles = StyleSheet.create({
    backdrop: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
    },
    card: {
      width: '80%',
      backgroundColor: '#111',
      borderRadius: 16,
      padding: 24,
      alignItems: 'center',
    },
    title: {
      marginTop: 12,
      fontSize: 16,
      color: '#fff',
      fontFamily: 'Sora-Bold',
    },
    message: {
      marginTop: 6,
      textAlign: 'center',
      color: '#bbb',
      fontFamily: 'Sora-Regular',
      fontSize: 13,
    },
    button: {
      marginTop: 16,
      backgroundColor: Colors.primary,
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 26,
    },
    buttonText: {
      color: '#111',
      fontFamily: 'Sora-SemiBold',
    },
  });
  
