/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface AddRecordModalProps {
  visible: boolean;
  onClose: () => void;
  onSubmit: (record: any) => void;
  userName: string;
  userRole: string;
}

const RECORD_TYPES = [
  '1:1', 'AHP', 'Activities', 'Correspondence', 'External feedback',
  'Fitness Instructors', 'HCA', 'Home Visit', 'Incidents', 'Key worker session'
];
const CARE_PLANS = [
    {
        id: 1,
        name: "COVID",
        time: "09:15",
        date: "26/11/2024"
    }
]

const AddRecordModal: React.FC<AddRecordModalProps> = ({
  visible,
  onClose,
  onSubmit,
  userName,
  userRole
}) => {
  const [type, setType] = useState('');
  const [carePlan, setCarePlan] = useState('')
  const [description, setDescription] = useState('');
  const [showTypeSelector, setShowTypeSelector] = useState(false);
  const [searchType, setSearchType] = useState('');
  const [searchCarePlan, setSearchCarePlan] = useState('')
  const [selectedCarePlan, setSelectedCarePlan] = useState('');
  const [showCarePlanSelector, setShowCarePlanSelector] = useState(false);

  const filteredTypes = RECORD_TYPES.filter(t => 
    t.toLowerCase().includes(searchType.toLowerCase())
  );
  const filteredCarePlans = CARE_PLANS.filter(c => 
    c.name.toLowerCase().includes(searchCarePlan.toLowerCase())
  )

  const handleSubmit = () => {
    if (!type || !description) {
      return;
    }

    onSubmit({
      type,
      description,
      carePlan: selectedCarePlan,
      createdBy: {
        name: userName,
        role: userRole
      },
      createdOn: new Date().toISOString(),
    });
    
    setType('');
    setDescription('');
    setSelectedCarePlan('');
    onClose();
  };

  const TypeSelector = () => (
    <Modal
      visible={showTypeSelector}
      transparent
      animationType="slide"
      onRequestClose={() => setShowTypeSelector(false)}
    >
      <View className="flex-1 bg-gray-900/50">
        <View className="mt-auto bg-white rounded-t-xl">
          <View className="p-4 border-b border-gray-100">
            <View className="flex-row justify-between items-center mb-4">
              <Text className="text-xl font-semibold">Select Type</Text>
              <TouchableOpacity onPress={() => setShowTypeSelector(false)}>
                <Ionicons name="close" size={24} color="#6B7280" />
              </TouchableOpacity>
            </View>
            <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
              <Ionicons name="search" size={20} color="#6B7280" />
              <TextInput
                value={searchType}
                onChangeText={setSearchType}
                placeholder="Search types..."
                className="flex-1 ml-2"
                placeholderTextColor="#6B7280"
              />
            </View>
          </View>
          <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
            {filteredTypes.map((t) => (
              <TouchableOpacity
                key={t}
                className="px-4 py-3 border-b border-gray-100"
                onPress={() => {
                  setType(t);
                  setShowTypeSelector(false);
                }}
              >
                <Text className="text-gray-900">{t}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );

  const CarePlanSelector = () => (
    <Modal
    visible={showCarePlanSelector}
    transparent
    animationType="slide"
    onRequestClose={() => setShowCarePlanSelector(false)}
  >
    <View className="flex-1 bg-gray-900/50">
      <View className="mt-auto bg-white rounded-t-xl">
        <View className="p-4 border-b border-gray-100">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-xl font-semibold">Select Care Plan</Text>
            <TouchableOpacity onPress={() => setShowCarePlanSelector(false)}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-2">
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              value={searchCarePlan}
              onChangeText={setSearchCarePlan}
              placeholder="Search care plans..."
              className="flex-1 ml-2"
              placeholderTextColor="#6B7280"
            />
          </View>
        </View>
        <ScrollView className="max-h-96" showsVerticalScrollIndicator={false}>
          {filteredCarePlans.map((c) => (
            <TouchableOpacity
              key={c.id}
              className="px-4 py-3 border-b border-gray-100"
              onPress={() => {
                setCarePlan(c.name);
                setShowCarePlanSelector(false);
              }}
            >
              <Text className="text-gray-900">{c.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  </Modal>
  )

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1">
          {/* Header */}
          <View className="px-4 py-3 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-xl font-semibold">Add Record</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#6B7280" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 p-4" contentContainerStyle={{ paddingBottom: 100}}>
            {/* User Info */}
            <View className="flex-row items-center mb-6">
              <View className="h-12 w-12 rounded-full bg-indigo-100 items-center justify-center">
                <Text className="text-indigo-600 text-lg font-semibold">
                  {userName.charAt(0)}
                </Text>
              </View>
              <View className="ml-3">
                <Text className="text-lg font-semibold">{userName}</Text>
                <Text className="text-gray-500">{userRole}</Text>
              </View>
            </View>

            {/* Type Selector */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">Type *</Text>
              <TouchableOpacity
                onPress={() => setShowTypeSelector(true)}
                className="border border-gray-200 rounded-2xl px-4 py-3 flex-row justify-between items-center"
              >
                <Text className={type ? "text-gray-900" : "text-gray-400"}>
                  {type || "Select type"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Description */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">Description *</Text>
              <TextInput
                value={description}
                onChangeText={setDescription}
                placeholder="Enter description..."
                multiline
                numberOfLines={6}
                className="border border-gray-200 rounded-2xl p-3 text-gray-900"
                textAlignVertical="top"
              />
            </View>

            {/* Care Plan Selector */}
            <View className="mb-6">
              <Text className="text-sm font-medium text-gray-700 mb-2">Linked Care Plan</Text>
              <TouchableOpacity
                onPress={() => setShowCarePlanSelector(true)}
                className="border border-gray-200 rounded-2xl px-4 py-3 flex-row justify-between items-center"
              >
                <Text className={carePlan ? "text-gray-900" : "text-gray-400"}>
                  {carePlan || selectedCarePlan || "Select care plan"}
                </Text>
                <Ionicons name="chevron-down" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>

            {/* Attachment Section */}
            <View>
              <Text className="text-sm font-medium text-gray-700 mb-2">Attachments</Text>
              <TouchableOpacity className="border-2 border-dashed border-gray-200 rounded-2xl px-4 py-20 items-center">
                <Ionicons name="cloud-upload-outline" size={24} color="#6B7280" />
                <Text className="text-gray-500 mt-2">Tap to upload files</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="p-4 items-center border-t border-gray-100">
            <TouchableOpacity
              onPress={handleSubmit}
              className="bg-indigo-600 py-3 w-[60%] rounded-3xl items-center"
            >
              <Text className="text-white font-semibold text-lg">Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      <TypeSelector />
      <CarePlanSelector />
    </Modal>
  );
};

export default AddRecordModal;