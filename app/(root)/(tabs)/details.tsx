/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import CarePlanShow from '@/components/CarePlanShow';

export default function ServiceUserProfile() {
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
  const [isCarePlanVisible, setIsCarePlanVisible] = useState(false);
  const { patientName } = useLocalSearchParams()
  

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-4 py-3 border-b border-gray-200">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.push('/(root)/home')}
              className="p-2 -ml-2"
            >
              <Ionicons name="arrow-back" size={24} color="#4F46E5" />
            </TouchableOpacity>
            <Text className="text-xl font-JakartaBold ml-2">Profile Details</Text>
          </View>
          <TouchableOpacity className="p-2">
            {/*<Ionicons name="create-outline" size={24} color="#4F46E5" />*/}
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView 
        className="flex-1" 
        contentContainerStyle={{ paddingBottom: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Header */}
        <View className="bg-white px-4 py-6 mb-3">
          <View className="flex-row items-center">
            <View className="w-20 h-20 rounded-full bg-indigo-100 items-center justify-center">
              <Text className="text-2xl font-JakartaBold text-indigo-600">
                {userData.name.split(' ').map(n => n[0]).join('')}
              </Text>
            </View>
            <View className="ml-4 flex-1">
              <Text className="text-2xl font-JakartaBold text-gray-900">{patientName}</Text>
              <View className="flex-row mt-2">
                <View className="bg-indigo-100 px-3 py-1 rounded-full mr-2">
                  <Text className="text-indigo-600 font-JakartaMedium">{userData.age} years</Text>
                </View>
                <View className="bg-indigo-100 px-3 py-1 rounded-full">
                  <Text className="text-indigo-600 font-JakartaMedium">{userData.gender}</Text>
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* Vitals Card */}
        <View className="mx-4 bg-white rounded-xl shadow-sm overflow-hidden mb-3">
          <View className="px-4 py-3 bg-indigo-50">
            <Text className="font-JakartaBold text-indigo-900">Vital Statistics</Text>
          </View>
          <View className="p-4 flex-row justify-between">
            <VitalItem icon="resize" label="Height" value={userData.height} />
            <VitalItem icon="scale-outline" label="Weight" value={userData.weight} />
            <VitalItem icon="water" label="Blood" value={userData.bloodGroup} />
          </View>
        </View>

        {/* Medical Information Cards */}
        <View className="px-4 space-y-3">
          <InfoCard
            title="Summary"
            content={userData.summary}
            icon="document-text-outline"
          />
          <InfoCard
            title="Mental Health Diagnosis"
            content={userData.mentalHealth}
            icon="pulse-outline"
          />
          <InfoCard
            title="Medical Conditions"
            content={userData.medicalConditions}
            icon="medical-outline"
          />
          <InfoCard
            title="Current Medications"
            content={userData.medications}
            icon="medical"
          />
          <InfoCard
            title="Allergies"
            content={userData.allergies}
            icon="alert-circle-outline"
          />
        </View>
      </ScrollView>
      <CarePlanShow visible={isCarePlanVisible} onClose={() => setIsCarePlanVisible(false)} />
      {/* Bottom Navigation */}
      <View className="flex-row justify-between p-4 bg-white border-t border-gray-200">
        <TouchableOpacity 
          className="px-6 border border-indigo-600 rounded-l-xl py-3  mr-1"
          onPress={() => router.push('/(root)/(tabs)/daily-records')}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">DR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          className="px-6 border border-indigo-600 rounded-r-xl py-3  ml-1"
          onPress={() => setIsCarePlanVisible(true)}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">CP</Text>
          </View>
        </TouchableOpacity>
      </View>
      
    </SafeAreaView>
  );
}

const VitalItem = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="items-center">
    <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mb-2">
      <Ionicons name={icon} size={20} color="#4F46E5" />
    </View>
    <Text className="text-gray-600 text-sm font-JakartaLight mb-1">{label}</Text>
    <Text className="font-JakartaBold text-gray-900">{value}</Text>
  </View>
);

const InfoCard = ({ title, content, icon }: { title: string; content: string; icon: string }) => (
  <View className="bg-white rounded-xl shadow-sm overflow-hidden">
    <View className="p-4">
      <View className="flex-row items-center mb-3">
        <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center">
          <Ionicons name={icon} size={18} color="#4F46E5" />
        </View>
        <Text className="font-JakartaBold text-gray-900 ml-3">{title}</Text>
      </View>
      <Text className="text-gray-600 font-JakartaLight">{content}</Text>
    </View>
  </View>
);