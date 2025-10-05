import { ThemedView } from '@/components/themed-view';
import Home from '@/app/(tabs)/Home';
import Volunteer from '@/app/(tabs)/Volunteer';

export default function IndexScreen() {
  return (
    <ThemedView style={{ flex: 1 }}>
      <Home />
      <Volunteer />
    </ThemedView>
  );
}
