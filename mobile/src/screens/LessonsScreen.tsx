import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const lessons = [
  { id: '1', title: 'Introduction to Data Analysis', duration: '2h 30m', progress: 100 },
  { id: '2', title: 'Python for Data Science', duration: '5h 00m', progress: 75 },
  { id: '3', title: 'SQL & Database Management', duration: '4h 00m', progress: 40 },
  { id: '4', title: 'Data Visualization with Tableau', duration: '3h 30m', progress: 0 },
  { id: '5', title: 'Machine Learning Basics', duration: '6h 00m', progress: 0 },
];

export default function LessonsScreen() {
  const renderLesson = ({ item, index }: any) => (
    <TouchableOpacity style={styles.card}>
      <View style={styles.cardLeft}>
        <View style={styles.orderBadge}>
          <Text style={styles.orderText}>{index + 1}</Text>
        </View>
        <View style={styles.cardContent}>
          <Text style={styles.lessonTitle}>{item.title}</Text>
          <Text style={styles.lessonDuration}>{item.duration}</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${item.progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{item.progress}% complete</Text>
        </View>
      </View>
      <Text style={styles.arrow}>›</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Course Lessons</Text>
        <Text style={styles.headerSubtitle}>{lessons.filter((l) => l.progress === 100).length} of {lessons.length} completed</Text>
      </View>
      <FlatList
        data={lessons}
        keyExtractor={(item) => item.id}
        renderItem={renderLesson}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1d4ed8', paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#bfdbfe', fontSize: 13, marginTop: 2 },
  list: { padding: 16, gap: 12 },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardLeft: { flex: 1, flexDirection: 'row', gap: 12 },
  orderBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orderText: { color: '#1d4ed8', fontWeight: 'bold', fontSize: 14 },
  cardContent: { flex: 1 },
  lessonTitle: { fontSize: 14, fontWeight: '600', color: '#111827' },
  lessonDuration: { fontSize: 12, color: '#9ca3af', marginTop: 2 },
  progressBar: { height: 4, backgroundColor: '#e5e7eb', borderRadius: 2, marginTop: 8 },
  progressFill: { height: 4, backgroundColor: '#1d4ed8', borderRadius: 2 },
  progressText: { fontSize: 11, color: '#6b7280', marginTop: 4 },
  arrow: { fontSize: 24, color: '#d1d5db' },
});
