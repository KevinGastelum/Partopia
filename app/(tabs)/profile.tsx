import { Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center space-y-4">
      <Text className="text-white text-2xl font-bold">Profile</Text>
      <Button 
        label="Sign Out" 
        variant="danger"
        onPress={() => supabase.auth.signOut()}
      />
    </SafeAreaView>
  );
}
