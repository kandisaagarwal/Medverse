import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';
import  Home  from '@/app/screens/Home';
import  Patient  from '@/app/screens/Patient';
import  Supervisor  from '@/app/screens/Supervisor';
import  Volunteer  from '@/app/screens/Volunteer';

export default function HomeScreen() {
  const handleNavigate = (screen: string) => {
    console.log("Navigate to:", screen);
    // here you could use expo-router's router.push(screen)
    // e.g. router.push("/patient")
  };

  return (
    <ThemedView style={{ flex: 1 }}>
      <Home onNavigate={handleNavigate} />
      <Patient onNavigate={handleNavigate}/>
      <Supervisor onNavigate={handleNavigate}/>
      <Volunteer onNavigate={handleNavigate}/>
    </ThemedView>
  );
}


