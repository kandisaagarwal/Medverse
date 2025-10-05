// app/chat.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  FlatList,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
  sender: 'me' | 'other';
}

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: 'Hey! How are you?', sender: 'other' },
    { id: '2', text: 'I am good, thanks!', sender: 'me' },
  ]);
  const [input, setInput] = useState('');

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMessage: Message = { id: Math.random().toString(), text: input, sender: 'me' };
    setMessages([...messages, newMessage]);
    setInput('');
  };

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });
    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const newMessage: Message = { id: Math.random().toString(), imageUri, sender: 'me' };
      setMessages([...messages, newMessage]);
    }
  };

  const endConversation = () => {
    Alert.alert('End Conversation', 'Are you sure you want to end the conversation?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Yes', style: 'destructive', onPress: () => setMessages([]) },
    ]);
  };

  const renderItem = ({ item }: { item: Message }) => (
    <View
      style={[
        styles.messageContainer,
        item.sender === 'me' ? styles.myMessage : styles.otherMessage,
      ]}
    >
      {item.text && (
        <Text style={[styles.messageText, item.sender === 'me' ? styles.myMessageText : styles.otherMessageText]}>
          {item.text}
        </Text>
      )}
      {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.image} />}
    </View>
  );

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.messagesList}
        keyboardShouldPersistTaps="handled"
      />

      <View style={styles.inputContainer}>
        <Pressable onPress={endConversation} style={styles.endButton}>
          <Text style={styles.endText}>End</Text>
        </Pressable>

        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
          style={styles.input}
          multiline
          maxLength={500}
        />

        <Pressable onPress={pickImage} style={styles.attachButton}>
          <Text style={styles.attachText}>📎</Text>
        </Pressable>

        <Pressable onPress={sendMessage} style={styles.sendButton}>
          <Text style={styles.sendText}>Send</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f9fc', paddingTop: 60 },
  messagesList: { paddingHorizontal: 20, paddingBottom: 10 },

  messageContainer: {
    maxWidth: '70%',
    padding: 15,
    borderRadius: 20,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  myMessage: { backgroundColor: '#4da6ff', alignSelf: 'flex-end', borderTopRightRadius: 0 },
  otherMessage: { backgroundColor: '#e0e0e0', alignSelf: 'flex-start', borderTopLeftRadius: 0 },
  messageText: { fontSize: 17 },
  myMessageText: { color: 'white' },
  otherMessageText: { color: '#1a1a1a' },
  image: { width: 180, height: 180, borderRadius: 15, marginTop: 5 },

  inputContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#dbe6f7',
  },
  input: {
    flex: 1,
    minHeight: 48,
    maxHeight: 100,
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderRadius: 25,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#a3c4ff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginHorizontal: 6,
  },
  sendButton: {
    width: 70,
    backgroundColor: '#4da6ff',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  sendText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  endButton: {
    width: 70,
    backgroundColor: '#FF3B30',
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 4,
  },
  endText: { color: '#fff', fontWeight: '600', fontSize: 16 },

  attachButton: {
    width: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
  attachText: { fontSize: 18 },
});
