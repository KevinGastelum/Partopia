import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CommunityScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center">
      <Text className="text-white text-2xl font-bold">Community</Text>
    </SafeAreaView>
  );
}
