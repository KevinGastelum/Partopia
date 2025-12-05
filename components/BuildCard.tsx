import { Heart, MessageSquare } from 'lucide-react-native';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

interface BuildCardProps {
  title: string;
  author: string;
  image: string;
  likes: number;
  comments: number;
  specs: string[];
}

export function BuildCard({ title, author, image, likes, comments, specs }: BuildCardProps) {
  return (
    <TouchableOpacity className="bg-slate-900 rounded-xl overflow-hidden mb-4 border border-slate-800">
      <View className="h-48 bg-slate-800 relative">
        <Image 
          source={{ uri: image }} 
          className="w-full h-full"
          resizeMode="cover"
        />
        <View className="absolute bottom-0 left-0 right-0 bg-black/60 p-3">
          <Text className="text-white font-bold text-lg">{title}</Text>
          <Text className="text-slate-300 text-sm">by {author}</Text>
        </View>
      </View>
      
      <View className="p-3">
        <View className="flex-row flex-wrap gap-2 mb-3">
          {specs.map((spec, index) => (
            <View key={index} className="bg-slate-800 px-2 py-1 rounded-md">
              <Text className="text-slate-300 text-xs">{spec}</Text>
            </View>
          ))}
        </View>
        
        <View className="flex-row justify-between items-center border-t border-slate-800 pt-3">
          <View className="flex-row space-x-4">
            <View className="flex-row items-center space-x-1">
              <Heart size={16} color="#94a3b8" />
              <Text className="text-slate-400 text-xs">{likes}</Text>
            </View>
            <View className="flex-row items-center space-x-1">
              <MessageSquare size={16} color="#94a3b8" />
              <Text className="text-slate-400 text-xs">{comments}</Text>
            </View>
          </View>
          <Text className="text-purple-400 text-xs font-bold">View Build</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
