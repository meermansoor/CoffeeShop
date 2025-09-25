import { StyleSheet, Text, View, Modal, TouchableOpacity, TextInput } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../Colors/colors'

const FilterModal = ({ visible, onClose, filters, onApply }) => {
  const [minPrice, setMinPrice] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const [minRating, setMinRating] = useState('')
  const [targetRating, setTargetRating] = useState(null)

  useEffect(() => {
    if (!visible) return
    setMinPrice(
      filters?.minPrice !== null && filters?.minPrice !== undefined
        ? String(filters.minPrice)
        : ''
    )
    setMaxPrice(
      filters?.maxPrice !== null && filters?.maxPrice !== undefined
        ? String(filters.maxPrice)
        : ''
    )
    setMinRating(
      filters?.minRating !== null && filters?.minRating !== undefined
        ? String(filters.minRating)
        : ''
    )
    setTargetRating(
      typeof filters?.targetRating === 'number' ? filters.targetRating : null
    )
  }, [visible, filters])

  const handleApply = () => {
    const next = {
      minPrice: minPrice.trim() === '' ? null : Number(minPrice),
      maxPrice: maxPrice.trim() === '' ? null : Number(maxPrice),
      minRating: minRating.trim() === '' ? null : Number(minRating),
      targetRating: typeof targetRating === 'number' ? targetRating : null,
    }
    onApply?.(next)
  }

  const handleReset = () => {
    setMinPrice('')
    setMaxPrice('')
    setMinRating('')
    onApply?.({ minPrice: null, maxPrice: null, minRating: null })
  }

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.backdrop}>
        <View style={styles.card}>
          <Text style={styles.title}>Filters</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Price range</Text>
            <View style={styles.row}>
              <TextInput
                style={styles.input}
                placeholder="Min"
                keyboardType="numeric"
                value={minPrice}
                onChangeText={setMinPrice}
                placeholderTextColor="#888"
              />
              <Text style={styles.toText}>to</Text>
              <TextInput
                style={styles.input}
                placeholder="Max"
                keyboardType="numeric"
                value={maxPrice}
                onChangeText={setMaxPrice}
                placeholderTextColor="#888"
              />
            </View>
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Minimum rating</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. 4.5"
              keyboardType="numeric"
              value={minRating}
              onChangeText={setMinRating}
              placeholderTextColor="#888"
            />
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>Pick rating (closest first)</Text>
            <View style={styles.starsRow}>
              {[1,2,3,4,5].map((value) => (
                <TouchableOpacity key={value} onPress={() => setTargetRating(value)}>
                  <Ionicons
                    name={(targetRating || 0) >= value ? 'star' : 'star-outline'}
                    size={28}
                    color={Colors.primary}
                  />
                </TouchableOpacity>
              ))}
              {typeof targetRating === 'number' && (
                <Text style={styles.starLabel}>{targetRating}.0</Text>
              )}
            </View>
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity style={[styles.button, styles.reset]} onPress={handleReset}>
              <Text style={styles.resetText}>Reset</Text>
            </TouchableOpacity>
            <View style={{ width: 10 }} />
            <TouchableOpacity style={[styles.button, styles.apply]} onPress={handleApply}>
              <Text style={styles.applyText}>Apply</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.closeArea} onPress={onClose}>
            <Text style={styles.closeText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

export default FilterModal

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  card: {
    backgroundColor: '#111',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 24,
  },
  title: {
    color: '#fff',
    fontFamily: 'Sora-Bold',
    fontSize: 18,
    marginBottom: 12,
  },
  fieldGroup: {
    marginBottom: 14,
  },
  label: {
    color: '#bbb',
    fontFamily: 'Sora-Regular',
    fontSize: 12,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#2A2A2A',
    paddingHorizontal: 12,
    color: '#D8D8D8',
    fontFamily: 'Sora-Regular',
  },
  toText: {
    color: '#bbb',
    marginHorizontal: 8,
    fontFamily: 'Sora-Regular',
  },
  buttonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  button: {
    flex: 1,
    height: 48,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reset: {
    backgroundColor: '#2A2A2A',
  },
  apply: {
    backgroundColor: Colors.primary,
  },
  resetText: {
    color: '#ddd',
    fontFamily: 'Sora-SemiBold',
  },
  applyText: {
    color: '#111',
    fontFamily: 'Sora-SemiBold',
  },
  closeArea: {
    marginTop: 10,
    alignItems: 'center',
  },
  closeText: {
    color: '#999',
    fontFamily: 'Sora-Regular',
    fontSize: 12,
  },
  starsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  starLabel: {
    marginLeft: 8,
    color: '#ddd',
    fontFamily: 'Sora-SemiBold',
  },
})