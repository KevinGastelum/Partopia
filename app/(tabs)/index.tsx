import { Cpu, Hammer, Monitor, Search, Zap } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BuildCard } from '../../components/BuildCard';
import { DealCard } from '../../components/DealCard';
import { SectionHeader } from '../../components/SectionHeader';

export default function HomeScreen() {
  // Dummy Data
  const deals = [
    {
      id: 1,
      title: 'NVIDIA GeForce RTX 4070 Ti',
      price: 749,
      originalPrice: 799,
      image: 'https://m.media-amazon.com/images/I/716-wZ8yF1L._AC_SL1500_.jpg',
      store: 'Amazon',
      discount: 6,
    },
    {
      id: 2,
      title: 'AMD Ryzen 7 7800X3D',
      price: 349,
      originalPrice: 449,
      image: 'https://m.media-amazon.com/images/I/51f2hk81eGL._AC_SL1000_.jpg',
      store: 'Newegg',
      discount: 22,
    },
    {
      id: 3,
      title: 'Samsung 990 PRO 2TB SSD',
      price: 129,
      originalPrice: 169,
      image: 'https://m.media-amazon.com/images/I/815uX7wkOZS._AC_SL1500_.jpg',
      store: 'Best Buy',
      discount: 23,
    },
  ];

  const featuredBuild = {
    title: 'Neon City Runner 2077',
    author: 'CyberSamurai',
    image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?q=80&w=2574&auto=format&fit=crop',
    likes: 1240,
    comments: 86,
    specs: ['RTX 4090', 'i9-13900K', '64GB DDR5'],
  };

  const categories = [
    { name: 'GPU', icon: Monitor },
    { name: 'CPU', icon: Cpu },
    { name: 'RAM', icon: Zap },
    { name: 'Builds', icon: Hammer },
  ];

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Header */}
        <View className="px-6 py-4 mb-2">
          <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
          <Text className="text-white text-2xl font-bold">Cosmic Explorer 🚀</Text>
        </View>

        {/* Search Bar Placeholder */}
        <View className="px-6 mb-8">
          <View className="bg-slate-900 border border-slate-800 rounded-xl flex-row items-center px-4 py-3">
            <Search size={20} color="#64748b" />
            <Text className="text-slate-500 ml-3">Search for parts, builds...</Text>
          </View>
        </View>

        {/* Categories */}
        <View className="flex-row justify-between px-6 mb-8">
          {categories.map((cat, index) => (
            <TouchableOpacity key={index} className="items-center space-y-2">
              <View className="w-14 h-14 bg-slate-900 rounded-full items-center justify-center border border-slate-800">
                <cat.icon size={24} color="#A855F7" />
              </View>
              <Text className="text-slate-400 text-xs font-medium">{cat.name}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Deals */}
        <SectionHeader title="Featured Deals" onSeeAll={() => {}} />
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={{ paddingHorizontal: 24 }}
          className="mb-8"
        >
          {deals.map((deal) => (
            <DealCard key={deal.id} {...deal} />
          ))}
        </ScrollView>

        {/* Build of the Week */}
        <SectionHeader title="Build of the Week" />
        <View className="px-6">
          <BuildCard {...featuredBuild} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
