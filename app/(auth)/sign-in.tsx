import { Link } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { supabase } from '../../lib/supabase';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  async function signInWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  }

  return (
    <SafeAreaView className="flex-1 bg-slate-950 px-6 justify-center">
      <View className="space-y-8">
        <View className="items-center space-y-2">
          <Text className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-orange-400">
            Partopia
          </Text>
          <Text className="text-slate-400 text-lg">
            Welcome back, explorer.
          </Text>
        </View>

        <View className="space-y-4">
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
          label="Sign In"
          onPress={signInWithEmail}
          isLoading={loading}
          disabled={loading}
        />

        <View className="flex-row justify-center space-x-2">
          <Text className="text-slate-400">Don't have an account?</Text>
          <Link href="/sign-up" asChild>
            <Text className="text-purple-400 font-bold">Sign Up</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
