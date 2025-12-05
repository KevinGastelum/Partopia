import { ArrowRight } from 'lucide-react-native';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  onSeeAll?: () => void;
}

export function SectionHeader({ title, onSeeAll }: SectionHeaderProps) {
  return (
    <View className="flex-row justify-between items-center mb-4 px-4">
      <Text className="text-xl font-bold text-white">{title}</Text>
      {onSeeAll && (
        <TouchableOpacity onPress={onSeeAll} className="flex-row items-center">
          <Text className="text-purple-400 mr-1 font-medium">See All</Text>
          <ArrowRight size={16} color="#A855F7" />
        </TouchableOpacity>
      )}
    </View>
  );
}
