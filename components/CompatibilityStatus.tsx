import { AlertTriangle, CheckCircle } from 'lucide-react-native';
import React from 'react';
import { Text, View } from 'react-native';

interface CompatibilityStatusProps {
  issues: string[];
}

export function CompatibilityStatus({ issues }: CompatibilityStatusProps) {
  const isCompatible = issues.length === 0;

  return (
    <View className={`rounded-xl p-4 mb-6 border ${isCompatible ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
      <View className="flex-row items-center space-x-3 mb-2">
        {isCompatible ? (
          <CheckCircle size={24} color="#22c55e" />
        ) : (
          <AlertTriangle size={24} color="#ef4444" />
        )}
        <Text className={`text-lg font-bold ${isCompatible ? 'text-green-500' : 'text-red-500'}`}>
          {isCompatible ? 'Compatibility Check Passed' : 'Compatibility Issues Found'}
        </Text>
      </View>
      
      {!isCompatible && (
        <View className="space-y-1 ml-9">
          {issues.map((issue, index) => (
            <Text key={index} className="text-red-400 text-sm">• {issue}</Text>
          ))}
        </View>
      )}
      
      {isCompatible && (
         <Text className="text-green-400/80 text-sm ml-9">All selected parts work together correctly.</Text>
      )}
    </View>
  );
}
