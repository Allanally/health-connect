/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, TextInput, Platform } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

interface AddCarePlanModalProps {
  visible: boolean;
  onClose: () => void;
  initialData?: {
    type?: string;
    description?: string;
    tags?: string;
  };
}

const AddCarePlanModal: React.FC<AddCarePlanModalProps> = ({
  visible,
  onClose,
  initialData,
}) => {
  const [formData, setFormData] = useState({
    type: initialData?.type || '',
    description: initialData?.description || '',
    tags: initialData?.tags || '',
  });

  const handleSave = () => {
    // Implement save logic here
    console.log('Saving form data:', formData);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
      onRequestClose={onClose}
    >
      <SafeAreaView className="flex-1 bg-gray-50">
        <View className="flex-1">
          <View className="bg-white">
            <View className="p-4 border-b border-gray-100 flex-row justify-between items-center">
              <View className="flex-row items-center">
                <View className="w-8 h-8 bg-indigo-100 rounded-full items-center justify-center mr-3">
                  <Ionicons name="medical" size={16} color="#4F46E5" />
                </View>
                <Text className="text-xl font-semibold text-gray-900">Personal Care</Text>
              </View>
              <TouchableOpacity 
                onPress={onClose}
                className="w-8 h-8 items-center justify-center rounded-full bg-gray-100"
              >
                <Ionicons name="close" size={20} color="#6B7280" />
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            <View className="p-4">
              {/* Type */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Type</Text>
                <TextInput
                  value={formData.type}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, type: text }))}
                  className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-900"
                  placeholder="Enter care plan type"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Description */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Description</Text>
                <TextInput
                  value={formData.description}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
                  multiline
                  numberOfLines={Platform.OS === 'ios' ? undefined : 4}
                  className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-900 min-h-[100px]"
                  textAlignVertical="top"
                  placeholder="Enter detailed description"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              {/* Tags */}
              <View className="mb-4">
                <Text className="text-sm font-medium text-gray-700 mb-1">Tags</Text>
                <TextInput
                  value={formData.tags}
                  onChangeText={(text) => setFormData(prev => ({ ...prev, tags: text }))}
                  className="border border-gray-200 rounded-lg px-3 py-2 bg-white text-gray-900"
                  placeholder="Enter tags separated by commas"
                  placeholderTextColor="#9CA3AF"
                />
              </View>
            </View>
          </ScrollView>

          {/* Action Buttons */}
          <View className="p-4 bg-white border-t border-gray-200">
            <View className="flex-row justify-end gap-2">
              <TouchableOpacity
                onPress={onClose}
                className="px-4 py-2 rounded-lg bg-gray-100"
              >
                <Text className="text-gray-600 font-medium">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={handleSave}
                className="px-4 py-2 rounded-lg bg-indigo-600"
              >
                <Text className="text-white font-medium">Save Changes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </Modal>
  );
};

export default AddCarePlanModal;