import { router, useLocalSearchParams } from 'expo-router';
import { Filter } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FilterSheet, FilterState } from '../../components/FilterSheet';
import { ListingCard } from '../../components/ListingCard';
import { SearchInput } from '../../components/SearchInput';
import { useBuild } from '../../contexts/BuildContext';
import { supabase } from '../../lib/supabase';

export default function SearchScreen() {
  const params = useLocalSearchParams<{ q: string; selectionMode?: string; slot?: string }>();
  // Initialize query from navigation param if available
  const [query, setQuery] = useState(params.q || '');
  const { addPart } = useBuild();
  
  const [filters, setFilters] = useState<FilterState>({
    sortBy: 'newest',
    condition: 'all',
    minPrice: '',
    maxPrice: '',
  });
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch Logic
  const fetchListings = async () => {
    setLoading(true);
    try {
      let builder = supabase
        .from('listings')
        .select('*')
        .eq('status', 'active');

      // Text Search
      if (query) {
        builder = builder.ilike('title', `%${query}%`);
      }

      // Condition Filter
      if (filters.condition !== 'all') {
        builder = builder.eq('condition', filters.condition);
      }

      // Sorting
      if (filters.sortBy === 'newest') {
        builder = builder.order('created_at', { ascending: false });
      } else if (filters.sortBy === 'price_asc') {
        builder = builder.order('price', { ascending: true });
      } else if (filters.sortBy === 'price_desc') {
        builder = builder.order('price', { ascending: false });
      }

      const { data, error } = await builder;

      if (error) {
        console.error('Search error:', error);
      } else {
        let finalResults = data || [];
        
        // Client-side category filtering for MVP (since we need joins for DB filtering)
        if (params.selectionMode && params.slot) {
           const targetSlot = params.slot.toLowerCase();
           finalResults = finalResults.filter(item => {
               // We rely on title keywords since we don't have category joined yet
               const title = item.title.toLowerCase();
               if (targetSlot === 'cpu') return title.includes('ryzen') || title.includes('intel') || title.includes('core');
               if (targetSlot === 'gpu') return title.includes('rtx') || title.includes('gtx') || title.includes('radeon');
               if (targetSlot === 'motherboard') return title.includes('b650') || title.includes('z790') || title.includes('motherboard');
               if (targetSlot === 'ram') return title.includes('ddr') || title.includes('memory') || title.includes('ram');
               if (targetSlot === 'storage') return title.includes('ssd') || title.includes('nvme');
               if (targetSlot === 'psu') return title.includes('psu') || title.includes('supply');
               if (targetSlot === 'case') return title.includes('case') || title.includes('tower');
               return true;
           });
        }
        
        setResults(finalResults);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePressListing = (item: any) => {
      // Check if we are selecting a part for a slot
      if (params.selectionMode === 'true' && params.slot) {
          addPart(params.slot as any, {
              id: item.id,
              title: item.title,
              price: item.price,
              image: item.image,
              category_id: item.category_id
          });
          // Explicitly navigate back to Build tab
          router.navigate('/(tabs)/build');
      } else {
          console.log('Viewing details for:', item.id);
      }
  };

  // Re-fetch when query (from state) or filters change
  useEffect(() => {
    fetchListings();
  }, [query, filters, params.slot, params.selectionMode]);

  // Update query state if params change
  useEffect(() => {
    if (params.q) {
      setQuery(params.q);
    } else if (params.selectionMode) {
       // Clear query when entering selection mode from Build screen to show all parts
       setQuery('');
    }
  }, [params.q, params.slot]);

  return (
    <SafeAreaView className="flex-1 bg-slate-950">
      <View className="px-6 py-4 space-y-4">
        <Text className="text-white text-2xl font-bold">
            {params.selectionMode ? `Select ${params.slot}` : 'Search'}
        </Text>
        
        <View className="flex-row items-center space-x-2">
          <View className="flex-1">
            <SearchInput 
              initialQuery={query}
              onSearch={setQuery} 
            />
          </View>
          <TouchableOpacity 
            className="bg-slate-900 border border-slate-800 p-3 rounded-xl"
            onPress={() => setShowFilters(true)}
          >
            <Filter color="#A855F7" size={20} />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ListingCard
            id={item.id}
            title={item.title}
            price={item.price}
            condition={item.condition}
            onPress={() => handlePressListing(item)}
            // TODO: Fetch image from listing_images table or storage
            image={undefined} 
          />
        )}
        contentContainerStyle={{ padding: 24 }}
        ListEmptyComponent={
          !loading ? (
            <View className="items-center justify-center mt-20">
              <Text className="text-slate-500">No results found.</Text>
            </View>
          ) : null
        }
      />

      {loading && (
        <View className="absolute inset-0 items-center justify-center bg-black/20">
          <ActivityIndicator size="large" color="#A855F7" />
        </View>
      )}

      <FilterSheet 
        visible={showFilters} 
        onClose={() => setShowFilters(false)}
        onApply={setFilters}
      />
    </SafeAreaView>
  );
}
