// app/Patient.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Pressable, Dimensions, Platform, ScrollView } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { useRouter } from 'expo-router';

const questions = [
  { key: 'email', type: 'input', question: 'What is your email?', placeholder: 'Enter your email', keyboardType: 'email-address' },
  { key: 'gender', type: 'picker', question: 'What is your gender?', options: [
    { label: 'Male', value: 'Male' },
    { label: 'Female', value: 'Female' },
    { label: 'Other', value: 'Other' },
  ] },
  { key: 'age', type: 'input', question: 'How old are you?', placeholder: 'Enter your age', keyboardType: 'numeric' },
];

const Patient: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({ email: '', gender: '', age: '' });

  const [open, setOpen] = useState(false);
  const [genderValue, setGenderValue] = useState<string | null>(null);

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      console.log('User Answers:', answers);
      router.push('./(tabs)/Home');
    }
  };

  const handleChange = (text: string) => {
    const key = questions[currentStep].key;
    setAnswers({ ...answers, [key]: text });
  };

  const progress = ((currentStep + 1) / questions.length) * Dimensions.get('window').width;

  return (
    <View style={styles.container}>
      {/* Progress Bar */}
      <View style={styles.progressWrapper}>
        <View style={styles.progressContainer}>
          <View style={[styles.progressBar, { width: progress }]} />
        </View>
      </View>

      {/* Fixed-position Question Area */}
      <View style={styles.fixedContent}>
        <Text style={styles.question}>{questions[currentStep].question}</Text>

        {questions[currentStep].type === 'input' ? (
          <TextInput
            style={styles.input}
            placeholder={questions[currentStep].placeholder}
            keyboardType={questions[currentStep].keyboardType === 'numeric' ? 'default' : questions[currentStep].keyboardType as any}
            value={answers[questions[currentStep].key as keyof typeof answers]}
            onChangeText={(text) => {
              if (questions[currentStep].key === 'age') handleChange(text.replace(/[^0-9]/g, ''));
              else handleChange(text);
            }}
            autoFocus
            returnKeyType={currentStep < questions.length - 1 ? 'next' : 'done'}
            onSubmitEditing={handleNext}
          />
        ) : (
          <DropDownPicker
            open={open}
            value={genderValue || answers.gender}
            items={questions[currentStep].options!}
            setOpen={setOpen}
            setValue={(callbackOrValue: string | ((prev: string | null) => string)) => {
              const value = typeof callbackOrValue === 'function' ? callbackOrValue(genderValue) : callbackOrValue;
              setGenderValue(value);
              handleChange(value as string);
            }}
            placeholder="Select your gender"
            style={styles.dropdown}
            dropDownContainerStyle={styles.dropdownContainer}
          />
        )}

        {/* Button always in the same position */}
        <Pressable style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>{currentStep < questions.length - 1 ? 'Next' : 'Submit'}</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Patient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f9fc',
    paddingTop: 80,
  },
  progressWrapper: {
    marginBottom: 40,
    paddingHorizontal: 20,
  },
  progressContainer: {
    height: 8,
    backgroundColor: '#dbe6f7',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#4da6ff',
  },
  fixedContent: {
    flex: 1,
    justifyContent: 'center',  // keep centered logic
    paddingHorizontal: 30,
    marginTop: -400,  // raise the content a bit upwards
  },
  question: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 20,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  input: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderRadius: 15,
    padding: 18,
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#a3c4ff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginBottom: 30,
  },
  dropdown: {
    width: '100%',
    backgroundColor: '#ffffff',
    borderColor: '#a3c4ff',
    borderRadius: 15,
    marginBottom: 30,
  },
  dropdownContainer: {
    backgroundColor: '#f7f9fc',
    borderColor: '#a3c4ff',
  },
  button: {
    backgroundColor: '#4da6ff',
    paddingVertical: 18,
    paddingHorizontal: 50,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#4da6ff',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 5 },
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
  },
});
