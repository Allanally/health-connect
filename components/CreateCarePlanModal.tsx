/* eslint-disable prettier/prettier */
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ReactNativeModal from 'react-native-modal';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { router } from 'expo-router';

interface CreateCarePlanModalProps {
  visible: boolean;
  onClose: () => void;
}

const CARE_PLAN_CATEGORIES = [
  { id: 1, name: 'Personal care', status: 'drafted' },
  { id: 2, name: 'COVID', status: 'needs_revision' },
  { id: 3, name: 'Oral care', status: 'drafted' },
  { id: 4, name: 'Diabetes passport', status: 'submitted' },
  { id: 5, name: 'Eating and drinking', status: 'drafted' },
  { id: 6, name: 'Eye care', status: 'submitted' },
  { id: 7, name: 'Finance', status: 'drafted' },
  { id: 8, name: 'Physical', status: 'needs_revision' },
  { id: 9, name: 'Self harm', status: 'submitted' },
  { id: 10, name: 'Sleep', status: 'drafted' }
];

const CreateCarePlanModal: React.FC<CreateCarePlanModalProps> = ({ visible, onClose }) => {

  const handlePush = (planName: any) => {
    router.push({
      pathname: '/(root)/care-plan-details',
      params: {
        carePlanTitle: planName
      }
    })
  }
  return (
    <ReactNativeModal
      isVisible={visible}
      style={{ margin: 0 }}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      useNativeDriver
    >
      <GestureHandlerRootView style={{ flex: 1, backgroundColor: 'white' }}>
        <ScrollView 
          className="flex-1" 
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">
            <View className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200">
              <View className="flex-row items-center space-x-2">
                <Text className="text-xl font-JakartaBold">CARE PLANS</Text>
              </View>
              <TouchableOpacity onPress={onClose}>
                <Ionicons name="close" size={24} />
              </TouchableOpacity>
            </View>

            <ScrollView 
              className="flex-1 px-4 py-2" 
              showsVerticalScrollIndicator={false}
            >
              <View className="flex-row flex-wrap justify-between">
                {CARE_PLAN_CATEGORIES.map((plan) => (
                  <TouchableOpacity
                    key={plan.id}
                    className="w-[48%] mb-3 p-4 rounded-lg border border-l-4 border-neutral-300"
                    activeOpacity={0.7}
                    onPress={() => handlePush(plan.name)}
                  >
                    <View className="flex-row justify-between items-center">
                      <Text 
                        className="font-JakartaMedium text-indigo-800 flex-1 mr-2" 
                        numberOfLines={2}
                      >
                        {plan.name}
                      </Text>
                      <Ionicons 
                        name="add-circle" 
                        size={16} 
                        color="gray"
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </GestureHandlerRootView>
    </ReactNativeModal>
  );
};

export default CreateCarePlanModal;