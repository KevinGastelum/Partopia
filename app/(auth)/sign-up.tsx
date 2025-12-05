import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail() {
    setLoading(true);
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
        },
      },
    });

    if (error) Alert.alert('Error', error.message);
    else if (!session) Alert.alert('Check your inbox', 'Please check your inbox for email verification!');
    
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950 px-6 justify-center">
      <View className="space-y-8">
        <View className="items-center space-y-2">
          <Text className="text-3xl font-bold text-white">
            Join the Fleet
          </Text>
          <Text className="text-slate-400 text-base text-center">
            Create your account to start building your dream rig.
          </Text>
        </View>

        <View className="space-y-4">
          <Input
            label="Username"
            placeholder="CosmicBuilder"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
          <Input
            label="Email"
            placeholder="cosmos@example.com"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
          />
          <Input
            label="Password"
            placeholder="••••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <Button
          label="Sign Up"
          onPress={signUpWithEmail}
          isLoading={loading}
          disabled={loading}
        />

        <View className="flex-row justify-center space-x-2">
          <Text className="text-slate-400">Already have an account?</Text>
          <Link href="/sign-in" asChild>
            <Text className="text-purple-400 font-bold">Sign In</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
