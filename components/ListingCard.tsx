import { Heart } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface ListingCardProps {
  id: string;
  title: string;
  price: number;
  condition: string;
  image?: string;
  sellerRating?: number;
  onPress: () => void;
}

export function ListingCard({ 
  title, 
  price, 
  condition, 
  image, 
  onPress 
}: ListingCardProps) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="flex-row bg-slate-900 border border-slate-800 rounded-xl mb-4 overflow-hidden"
    >
      {/* Image Section */}
      <View className="w-32 h-32 bg-slate-800">
        <Image 
          source={{ uri: image || 'https://via.placeholder.com/150' }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute top-2 left-2 bg-slate-950/80 px-2 py-1 rounded-md">
           <Text className="text-white text-xs font-bold uppercase">{condition}</Text>
        </View>
      </View>

      {/* Content Section */}
      <View className="flex-1 p-3 justify-between">
        <View>
          <Text className="text-white font-bold text-lg leading-tight mb-1" numberOfLines={2}>
            {title}
          </Text>
          <Text className="text-slate-400 text-xs">Verified Seller</Text>
        </View>

        <View className="flex-row items-end justify-between">
          <Text className="text-purple-400 font-bold text-xl">
            ${price.toLocaleString()}
          </Text>
          <TouchableOpacity className="p-2 bg-slate-800 rounded-full">
            <Heart size={16} color="#94a3b8" />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}
