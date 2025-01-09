/* eslint-disable prettier/prettier */
import React, { useState, useMemo } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import CarePlanShow from '@/components/CarePlanShow';
import { router } from 'expo-router';
import AddCarePlanModal from '@/components/AddCarePlanModal';

interface CarePlan {
  id: string;
  name: string;
  status: 'Submitted' | 'Need revision' | 'Archived';
  updatedBy: string;
  role: string;
  updatedOn: string;
  lastReviewedOn: string;
}

const CarePlanHistoryScreen = () => {
  const [activeTab, setActiveTab] = useState<'submitted' | 'archived'>('submitted');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCarePlanVisible, setIsCarePlanVisible] = useState(false);
  const [showViewCarePlan, setShowViewCarePlan] = useState(false);

  const allCarePlans = useMemo(() => [
    {
      id: '1',
      name: 'Personal Care',
      status: 'Submitted',
      updatedBy: 'nadine fiiona',
      role: 'Provider',
      updatedOn: 'Monday, 6th January 2025',
      lastReviewedOn: 'Monday, 6th January 2025',
    },
    {
      id: '2',
      name: 'COVID',
      status: 'Archived',
      updatedBy: 'nadine fiiona',
      role: 'Provider',
      updatedOn: 'Monday, 6th January 2025',
      lastReviewedOn: 'Monday, 6th January 2025',
    },
    {
      id: '5',
      name: 'COVID',
      status: 'Submitted',
      updatedBy: 'nadine fiiona',
      role: 'Provider',
      updatedOn: 'Monday, 6th January 2025',
      lastReviewedOn: 'Monday, 6th January 2025',
    },
    {
      id: '3',
      name: 'Elimination',
      status: 'Submitted',
      updatedBy: 'Ganza Manager',
      role: 'Manager',
      updatedOn: 'Monday, 6th January 2025',
      lastReviewedOn: 'Monday, 6th January 2025',
    },
    {
      id: '4',
      name: 'Elimination',
      status: 'Need revision',
      updatedBy: 'Ganza Manager',
      role: 'Manager',
      updatedOn: 'Monday, 6th January 2025',
      lastReviewedOn: 'Monday, 6th January 2025',
    },
  ], []);
  

  const filteredCarePlans = useMemo(() => {
    const plans = allCarePlans.filter(plan => 
      (activeTab === 'submitted' ? ['Submitted', 'Need revision'].includes(plan.status) : plan.status === 'Archived')
      &&
      plan.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return plans;
  }, [allCarePlans, activeTab, searchQuery]);

  const renderArchivedItem = ({ item }: { item: CarePlan }) => (
    <TouchableOpacity 
      className="bg-white border-b rounded-xl flex-row items-center justify-between border-gray-100 py-4"
      onPress={() => setShowViewCarePlan(true)}
    >
      <View className="flex-col px-4">
        <View className="flex-1">
          <View className="flex-row items-center">
            <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
              <Ionicons name="document-text" size={16} color="#4F46E5" />
            </View>
            <View>
              <Text className="text-gray-900 font-JakartaMedium">{item.name}</Text>
              <Text className="text-sm font-JakartaLight text-gray-500">{item.updatedBy} • {item.role}</Text>
            </View>
          </View>
        </View>
        
        <View className="flex-row w-full items-center">
          <Text className="text-sm ml-10 font-JakartaLight text-gray-500">{item.updatedOn}</Text>
        </View>
      </View>
      <TouchableOpacity className='mr-4'>
            <Ionicons name='eye' size={24} color="#4f46e5" />  
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderSubmittedItem = ({ item }: { item: CarePlan }) => (
    <TouchableOpacity 
      className="bg-white border border-indigo-100 shadow-sm rounded-lg p-4 mb-3"
      onPress={() => setShowViewCarePlan(true)}
    >
      <View className="flex-row items-center mb-3">
        <View className="w-10 h-10 bg-indigo-100 rounded-full items-center justify-center mr-3">
          <Ionicons name="medical" size={20} color="#4F46E5" />
        </View>
        <View className="flex-1">
          <Text className="text-gray-900 text-lg font-JakartaSemiBold">{item.name}</Text>
          <View className="flex-row items-center mt-1">
          <View 
              className={`rounded-full px-3 py-1 ${
                item.status === 'Submitted' ? 'bg-green-900' : 'bg-red-900'
              }`}
            >
              <Text className={`text-sm font-JakartaLight ${
                item.status === 'Submitted' ? 'text-white' : 'text-white'
              }`}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <Ionicons name="eye-outline" size={24} color="#4F46E5" />
      </View>

      <View className="border-t border-indigo-50 pt-3">
        <View className="flex-row items-center mb-2">
          <View className="w-8 h-8 bg-indigo-50 items-center justify-center rounded-full">
            <Ionicons name="person" size={16} color="#4F46E5" />
          </View>
          <View className="ml-2">
            <Text className="text-gray-900 font-JakartaLight">{item.updatedBy}</Text>
            <Text className="text-indigo-600 font-JakartaLight text-sm">{item.role}</Text>
          </View>
        </View>
        
        <View className="flex-row justify-between mt-2">
          <View>
            <Text className="text-gray-500 font-JakartaLight text-sm">Updated on</Text>
            <Text className="text-gray-700 font-JakartaLight">{item.updatedOn}</Text>
          </View>
          <View>
            <Text className="text-gray-500 font-JakartaLight text-sm">Last reviewed</Text>
            <Text className="text-gray-700 font-JakartaLight">{item.lastReviewedOn}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <View className="px-4 py-3">
        <Text className="text-2xl font-JakartaBold text-gray-900 mb-4">History</Text>
        
        <View className="bg-white border border-indigo-100 rounded-lg mb-4">
          <View className="flex-row items-center px-3 py-2">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              placeholder="Search by care plan..."
              placeholderTextColor="#6B7280"
              value={searchQuery}
              onChangeText={setSearchQuery}
              className="flex-1 px-2 font-JarkataMedium text-gray-900"
            />
            {searchQuery !== '' && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
                <Ionicons name="close-circle" size={20} color="#6B7280" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        <View className="flex-row mb-4">
          <TouchableOpacity
            onPress={() => setActiveTab('submitted')}
            className={`flex-row items-center mr-4 ${
              activeTab === 'submitted' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <Text className="text-gray-900 font-JakartaMedium mr-2">SUBMITTED</Text>
            <View className="bg-indigo-600 rounded-full px-2 py-0.5">
              <Text className="text-white">5</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setActiveTab('archived')}
            className={`flex-row items-center ${
              activeTab === 'archived' ? 'opacity-100' : 'opacity-50'
            }`}
          >
            <Text className="text-gray-900 font-JakartaMedium mr-2">ARCHIVED</Text>
            <View className="bg-indigo-600 rounded-full px-2 py-0.5">
              <Text className="text-white">1</Text>
            </View>
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredCarePlans.map(plan => ({
            ...plan,
            status: plan.status as "Submitted" | "Need revision" | "Archived"
          }))}
          renderItem={activeTab === 'archived' ? renderArchivedItem : renderSubmittedItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 232 }}
        />
      </View>
      <CarePlanShow visible={isCarePlanVisible} onClose={() => setIsCarePlanVisible(false)} />
        <AddCarePlanModal 
         visible={showViewCarePlan}
         onClose={() => setShowViewCarePlan(false)}
        />
      {/* Bottom Navigation */}
      <View className="flex-row absolute bottom-0 w-full justify-between p-4 bg-white border-t border-gray-200">
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

export default CarePlanHistoryScreen;