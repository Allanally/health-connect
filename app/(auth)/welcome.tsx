/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { images } from "@/constants";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

const OnBoarding = () => {
  const [selected, setSelected] = useState(false);

  const handlePress = () => {
    router.push('/(auth)/sign-in')
  }

  return (
    <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header */}
      <View className="flex justify-center items-center">
        <Image className="w-24 h-16" source={images.hc} />
      </View>
      <Text className="text-xl text-center font-semibold text-blue-950">
        Welcome To health Connect!
      </Text>
      <Text className="text-md font-JakartaLight text-center">
        Please select your profile to continue
      </Text>
      {/* Content */}
      <View className="flex flex-col items-center gap-4 mt-4">
        {/* Service Provider (Clickable) */}
        <TouchableOpacity
          className={`flex flex-col rounded-xl px-16 py-8 items-center justify-center border ${
            selected ? "border-blue-500" : "border-neutral-300"
          }`}
          onPress={() => setSelected(true)}
        >
          <Image className="w-12 h-12" source={images.demo} />
          <Text className="text-md font-JakartaLight mt-4 text-purple-950">
            Service Provider
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-col rounded-xl px-20 py-8 items-center justify-center border border-neutral-300 opacity-50"
          disabled
        >
          <Image className="w-12 h-12" source={images.demo} />
          <Text className="text-md font-JakartaLight mt-4 text-purple-950">
            Service User
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="flex flex-col rounded-xl px-24 py-8 items-center justify-center border border-neutral-300 opacity-50"
          disabled
        >
          <Image className="w-12 h-12" source={images.demo} />
          <Text className="text-md font-JakartaLight mt-4 text-purple-950">
            Partner
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`rounded-full border px-16 mb-12 py-2 ${
            selected ? "bg-blue-500 border-blue-500" : "border-neutral-300"
          }`}
          disabled={!selected}
          onPress={handlePress}
        >
          <Text
            className={`text-md text-center ${
              selected ? "text-white" : "text-neutral-500"
            }`}
          >
            Continue
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OnBoarding;
