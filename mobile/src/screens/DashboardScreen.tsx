import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const stats = [
  { label: 'Completed Lessons', value: '8', emoji: '✅' },
  { label: 'In Progress', value: '2', emoji: '📖' },
  { label: 'Assignments Due', value: '1', emoji: '📝' },
  { label: 'Balance Due', value: '$500', emoji: '💳' },
];

export default function DashboardScreen({ navigation }: any) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Tech2High Portal</Text>
        <Text style={styles.headerSubtitle}>Batch 3 · Data Analysis</Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.greeting}>Welcome back! 👋</Text>

        <View style={styles.statsGrid}>
          {stats.map((stat) => (
            <View key={stat.label} style={styles.statCard}>
              <Text style={styles.statEmoji}>{stat.emoji}</Text>
              <Text style={styles.statValue}>{stat.value}</Text>
              <Text style={styles.statLabel}>{stat.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.actions}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Lessons')}
          >
            <Text style={styles.actionButtonText}>📚  Continue Learning</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => navigation.navigate('Payments')}
          >
            <Text style={styles.actionButtonText}>💳  Make Payment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.actionButtonSecondary]}
            onPress={() => navigation.navigate('Messages')}
          >
            <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
              💬  Message Admin
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.nextLesson}>
          <Text style={styles.sectionTitle}>Next Up</Text>
          <View style={styles.lessonCard}>
            <Text style={styles.lessonTitle}>Python for Data Science</Text>
            <Text style={styles.lessonSubtitle}>Module 4: Data Visualization</Text>
            <TouchableOpacity
              style={styles.continueButton}
              onPress={() => navigation.navigate('Lessons')}
            >
              <Text style={styles.continueButtonText}>Continue →</Text>
            </TouchableOpacity>
          </View>
        </View>
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
  greeting: { fontSize: 22, fontWeight: 'bold', color: '#111827', marginBottom: 16 },
  statsGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: 12, marginBottom: 24 },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    width: '47%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statEmoji: { fontSize: 24, marginBottom: 6 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#111827' },
  statLabel: { fontSize: 12, color: '#6b7280', marginTop: 2, textAlign: 'center' },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#374151', marginBottom: 12 },
  actions: { gap: 10, marginBottom: 24 },
  actionButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 20,
  },
  actionButtonSecondary: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#1d4ed8' },
  actionButtonText: { color: '#fff', fontSize: 15, fontWeight: '600', textAlign: 'center' },
  actionButtonTextSecondary: { color: '#1d4ed8' },
  nextLesson: { marginBottom: 24 },
  lessonCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  lessonTitle: { fontSize: 16, fontWeight: '600', color: '#111827' },
  lessonSubtitle: { fontSize: 13, color: '#6b7280', marginTop: 4 },
  continueButton: { marginTop: 12, alignSelf: 'flex-start' },
  continueButtonText: { color: '#1d4ed8', fontWeight: '600', fontSize: 14 },
});
