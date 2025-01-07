/* eslint-disable prettier/prettier */
import InputField from "@/components/InputField";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { useState } from "react";
import { Text, TouchableOpacity, SafeAreaView, View, Image, TextInput, Pressable } from "react-native";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [successfulCreation, setSuccessfulCreation] = useState(false);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePress = () => {
    router.push('/(auth)/sign-in');
  };

  const handleCreation = () => {
    setSuccessfulCreation(true)
  }

  return (
    <SafeAreaView className="w-full flex flex-col items-center justify-center">
      {/* Header */}
      <View className="flex flex-col mt-6 items-center">
        <Image className="w-24 h-20" source={images.hc} />
        {!successfulCreation ? (
            <>
             <View className="w-[90%]">
          <Text className="text-xl text-center font-JakartaBold">Forgot Password</Text>
          {/* Input */}
          <InputField
            Label="Enter email address"
            icon={icons.email}
            isRequired={true}
            placeholder="Enter email address ..."
            value={email} 
            onChangeText={(text) => setEmail(text)} 
          />
          <TouchableOpacity className="flex flex-row w-[80%] mt-2" onPress={handlePress}>
            <Text className="text-[16px] font-JakartaLight">Back to</Text>
            <Text className="ml-1 text-[16px] text-blue-500 font-JakartaLight">Sign In</Text>
          </TouchableOpacity>
        </View>
        <View className="mt-6 flex items-center justify-center">
            {/* Confirm Button - Only visible when email is valid */}
            {isValidEmail(email) && (
              <TouchableOpacity onPress={handleCreation} className="rounded-full w-[80%] py-2 bg-blue-950">
                <Text className="text-lg font-JakartaBold text-center text-white">Confirm</Text>
              </TouchableOpacity>
            )}
          </View>
            </>
        ): (
            <View>
            <Text className="mb-2 text-[15px] font-JakartaMedium text-gray-600">Enter the reset code sent to your email</Text>
            <TextInput
              className="border border-gray-300 rounded-full p-3 mb-4"
              placeholder=" . . . .  Reset Code"
              keyboardType="numeric"
            />
            <Text className="mb-2 text-[15px] font-JakartaMedium text-gray-600">Enter your new password:</Text>
            <TextInput
              className="border border-gray-300 rounded-full p-3 mb-4"
              placeholder=". . . . . New Password"
              secureTextEntry
            />
            <Pressable
              className="bg-green-500 py-3 mt-4 rounded-full"
            >
              <Text className="text-white text-center px-20 font-semibold">Reset Password</Text>
            </Pressable>
           
          </View>
        )}
      
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassword;
