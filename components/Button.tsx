import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends TouchableOpacityProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  label: string;
  isLoading?: boolean;
  className?: string;
  textClassName?: string;
}

export function Button({
  variant = 'primary',
  size = 'md',
  label,
  isLoading,
  className,
  textClassName,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "flex-row items-center justify-center rounded-xl active:opacity-80";
  
  const variants = {
    primary: "bg-purple-600 border border-purple-500",
    secondary: "bg-slate-800 border border-slate-700",
    outline: "bg-transparent border border-slate-600",
    danger: "bg-red-600 border border-red-500",
  };

  const sizes = {
    sm: "px-3 py-2",
    md: "px-4 py-3",
    lg: "px-6 py-4",
  };

  const textBaseStyles = "font-bold text-center";
  
  const textVariants = {
    primary: "text-white",
    secondary: "text-slate-200",
    outline: "text-slate-300",
    danger: "text-white",
  };

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <TouchableOpacity
      className={twMerge(
        baseStyles,
        variants[variant],
        sizes[size],
        disabled || isLoading ? "opacity-50" : "",
        className
      )}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <ActivityIndicator color={variant === 'outline' ? '#cbd5e1' : '#ffffff'} />
      ) : (
        <Text
          className={twMerge(
            textBaseStyles,
            textVariants[variant],
            textSizes[size],
            textClassName
          )}
        >
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
}
