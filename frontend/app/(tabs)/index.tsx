// import { ThemedView } from '@/components/themed-view';
// import Home from '@/app/(tabs)/Home';
// import Volunteer from '@/app/(tabs)/Volunteer';
// import VolunteerLogin from '@/app/(tabs)/VolunteerLogin';

// export default function IndexScreen() {
//   return (
//     <ThemedView style={{ flex: 1 }}>
//       <Home />
//       <Volunteer />
//       <VolunteerLogin />
//     </ThemedView>
//   );
// }

import { ThemedView } from '@/components/themed-view';
import Home from '@/app/(tabs)/Home';

export default function IndexScreen() {
  return (
    <ThemedView style={{ flex: 1 }} lightColor="transparent" darkColor="transparent">
      <Home />
    </ThemedView>
  );
}