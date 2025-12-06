import { Search, X } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { TextInput, TouchableOpacity, View } from 'react-native';

interface SearchInputProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export function SearchInput({ onSearch, initialQuery = '' }: SearchInputProps) {
  const [query, setQuery] = useState(initialQuery);

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearch(query);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <View className="flex-row items-center bg-slate-900 border border-slate-800 rounded-xl px-4">
      <Search size={20} color="#64748b" />
      <TextInput
        className="flex-1 ml-3 text-white text-base py-4 h-full"
        placeholder="Search for parts..."
        placeholderTextColor="#64748b"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
      />
      {query.length > 0 && (
        <TouchableOpacity onPress={() => setQuery('')}>
          <X size={18} color="#64748b" />
        </TouchableOpacity>
      )}
    </View>
  );
}
