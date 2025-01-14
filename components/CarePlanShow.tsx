/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import ReactNativeModal from "react-native-modal";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import CreateCarePlanModal from "./CreateCarePlanModal";

interface CarePlanShowProps {
  visible: boolean;
  onClose: () => void;
}

const CARE_PLANS = [
  {
    id: 1,
    name: "COVID",
    time: "09:15",
    date: "26/11/2024",
    status: "Submitted"
  },
  {
    id: 2,
    name: "Development Phase",
    time: "02:45",
    date: "2/1/2025",
    status: "Drafted"
  },
  {
    id: 3,
    name: "Internal",
    time: "02:45",
    date: "2/1/2025",
    status: "Drafted"
  }
];

const CarePlanShow: React.FC<CarePlanShowProps> = ({ visible, onClose }) => {
  const [modalContent, setModalContent] = useState<'default' | 'edit' | 'create'>('default');
  const [isCreateModalVisible, setCreateModalVisible] = useState(false);

  const handleEditClick = () => {
    setModalContent('edit');
  };

  const handleCreateClick = () => {
    setCreateModalVisible(true);
    onClose(); // Close the main modal
  };

  const handleViewClick = () => {
    onClose();
    router.push('/(root)/(tabs)/care-plans');
  };

  const handleBackClick = () => {
    setModalContent('default');
  };

  const renderContent = () => {
    if (modalContent === 'edit') {
      return (
        <View className='bg-white px-7 py-9 rounded-2xl'>
          <View className="flex-col">
            <Text className='text-lg font-JakartaMedium mb-2'>Edit Care Plan</Text>
            <TouchableOpacity 
              onPress={handleBackClick} 
              className="px-4 flex-row w-[30%] items-center py-1 border mb-4 border-indigo-700 rounded-lg"
            >
              <Text className='text-lg font-JakartaMedium'>Back</Text>
            </TouchableOpacity>
            <View className="w-8" />
            <View className='flex-row gap-x-3 mr-2 justify-end items-end'>
              <View className='flex-row gap-x-1 items-center'>
                <View className="w-3 h-3 rounded-full bg-green-500" />
                <Text className='text-sm font-JakartaLight'>Submitted</Text>
              </View>
              <View className='flex-row items-center gap-x-1'>
                <View className="w-3 h-3 rounded-full bg-slate-500" />
                <Text className='text-sm font-JakartaLight'>Drafted</Text>
              </View>
            </View>
            <View className="flex-wrap flex gap-4 mt-2 flex-row py-2 px-1-2 rounded-b-3xl">
              {CARE_PLANS.map((plan) => (
                <TouchableOpacity
                  key={plan.id}
                  className={`w-[44.5%] py-3 px-4 rounded-lg border border-l-4 ${
                    plan.status === 'Submitted' ? 'border-green-500' : 'border-gray-500'
                  }`}
                >
                  <Text className='text-lg font-JakartaMedium' numberOfLines={1}>
                    {plan.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      );
    }

    return (
      <View className='bg-white px-7 py-9 rounded-2xl items-center'>
        <Text className='text-lg text-center font-JakartaMedium mb-1'>Care Plans</Text>
        <Text className='text-md text-center font-JakartaMedium'>What would you like to do?</Text>
        <View className='flex flex-row mt-3 gap-x-4'>
          <TouchableOpacity
            className='py-4 px-12 rounded-xl items-center justify-center border border-indigo-600 mb-2'
            onPress={handleCreateClick}
          >
            <Ionicons name='add' size={30} color='#4f46e5' />
            <Text>Create</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className='py-4 px-12 rounded-xl items-center justify-center border border-indigo-600 mb-2'
            onPress={handleEditClick}
          >
            <Ionicons name='create-outline' size={30} color='#4f46e5' />
            <Text>Edit</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          className='py-4 px-12 rounded-xl items-center justify-center border border-indigo-600 mb-2'
          onPress={handleViewClick}
        >
          <Ionicons name='eye' size={30} color='#4f46e5' />
          <Text>View</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <ReactNativeModal 
        isVisible={visible}
        onBackdropPress={onClose}
        style={{ margin: 0, justifyContent: 'center', padding: 20 }}
        animationIn="fadeIn"
        animationOut="fadeOut"
        useNativeDriver
      >
        <GestureHandlerRootView style={{ flex: 0 }}>
          {renderContent()}
        </GestureHandlerRootView>
      </ReactNativeModal>

      <CreateCarePlanModal 
        visible={isCreateModalVisible}
        onClose={() => setCreateModalVisible(false)}
      />
    </>
  );
};

export default CarePlanShow;