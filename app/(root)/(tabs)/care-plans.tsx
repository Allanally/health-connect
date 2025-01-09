/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import CarePlanShow from '@/components/CarePlanShow';
import ArchiveModalManager from '@/components/ArchiveModal';
import CreateCarePlanModal from '@/components/CreateCarePlanModal';

const CarePlansScreen = () => {
  const [isCarePlanVisible, setIsCarePlanVisible] = useState(false);
  const [showListModal, setListModalVisible] = useState(false)
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);
  const draftedPlans = [
    {
      id: 1,
      title: 'Personal care',
      image: require('../../../assets/images/personal-care.jpg'),
    },
  ];

  const submittedPlans = [
    {
      id: 2,
      title: 'COVID',
      image: require('../../../assets/images/covid.jpg'),
    },
    {
      id: 3,
      title: 'Elimination',
      image: require('../../../assets/images/covid.jpg'),
    },
    {
      id: 4,
      title: '  Manager',
      image: require('../../../assets/images/covid.jpg'),
    },
  ];

  const renderCarePlanCard = (plan: { id: any; title: any; image: any; }, type: string) => (
    <TouchableOpacity
      key={plan.id}
      className={`bg-white rounded-xl mb-4 overflow-hidden border-2 ${
        type === 'drafted' ? 'border-gray-500' : 'border-yellow-300'
      }`}
      onPress={() => router.push('/(root)/care-plan-details')}
    >
      <Image 
        source={plan.image} 
        className="w-full h-40"
      />
      <View className="p-3">
        <Text className="text-lg font-JakartaSemiBold text-gray-800">
          {plan.title}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <View className="bg-white border-b border-gray-200">
        <View className="flex-row justify-between items-center px-4 py-3">
          <Text className="text-2xl font-JakartaSemiBold text-gray-800">
            Care plans
          </Text>
          <View className="flex-row items-center space-x-2">
            <TouchableOpacity className="p-2" onPress={() => router.push('/(root)/care-plan-history')}>
              <Ionicons name="time-outline" size={24} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2" onPress={() => setListModalVisible(true)}>
              <Ionicons name="archive-outline" size={24} color="#4F46E5" />
            </TouchableOpacity>
            <TouchableOpacity className="bg-indigo-600 px-4 py-2 rounded-md" onPress={() => setCreateModalVisible(true)}>
              <Text className="text-white font-JakartaMedium">
                Create
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <ArchiveModalManager 
       isListModalVisible={showListModal}
       onClose={() => setListModalVisible(false)}
       submittedPlans={submittedPlans}
      />
      <CreateCarePlanModal
      visible={isCreateModalVisible}
      onClose={() => setCreateModalVisible(false)}
      />
      <ScrollView className="flex-1 px-4 py-4" contentContainerStyle={{ paddingBottom: 25}} showsVerticalScrollIndicator={false}>
        {/* Drafted Section */}
        <View className="mb-6">
          <Text className="text-lg font-JakartaMedium text-gray-700 mb-3">
            Drafted
          </Text>
          {draftedPlans.map(plan => renderCarePlanCard(plan, 'drafted'))}
        </View>

        {/* Submitted Section */}
        <View>
          <Text className="text-lg font-JakartaMedium text-gray-700 mb-3">
            Submitted
          </Text>
          {submittedPlans.map(plan => renderCarePlanCard(plan, 'submitted'))}
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
            <Text className=" font-JakartaMedium ml-2">DR</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity 
          className="px-6 border border-indigo-600 rounded-r-xl py-3  ml-1"
          onPress={() => setIsCarePlanVisible(true)}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-JakartaMedium ml-2">CP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CarePlansScreen;