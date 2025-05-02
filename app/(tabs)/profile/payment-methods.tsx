import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { router } from 'expo-router';
import Animated, { FadeIn, FadeInDown } from 'react-native-reanimated';
import { ArrowLeft, Plus, CreditCard, Smartphone } from 'lucide-react-native';

type PaymentMethod = {
  id: string;
  type: 'card' | 'upi';
  details: string;
  isDefault: boolean;
};

export default function PaymentMethodsScreen() {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'card',
      details: '**** **** **** 4242',
      isDefault: true,
    },
    {
      id: '2',
      type: 'upi',
      details: 'user@upi',
      isDefault: false,
    },
  ]);

  const [showAddNew, setShowAddNew] = useState(false);
  const [newMethod, setNewMethod] = useState({
    type: 'card' as 'card' | 'upi',
    details: '',
  });

  const handleSetDefault = (id: string) => {
    setPaymentMethods(methods =>
      methods.map(method => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  };

  const handleDelete = (id: string) => {
    setPaymentMethods(methods => methods.filter(method => method.id !== id));
  };

  const handleAddNew = () => {
    if (newMethod.details.trim()) {
      setPaymentMethods(prev => [
        ...prev,
        {
          id: Date.now().toString(),
          ...newMethod,
          isDefault: false,
        },
      ]);
      setShowAddNew(false);
      setNewMethod({ type: 'card', details: '' });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Animated.View 
        entering={FadeIn.duration(600)}
        style={styles.header}
      >
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ArrowLeft size={24} color="#111827" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Payment Methods</Text>
        <View style={{ width: 40 }} />
      </Animated.View>

      <View style={styles.content}>
        {paymentMethods.map((method, index) => (
          <Animated.View
            key={method.id}
            entering={FadeInDown.duration(600).delay(100 * index)}
            style={styles.methodCard}
          >
            <View style={styles.methodInfo}>
              {method.type === 'card' ? (
                <CreditCard size={24} color="#7E3AF2" />
              ) : (
                <Smartphone size={24} color="#7E3AF2" />
              )}
              <View style={styles.methodDetails}>
                <Text style={styles.methodText}>{method.details}</Text>
                {method.isDefault && (
                  <Text style={styles.defaultText}>Default</Text>
                )}
              </View>
            </View>
            <View style={styles.methodActions}>
              {!method.isDefault && (
                <TouchableOpacity
                  onPress={() => handleSetDefault(method.id)}
                  style={styles.actionButton}
                >
                  <Text style={styles.actionButtonText}>Set Default</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity
                onPress={() => handleDelete(method.id)}
                style={[styles.actionButton, styles.deleteButton]}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ))}

        {showAddNew ? (
          <Animated.View
            entering={FadeInDown.duration(600)}
            style={styles.addNewForm}
          >
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Type</Text>
              <View style={styles.typeButtons}>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newMethod.type === 'card' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewMethod(prev => ({ ...prev, type: 'card' }))}
                >
                  <CreditCard
                    size={20}
                    color={newMethod.type === 'card' ? '#7E3AF2' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newMethod.type === 'card' && styles.typeButtonTextActive,
                    ]}
                  >
                    Card
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[
                    styles.typeButton,
                    newMethod.type === 'upi' && styles.typeButtonActive,
                  ]}
                  onPress={() => setNewMethod(prev => ({ ...prev, type: 'upi' }))}
                >
                  <Smartphone
                    size={20}
                    color={newMethod.type === 'upi' ? '#7E3AF2' : '#64748B'}
                  />
                  <Text
                    style={[
                      styles.typeButtonText,
                      newMethod.type === 'upi' && styles.typeButtonTextActive,
                    ]}
                  >
                    UPI
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                {newMethod.type === 'card' ? 'Card Number' : 'UPI ID'}
              </Text>
              <TextInput
                style={styles.input}
                value={newMethod.details}
                onChangeText={text =>
                  setNewMethod(prev => ({ ...prev, details: text }))
                }
                placeholder={newMethod.type === 'card' ? '1234 5678 9012 3456' : 'user@upi'}
                keyboardType={newMethod.type === 'card' ? 'numeric' : 'email-address'}
              />
            </View>

            <View style={styles.formButtons}>
              <TouchableOpacity
                style={[styles.formButton, styles.cancelButton]}
                onPress={() => setShowAddNew(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.formButton, styles.addButton]}
                onPress={handleAddNew}
              >
                <Text style={styles.addButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        ) : (
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => setShowAddNew(true)}
          >
            <Plus size={20} color="#7E3AF2" />
            <Text style={styles.addButtonText}>Add New Payment Method</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    color: '#111827',
  },
  content: {
    padding: 20,
  },
  methodCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 2,
  },
  methodInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  methodDetails: {
    marginLeft: 12,
    flex: 1,
  },
  methodText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#111827',
  },
  defaultText: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#7E3AF2',
    marginTop: 4,
  },
  methodActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  actionButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#7E3AF2',
  },
  deleteButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  deleteButtonText: {
    color: '#EF4444',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#7E3AF2',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  addButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#7E3AF2',
    marginLeft: 8,
  },
  addNewForm: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginTop: 12,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#4B5563',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    padding: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#111827',
  },
  typeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  typeButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  typeButtonActive: {
    borderColor: '#7E3AF2',
    backgroundColor: 'rgba(126, 58, 242, 0.1)',
  },
  typeButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
    marginLeft: 8,
  },
  typeButtonTextActive: {
    color: '#7E3AF2',
  },
  formButtons: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  formButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#F1F5F9',
  },
  cancelButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#64748B',
  },
})