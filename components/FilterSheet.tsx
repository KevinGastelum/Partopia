import { X } from 'lucide-react-native';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Button } from './Button';

interface FilterSheetProps {
  visible: boolean;
  onClose: () => void;
  onApply: (filters: FilterState) => void;
}

export interface FilterState {
  sortBy: 'price_asc' | 'price_desc' | 'newest';
  condition: 'all' | 'new' | 'used';
  minPrice: string;
  maxPrice: string;
}

export function FilterSheet({ visible, onClose, onApply }: FilterSheetProps) {
  const [sortBy, setSortBy] = useState<FilterState['sortBy']>('newest');
  const [condition, setCondition] = useState<FilterState['condition']>('all');
  
  // We'll skip complex inputs for MVP phase and keep it simple
  const handleApply = () => {
    onApply({
      sortBy,
      condition,
      minPrice: '',
      maxPrice: '',
    });
    onClose();
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View className="flex-1 justify-end bg-black/50">
        <View className="bg-slate-900 rounded-t-3xl p-6 h-1/2">
          <View className="flex-row justify-between items-center mb-6">
            <Text className="text-white text-xl font-bold">Filters</Text>
            <TouchableOpacity onPress={onClose}>
              <X color="#94a3b8" />
            </TouchableOpacity>
          </View>

          <ScrollView className="space-y-6">
            {/* Sort By */}
            <View>
              <Text className="text-slate-400 font-bold mb-3">Sort By</Text>
              <View className="flex-row flex-wrap gap-2">
                {[
                  { label: 'Newest', value: 'newest' },
                  { label: 'Price: Low to High', value: 'price_asc' },
                  { label: 'Price: High to Low', value: 'price_desc' },
                ].map((opt) => (
                  <TouchableOpacity
                    key={opt.value}
                    onPress={() => setSortBy(opt.value as any)}
                    className={`px-4 py-2 rounded-full border ${
                      sortBy === opt.value
                        ? 'bg-purple-600 border-purple-600'
                        : 'bg-transparent border-slate-700'
                    }`}
                  >
                    <Text
                      className={`${
                        sortBy === opt.value ? 'text-white' : 'text-slate-400'
                      } font-medium`}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Condition */}
            <View>
              <Text className="text-slate-400 font-bold mb-3">Condition</Text>
              <View className="flex-row flex-wrap gap-2">
                {['all', 'new', 'used'].map((c) => (
                  <TouchableOpacity
                    key={c}
                    onPress={() => setCondition(c as any)}
                    className={`px-4 py-2 rounded-full border ${
                      condition === c
                        ? 'bg-purple-600 border-purple-600'
                        : 'bg-transparent border-slate-700'
                    }`}
                  >
                    <Text
                      className={`${
                        condition === c ? 'text-white' : 'text-slate-400'
                      } font-medium capitalize`}
                    >
                      {c}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </ScrollView>

          <View className="pt-4">
             <Button label="Apply Filters" onPress={handleApply} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
