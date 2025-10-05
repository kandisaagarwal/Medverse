// app/end.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, Modal, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

export default function End() {
  const { answers } = useLocalSearchParams();
  const router = useRouter();

  const [showConfirm, setShowConfirm] = useState(true);
  const [showThanks, setShowThanks] = useState(false);

  const parsedAnswers = answers ? JSON.parse(answers as string) : {};
  const demographics = {
    age: parsedAnswers.age || '',
    gender: parsedAnswers.gender || '',
    country: parsedAnswers.country || '',
    city: parsedAnswers.city || '',
    email: parsedAnswers.email || ''
  };

  const handleEndSession = async () => {
    try {
      await fetch('http://localhost:3000/reports/chat/end', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prefilledDemographics: demographics }),
      });

      setShowConfirm(false);
      setShowThanks(true);
    } catch (error) {
      console.error('Failed to send demographics:', error);
    }
  };

  const handleThanksOk = () => {
    setShowThanks(false);
    router.replace('/'); // redirect home or anywhere
  };

  return (
    <View style={styles.container}>
      {/* Confirmation Modal */}
      <Modal transparent visible={showConfirm} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>End Session</Text>
            <Text style={styles.modalText}>Are you sure you want to end the session?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.cancelButton} onPress={() => router.back()}>
                <Text style={styles.buttonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.confirmButton} onPress={handleEndSession}>
                <Text style={styles.buttonText}>Yes</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Thank You Modal */}
      <Modal transparent visible={showThanks} animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Thank You!</Text>
            <Text style={styles.modalText}>Thanks for trusting us. You'll soon have your diagnoses.</Text>
            <Pressable style={styles.confirmButton} onPress={handleThanksOk}>
              <Text style={styles.buttonText}>OK</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Text style={styles.text}>Ending session...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#f7f9fc' },
  text: { fontSize: 18, color: '#333' },

  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 10 },
  modalText: { fontSize: 16, marginBottom: 20, textAlign: 'center' },
  modalButtons: { flexDirection: 'row', justifyContent: 'space-between', width: '100%' },
  cancelButton: { flex: 1, backgroundColor: '#ccc', padding: 12, borderRadius: 10, marginRight: 10, alignItems: 'center' },
  confirmButton: { flex: 1, backgroundColor: '#4da6ff', padding: 12, borderRadius: 10, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: '600', fontSize: 16 },
});
