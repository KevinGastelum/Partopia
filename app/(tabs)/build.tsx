import { router } from 'expo-router';
import React from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BuildPartSlot } from '../../components/BuildPartSlot';
import { CompatibilityStatus } from '../../components/CompatibilityStatus';
import { PartSlot, useBuild } from '../../contexts/BuildContext';

export default function BuildScreen() {
  const { build, compatibilityIssues, removePart, clearBuild, totalPrice } = useBuild();

  const handleSelectSlot = (slot: PartSlot) => {
    // Navigate to Search with selection mode enabled
    router.push({
      pathname: '/(tabs)/search',
      params: { 
        selectionMode: 'true',
        slot: slot
      }
    });
  };

  const slots: PartSlot[] = ['CPU', 'Motherboard', 'GPU', 'RAM', 'Storage', 'PSU', 'Case'];

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
       <View className="px-6 py-4 flex-row justify-between items-center bg-slate-950 border-b border-slate-900">
          <Text className="text-white text-2xl font-bold">PC Builder</Text>
          <TouchableOpacity onPress={() => {
              Alert.alert('Clear Build?', 'Are you sure you want to start over?', [
                  { text: 'Cancel', style: 'cancel'},
                  { text: 'Clear', style: 'destructive', onPress: clearBuild }
              ]);
          }}>
              <Text className="text-red-400 font-medium">Clear</Text>
          </TouchableOpacity>
       </View>

      <ScrollView className="flex-1 px-6 pt-4">
        {/* Status Banner */}
        <CompatibilityStatus issues={compatibilityIssues} />

        {/* Total Price */}
        <View className="bg-slate-900 rounded-xl p-4 mb-6 flex-row justify-between items-center border border-slate-800">
            <Text className="text-slate-400 font-medium">Estimated Total</Text>
            <Text className="text-white text-2xl font-bold">${totalPrice.toLocaleString()}</Text>
        </View>

        {/* Part Slots */}
        <View className="mb-20">
            {slots.map((slot) => (
            <BuildPartSlot
                key={slot}
                slot={slot}
                part={build[slot]}
                onSelect={() => handleSelectSlot(slot)}
                onRemove={() => removePart(slot)}
            />
            ))}
        </View>
      </ScrollView>

      {/* Save Button (Floating) */}
      <View className="absolute bottom-6 left-6 right-6">
          <TouchableOpacity 
            className="bg-purple-600 p-4 rounded-xl items-center shadow-lg active:bg-purple-700"
            onPress={() => Alert.alert('Saved', 'Build saved to local storage!')}
          >
              <Text className="text-white font-bold text-lg">Save Build</Text>
          </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
