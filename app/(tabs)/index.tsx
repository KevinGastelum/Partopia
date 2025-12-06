import { router } from 'expo-router';
import { Cpu, Hammer, Monitor, Search, Zap } from 'lucide-react-native';
import React from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
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
      image: 'https://images.unsplash.com/photo-1591488320449-011701bb6704?auto=format&fit=crop&w=800&q=80',
      store: 'Amazon',
      discount: 6,
    },
    {
      id: 2,
      title: 'AMD Ryzen 7 7800X3D',
      price: 349,
      originalPrice: 449,
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.adrenaline.com.br%2Fwp-content%2Fuploads%2F2023%2F04%2Famd-ryzen-7-7800x3d-adrenaline.jpg&f=1&nofb=1&ipt=c3b4eeabf27df52d2838f4bf67ca18c4e082b07a76194ac1ae626eb3182b8fea?auto=format&fit=crop&w=800&q=80',
      store: 'Newegg',
      discount: 22,
    },
    {
      id: 3,
      title: 'Samsung 990 PRO 2TB SSD',
      price: 129,
      originalPrice: 169,
      image: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fd2g44tvvp35wo2.cloudfront.net%2Fphoto%2Fglobal%2F2022%2F08%2F25%2FSamsungSSD990PRO_dl_2.jpg&f=1&nofb=1&ipt=2f51409288ea7c25cf864a2211e9b8c6ee7c5ea9a326166db1a0e1092d71fd30?auto=format&fit=crop&w=800&q=80',
      store: 'Best Buy',
      discount: 23,
    },
    {
      id: 4,
      title: 'NZXT H9 Flow Case',
      price: 159,
      originalPrice: 189,
      image: 'https://images.unsplash.com/photo-1587202372775-e229f172b9d7?auto=format&fit=crop&w=800&q=80',
      store: 'Amazon',
      discount: 15,
    },
    {
      id: 5,
      title: 'LG UltraGear 27" OLED',
      price: 899,
      originalPrice: 999,
      image: 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=800&q=80',
      store: 'Micro Center',
      discount: 10,
    },
    {
      id: 6,
      title: 'Corsair Vengeance 32GB DDR5',
      price: 99,
      originalPrice: 129,
      image: 'https://images.unsplash.com/photo-1562976540-1502c2145186?auto=format&fit=crop&w=800&q=80',
      store: 'Newegg',
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
      <ScrollView className="flex-1">
        {/* Hero Section */}
        <View className="px-6 py-6 border-b border-slate-900 bg-slate-950/50">
          <Text className="text-purple-400 font-bold uppercase tracking-wider text-xs mb-2">Welcome back</Text>
          <Text className="text-white text-2xl font-bold">Cosmic Explorer 🚀</Text>
        </View>


        {/* Search Bar - Functional */}
        <View className="px-6 mb-8">
          <View className="bg-slate-900 border border-slate-800 rounded-xl flex-row items-center px-4">
            <Search size={20} color="#64748b" />
            <TextInput
              className="flex-1 ml-3 text-white text-base py-3 h-12"
              placeholder="Search for parts, builds..."
              placeholderTextColor="#64748b"
              onSubmitEditing={(e) => {
                 console.log('Searching for:', e.nativeEvent.text);
                 router.push({ pathname: '/(tabs)/search', params: { q: e.nativeEvent.text } });
              }}
              returnKeyType="search"
            />
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
