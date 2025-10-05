// app/chat.tsx
import React, { useState, useEffect, useRef } from 'react';
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
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams } from 'expo-router';

interface Message {
  id: string;
  text?: string;
  imageUri?: string;
  sender: 'me' | 'other';
}

export default function Chat() {
  console.log("Chat mounted");
  const { answers } = useLocalSearchParams();
  console.log(answers);

  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [input, setInput] = useState('');

  const flatListRef = useRef<FlatList>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);

  // Parse user demographics
  const parsedAnswers = answers ? JSON.parse(answers as string) : {};
  const demographics = {
    age: parsedAnswers.age || '',
    gender: parsedAnswers.gender || '',
    country: parsedAnswers.country || '',
    city: parsedAnswers.city || '',
    email: parsedAnswers.email || ''
  };

  // Fetch initial bot message
  useEffect(() => {
    const fetchInitialMessage = async () => {
      try {
        const initial_input = {
          message: "Hi, I need some medical advice",
          prefilledDemographics: demographics
        };

        const response = await fetch("http://localhost:3000/reports/chat", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(initial_input),
        });

        const data = await response.json();

        if (data.reply) {
          setMessages([
            { id: "initial_0", text: data.reply, sender: 'other' },
          ]);
        }
      } catch (error) {
        console.error("Failed to fetch initial message:", error);
        Alert.alert("Connection Error", "Could not connect to the server. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialMessage();
  }, []);

  // Pick image and send to server
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled && result.assets.length > 0) {
      const imageUri = result.assets[0].uri;
      const newMessage: Message = { id: Math.random().toString(), imageUri, sender: 'me' };
      setMessages(prev => [...prev, newMessage]);

      // Send image to server
      try {
        const response = await fetch("http://localhost:3000/reports/chat", {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ imageUri, prefilledDemographics: demographics }),
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);
        const data = await response.json();

        if (data.reply) {
          const botMessage: Message = { id: Math.random().toString(), text: data.reply, sender: 'other' };
          setMessages(prev => [...prev, botMessage]);
        }
      } catch (error) {
        console.error("Failed to send image:", error);
        Alert.alert("Error", "Failed to send image. Please try again.");
      }
    }
  };

  // Send text message
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { id: Math.random().toString(), text: input, sender: 'me' };
    setMessages(prev => [...prev, userMessage]);

    const messageToSend = input;
    setInput('');

    try {
      const response = await fetch("http://localhost:3000/reports/chat", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageToSend, prefilledDemographics: demographics }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      const data = await response.json();

      if (data.reply) {
        const botMessage: Message = { id: Math.random().toString(), text: data.reply, sender: 'other' };
        setMessages(prev => [...prev, botMessage]);
      }
    } catch (error) {
      console.error("Failed to send message:", error);
      Alert.alert("Error", "Failed to send message. Please try again.");
    }
  };

  // End conversation and notify server
  const endConversation = async () => {
    Alert.alert('End Conversation', 'Are you sure you want to end the conversation?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: async () => {
          setMessages([]);
          try {
            await fetch("http://localhost:3000/reports/chat/end", {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ prefilledDemographics: demographics }),
            });
          } catch (error) {
            console.error("Failed to end conversation on server:", error);
          }
        }
      },
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
        ref={flatListRef}
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
