import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface DealCardProps {
  title: string;
  price: number;
  originalPrice: number;
  image: string;
  store: string;
  discount: number;
}

export function DealCard({ title, price, originalPrice, image, store, discount }: DealCardProps) {
  return (
    <TouchableOpacity className="bg-slate-900 rounded-xl overflow-hidden mr-4 w-48 border border-slate-800">
      <View className="h-32 bg-slate-800 relative">
        <Image 
          source={{ uri: image }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-2 right-2 bg-red-600 px-2 py-1 rounded-md">
          <Text className="text-white text-xs font-bold">-{discount}%</Text>
        </View>
      </View>
      
      <View className="p-3 space-y-1">
        <Text className="text-slate-400 text-xs font-medium uppercase">{store}</Text>
        <Text className="text-white font-bold text-sm" numberOfLines={2}>{title}</Text>
        
        <View className="flex-row items-baseline space-x-2 mt-1">
          <Text className="text-purple-400 font-bold text-lg">${price}</Text>
          <Text className="text-slate-600 text-xs line-through">${originalPrice}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
