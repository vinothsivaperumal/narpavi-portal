import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const payments = [
  { id: '1', description: 'Batch 3 - Course Fee', amount: '$1,500', status: 'Completed', date: '2024-01-05' },
  { id: '2', description: 'Lab Access Fee', amount: '$200', status: 'Completed', date: '2024-01-06' },
  { id: '3', description: 'Remaining Balance', amount: '$500', status: 'Pending', date: '2024-01-15' },
];

export default function PaymentsScreen() {
  const handlePayment = () => {
    Alert.alert(
      'Make Payment',
      'You will be redirected to Square for secure payment processing.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Proceed', onPress: () => Alert.alert('Success', 'Payment initiated via Square SDK') },
      ],
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Payments</Text>
        <Text style={styles.headerSubtitle}>Powered by Square</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.summaryRow}>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>$2,200</Text>
            <Text style={styles.summaryLabel}>Paid</Text>
          </View>
          <View style={[styles.summaryCard, styles.dueCard]}>
            <Text style={[styles.summaryValue, { color: '#dc2626' }]}>$500</Text>
            <Text style={styles.summaryLabel}>Due</Text>
          </View>
          <View style={styles.summaryCard}>
            <Text style={styles.summaryValue}>$2,700</Text>
            <Text style={styles.summaryLabel}>Total</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
          <Text style={styles.payButtonText}>💳  Pay $500 Balance</Text>
        </TouchableOpacity>

        <Text style={styles.sectionTitle}>Payment History</Text>
        {payments.map((payment) => (
          <View key={payment.id} style={styles.paymentCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentDesc}>{payment.description}</Text>
              <Text style={styles.paymentDate}>{payment.date}</Text>
            </View>
            <View style={styles.paymentRight}>
              <Text style={styles.paymentAmount}>{payment.amount}</Text>
              <View style={[styles.badge, payment.status === 'Completed' ? styles.badgeGreen : styles.badgeYellow]}>
                <Text style={[styles.badgeText, payment.status === 'Completed' ? styles.badgeTextGreen : styles.badgeTextYellow]}>
                  {payment.status}
                </Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1d4ed8', paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#bfdbfe', fontSize: 13, marginTop: 2 },
  content: { padding: 16 },
  summaryRow: { flexDirection: 'row', gap: 12, marginBottom: 16 },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  dueCard: {},
  summaryValue: { fontSize: 18, fontWeight: 'bold', color: '#111827' },
  summaryLabel: { fontSize: 12, color: '#6b7280', marginTop: 4 },
  payButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  payButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  paymentCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  paymentDesc: { fontSize: 14, fontWeight: '500', color: '#111827' },
  paymentDate: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  paymentRight: { alignItems: 'flex-end', gap: 6 },
  paymentAmount: { fontSize: 15, fontWeight: '700', color: '#111827' },
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12 },
  badgeGreen: { backgroundColor: '#d1fae5' },
  badgeYellow: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextGreen: { color: '#065f46' },
  badgeTextYellow: { color: '#92400e' },
});
