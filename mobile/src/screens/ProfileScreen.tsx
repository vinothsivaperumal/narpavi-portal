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

export default function ProfileScreen({ navigation }: any) {
  const agreements = [
    { id: '1', title: 'Enrollment Agreement', status: 'Signed' },
    { id: '2', title: 'Data Access Policy', status: 'Signed' },
    { id: '3', title: 'Code of Conduct', status: 'Pending' },
  ];

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure you want to logout?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Logout', style: 'destructive', onPress: () => navigation.replace('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JS</Text>
          </View>
          <Text style={styles.name}>Jane Smith</Text>
          <Text style={styles.email}>jane.smith@example.com</Text>
          <Text style={styles.batch}>Batch 3 · Data Analysis Bootcamp</Text>
        </View>

        <Text style={styles.sectionTitle}>Legal Agreements</Text>
        {agreements.map((agreement) => (
          <View key={agreement.id} style={styles.agreementCard}>
            <View style={{ flex: 1 }}>
              <Text style={styles.agreementTitle}>{agreement.title}</Text>
            </View>
            <View style={[styles.badge, agreement.status === 'Signed' ? styles.badgeGreen : styles.badgeYellow]}>
              <Text style={[styles.badgeText, agreement.status === 'Signed' ? styles.badgeTextGreen : styles.badgeTextYellow]}>
                {agreement.status}
              </Text>
            </View>
            {agreement.status === 'Pending' && (
              <TouchableOpacity
                style={styles.signButton}
                onPress={() => Alert.alert('BoldSign', 'Opening document for signature via BoldSign API...')}
              >
                <Text style={styles.signButtonText}>Sign</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1d4ed8', paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  content: { padding: 16 },
  profileCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#1d4ed8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarText: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#111827' },
  email: { fontSize: 14, color: '#6b7280', marginTop: 4 },
  batch: { fontSize: 13, color: '#1d4ed8', marginTop: 6, fontWeight: '500' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  agreementCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 10,
    shadowColor: '#000',
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  agreementTitle: { fontSize: 14, fontWeight: '500', color: '#111827' },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  badgeGreen: { backgroundColor: '#d1fae5' },
  badgeYellow: { backgroundColor: '#fef3c7' },
  badgeText: { fontSize: 11, fontWeight: '600' },
  badgeTextGreen: { color: '#065f46' },
  badgeTextYellow: { color: '#92400e' },
  signButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  signButtonText: { color: '#fff', fontWeight: '600', fontSize: 13 },
  logoutButton: {
    backgroundColor: '#fee2e2',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 24,
  },
  logoutButtonText: { color: '#dc2626', fontWeight: '600', fontSize: 15 },
});
