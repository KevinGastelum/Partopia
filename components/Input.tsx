import React from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  containerClassName?: string;
}

export function Input({
  label,
  error,
  containerClassName,
  className,
  ...props
}: InputProps) {
  return (
    <View className={twMerge("w-full space-y-2", containerClassName)}>
      {label && (
        <Text className="text-slate-300 font-medium ml-1">{label}</Text>
      )}
      <TextInput
        className={twMerge(
          "bg-slate-900/50 border border-slate-700 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:border-purple-500 focus:bg-slate-900",
          error ? "border-red-500" : "",
          className
        )}
        placeholderTextColor="#64748b"
        {...props}
      />
      {error && (
        <Text className="text-red-400 text-sm ml-1">{error}</Text>
      )}
    </View>
  );
}
