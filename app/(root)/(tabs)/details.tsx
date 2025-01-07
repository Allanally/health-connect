/* eslint-disable prettier/prettier */
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';

export default function ServiceUserProfile() {
  const { id } = useLocalSearchParams();
  
  // Mock data - replace with actual API call
  const userData = {
    name: 'Jane Doe',
    age: 20,
    gender: 'Male',
    height: '220',
    weight: '60kg',
    bloodGroup: 'A+',
    summary: 'A concise summary should go here.',
    mentalHealth: 'All mental health diagnosis should go here.',
    medicalConditions: 'All medical conditions should go here.',
    medications: 'All prescribed medications should go here',
    allergies: 'All allergies should go here.',
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
        <ScrollView className="flex-1 px-4" contentContainerStyle={{ paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        >
      {/* Header */}
      <View className="p-4 -ml-6">
        <View className="flex-row items-center">
          <TouchableOpacity 
            onPress={() => router.back()}
            className="p-2"
          >
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="text-xl font-JakartaBold ml-2">Profile</Text>
        </View>
      </View>

    
        {/* Profile Header */}
        <View className="flex-row -mt-3 items-center border-b border-gray-700 py-2">
          <View className="w-16 h-16 rounded-full bg-gray-200 items-center justify-center">
            <Ionicons name="person" size={32} color="#666" />
          </View>
          <View className="ml-4 ">
            <Text className="text-xl font-JakartaBold">{userData.name}</Text>
            <View className="flex-row mt-1">
              <View className="mr-6">
                <Text className="text-gray-600 font-JakartaMedium">Age</Text>
                <Text className="font-JakartaBold">{userData.age}</Text>
              </View>
              <View>
                <Text className="text-gray-600 font-JakartaMedium">Gender</Text>
                <Text className="font-JakartaBold">{userData.gender}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Measurements */}
        <View className="flex-row mt-2 justify-between bg-primary-50 p-4 rounded-xl">
          <View>
            <Text className="text-gray-600 font-JakartaMedium">Height</Text>
            <Text className="font-JakartaBold mt-1">{userData.height}</Text>
          </View>
          <View>
            <Text className="text-gray-600 font-JakartaMedium">Weight</Text>
            <Text className="font-JakartaBold mt-1">{userData.weight}</Text>
          </View>
          <View>
            <Text className="text-gray-600 font-JakartaMedium">Blood group</Text>
            <Text className="font-JakartaBold mt-1">{userData.bloodGroup}</Text>
          </View>
        </View>

        {/* Medical Information */}
        <View className="mt-2 space-y-6 flex flex-col">
          <InfoSection title="Summary" content={userData.summary} />
          <InfoSection title="Mental health diagnosis" content={userData.mentalHealth} />
          <InfoSection title="Medical conditions" content={userData.medicalConditions} />
          <InfoSection title="Current medications" content={userData.medications} />
          <InfoSection title="Allergies" content={userData.allergies} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const InfoSection = ({ title, content }: { title: string; content: string }) => (
  <View>
    <Text className="font-JakartaBold text-lg mb-2">{title}</Text>
    <Text className="text-gray-600 font-JakartaRegular">{content}</Text>
  </View>
); 