import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';

export default function ProfileScreen() {
  const { session } = useAuth();

  if (!session) {
    return (
      <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center px-6 space-y-6">
        <View className="items-center space-y-2">
          <Text className="text-white text-3xl font-bold">Guest Profile</Text>
          <Text className="text-slate-400 text-center">
            Sign in to view your builds, saved parts, and community posts.
          </Text>
        </View>
        <View className="w-full space-y-4">
          <Button 
            label="Sign In" 
            onPress={() => router.push('/sign-in')}
          />
          <Button 
            label="Create Account" 
            variant="outline"
            onPress={() => router.push('/sign-up')}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950 items-center justify-center space-y-4">
      <Text className="text-white text-2xl font-bold">Profile</Text>
      <Text className="text-slate-400">{session.user.email}</Text>
      <Button 
        label="Sign Out" 
        variant="danger"
        onPress={() => supabase.auth.signOut()}
      />
    </SafeAreaView>
  );
}
