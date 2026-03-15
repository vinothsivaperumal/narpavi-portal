import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const initialMessages = [
  { id: '1', sender: 'Admin', content: 'Welcome to Batch 3! Please complete your onboarding.', time: '10:00 AM', isMe: false },
  { id: '2', sender: 'Me', content: 'Thank you! I have a question about the Python module.', time: '10:05 AM', isMe: true },
  { id: '3', sender: 'Admin', content: 'Sure! What would you like to know?', time: '10:07 AM', isMe: false },
];

export default function MessagesScreen() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now().toString(),
      sender: 'Me',
      content: input.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true,
    };
    setMessages([...messages, newMsg]);
    setInput('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <Text style={styles.headerSubtitle}>Admin Support</Text>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={80}
      >
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.messages}
          renderItem={({ item }) => (
            <View style={[styles.messageBubble, item.isMe ? styles.myBubble : styles.theirBubble]}>
              {!item.isMe && <Text style={styles.senderName}>{item.sender}</Text>}
              <Text style={[styles.messageText, item.isMe && styles.myMessageText]}>{item.content}</Text>
              <Text style={[styles.messageTime, item.isMe && styles.myMessageTime]}>{item.time}</Text>
            </View>
          )}
        />
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={setInput}
            placeholder="Type a message..."
            placeholderTextColor="#9ca3af"
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f9fafb' },
  header: { backgroundColor: '#1d4ed8', paddingHorizontal: 20, paddingVertical: 16 },
  headerTitle: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  headerSubtitle: { color: '#bfdbfe', fontSize: 13, marginTop: 2 },
  messages: { padding: 16, gap: 12 },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 16,
    padding: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
  },
  myBubble: { alignSelf: 'flex-end', backgroundColor: '#1d4ed8' },
  theirBubble: { alignSelf: 'flex-start' },
  senderName: { fontSize: 11, fontWeight: '600', color: '#6b7280', marginBottom: 4 },
  messageText: { fontSize: 14, color: '#111827' },
  myMessageText: { color: '#fff' },
  messageTime: { fontSize: 10, color: '#9ca3af', marginTop: 4, textAlign: 'right' },
  myMessageTime: { color: '#bfdbfe' },
  inputRow: {
    flexDirection: 'row',
    gap: 8,
    padding: 12,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    alignItems: 'flex-end',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 14,
    maxHeight: 100,
    color: '#111827',
  },
  sendButton: {
    backgroundColor: '#1d4ed8',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  sendButtonText: { color: '#fff', fontWeight: '600', fontSize: 14 },
});
