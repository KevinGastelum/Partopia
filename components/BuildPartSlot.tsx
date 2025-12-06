import { AlertTriangle, Plus, Trash2 } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { BuildPart, PartSlot } from '../contexts/BuildContext';

interface BuildPartSlotProps {
  slot: PartSlot;
  part: BuildPart | null;
  onSelect: () => void;
  onRemove: () => void;
  error?: string;
}

export function BuildPartSlot({ slot, part, onSelect, onRemove, error }: BuildPartSlotProps) {
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-slate-400 font-bold uppercase text-xs tracking-wider">{slot}</Text>
        {error && (
            <View className="flex-row items-center space-x-1">
                <AlertTriangle size={12} color="#EF4444" />
                <Text className="text-red-500 text-xs font-bold">Incompatible</Text>
            </View>
        )}
      </View>

      {part ? (
         // Filled State
        <View className={`bg-slate-900 border ${error ? 'border-red-500' : 'border-slate-800'} rounded-xl p-3 flex-row items-center`}>
          <View className="w-16 h-16 bg-slate-800 rounded-lg mr-3 overflow-hidden">
             <Image 
                source={{ uri: part.image || 'https://via.placeholder.com/150' }} 
                className="w-full h-full" 
                resizeMode="cover"
             />
          </View>
          
          <View className="flex-1">
            <Text className="text-white font-bold text-sm" numberOfLines={1}>{part.title}</Text>
            <Text className="text-purple-400 font-bold text-base">${part.price.toLocaleString()}</Text>
          </View>

          <TouchableOpacity onPress={onRemove} className="p-2 bg-slate-800 rounded-full ml-2">
            <Trash2 size={18} color="#EF4444" />
          </TouchableOpacity>
        </View>
      ) : (
        // Empty State
        <TouchableOpacity 
          onPress={onSelect}
          className="bg-slate-900/50 border border-dashed border-slate-700 rounded-xl h-20 items-center justify-center flex-row space-x-2 active:bg-slate-800/50"
        >
          <View className="w-8 h-8 rounded-full bg-slate-800 items-center justify-center">
             <Plus size={20} color="#A855F7" />
          </View>
          <Text className="text-slate-400 font-medium">Add {slot}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
