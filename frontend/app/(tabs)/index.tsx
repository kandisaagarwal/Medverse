import { ThemedView } from '@/components/themed-view';
import Home from '@/app/(tabs)/Home';

export default function IndexScreen() {
  return (
    <ThemedView style={{ flex: 1 }} lightColor="transparent" darkColor="transparent">
      <Home />
    </ThemedView>
  );
}