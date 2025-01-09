/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import React from "react";

const CarePlans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  const [selectedDays, setSelectedDays] = useState('30');
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [selectedContributors, setSelectedContributors] = useState<string[]>([]);
  const [showContributorsDropdown, setShowContributorsDropdown] = useState(false);
  const { carePlanTitle } = useLocalSearchParams();

  const daysOptions = ['7', '14', '30', '60', '90'];
  const contributorOptions = [
    { id: '1', name: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Nurse Mike Brown' },
    { id: '3', name: 'Therapist Emma Wilson' },
    { id: '4', name: 'Dr. David Lee' },
    { id: '5', name: 'Nurse Rachel Green' },
  ];

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="px-4 py-2">
            {/* Header Card */}
            <View className="bg-primary-50 p-4 rounded-2xl mb-6">
              <Text className="text-primary-600 text-sm font-JakartaMedium mb-1">Current Care Plan</Text>
              <Text className="text-2xl font-JakartaBold text-gray-900">{carePlanTitle}</Text>
            </View>

            {/* Where am I now? section */}
            <View className="mb-8">
              <Text className="text-xl font-JakartaBold mb-3 text-gray-900">Where am I now?</Text>
              <TextInput
                className="bg-white p-4 rounded-xl border border-gray-200 min-h-[120px] shadow-sm"
                multiline
                placeholder="Describe your current situation..."
                textAlignVertical="top"
              />
            </View>

            {/* Service User Information Card */}
            <View className="bg-white rounded-2xl border border-gray-100 shadow-sm mb-6">
              <View className="p-4 border-b border-gray-100">
                <Text className="text-xl font-JakartaBold text-gray-900">Service User Information</Text>
              </View>
              
              <View className="p-4 space-y-4">
                {/* User Details Grid */}
                <View className="bg-gray-50 p-4 rounded-xl grid-cols-2 gap-4">
                  <InfoRow label="Name" value="Jane Doe" />
                  <InfoRow label="Age" value="25" />
                  <InfoRow label="Gender" value="Male" />
                  <InfoRow label="NHS Number" value="666666" />
                </View>

                {/* Care Plan Discussion */}
                <View className="mt-6">
                  <Text className="font-JakartaBold text-gray-900 mb-3">
                    Has the care plan been discussed?
                  </Text>
                  <View className="flex-row gap-3">
                    <TouchableOpacity className="flex-1 py-3 bg-primary-50 rounded-xl items-center">
                      <Text className="font-JakartaMedium text-primary-600">Yes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="flex-1 py-3 border border-gray-200 rounded-xl items-center">
                      <Text className="font-JakartaMedium text-gray-600">No</Text>
                    </TouchableOpacity>
                  </View>
                </View>

                {/* Review Period Selection */}
                <View className="mt-6">
                  <Text className="font-JakartaBold text-gray-900 mb-3">Review Period</Text>
                  <TouchableOpacity 
                    onPress={() => setShowDaysDropdown(!showDaysDropdown)}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="font-JakartaMedium">{selectedDays} days</Text>
                      <Ionicons name={showDaysDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
                    </View>
                  </TouchableOpacity>
                  
                  {showDaysDropdown && (
                    <View className="bg-white border border-gray-200 rounded-xl mt-2 overflow-hidden">
                      {daysOptions.map((days) => (
                        <TouchableOpacity
                          key={days}
                          className="p-4 border-b border-gray-100"
                          onPress={() => {
                            setSelectedDays(days);
                            setShowDaysDropdown(false);
                          }}
                        >
                          <Text className={`font-JakartaMedium ${selectedDays === days ? 'text-primary-600' : 'text-gray-600'}`}>
                            {days} days
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                </View>

                {/* Provider Info */}
                <View className="bg-gray-50 p-4 rounded-xl">
                  <Text className="font-JakartaBold text-gray-900 mb-2">Provider</Text>
                  <Text className="font-JakartaMedium text-gray-600">James Smith</Text>
                </View>

                {/* Contributors Section */}
                <View className="mt-6">
                  <Text className="font-JakartaBold text-gray-900 mb-3">Care Plan Contributors</Text>
                  <TouchableOpacity 
                    onPress={() => setShowContributorsDropdown(!showContributorsDropdown)}
                    className="bg-white border border-gray-200 rounded-xl p-4"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text className="text-gray-600 font-JakartaMedium">
                        {selectedContributors.length > 0 
                          ? `${selectedContributors.length} contributors selected`
                          : 'Select contributors'}
                      </Text>
                      <Ionicons name={showContributorsDropdown ? "chevron-up" : "chevron-down"} size={20} color="#666" />
                    </View>
                  </TouchableOpacity>
                  
                  {showContributorsDropdown && (
                    <View className="bg-white border border-gray-200 rounded-xl mt-2 overflow-hidden">
                      {contributorOptions.map((contributor) => (
                        <TouchableOpacity
                          key={contributor.id}
                          className="p-4 border-b border-gray-100 flex-row justify-between items-center"
                          onPress={() => {
                            setSelectedContributors(prev => {
                              if (prev.includes(contributor.id)) {
                                return prev.filter(id => id !== contributor.id);
                              }
                              return [...prev, contributor.id];
                            });
                          }}
                        >
                          <Text className={`font-JakartaMedium ${
                            selectedContributors.includes(contributor.id) 
                              ? 'text-primary-600' 
                              : 'text-gray-600'
                          }`}>
                            {contributor.name}
                          </Text>
                          {selectedContributors.includes(contributor.id) && (
                            <Ionicons name="checkmark-circle" size={20} color="#0286FF" />
                          )}
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}

                  {selectedContributors.length > 0 && (
                    <View className="mt-3 flex-row flex-wrap gap-2">
                      {selectedContributors.map(id => {
                        const contributor = contributorOptions.find(c => c.id === id);
                        return (
                          <View key={id} className="bg-primary-50 rounded-full px-4 py-2 flex-row items-center">
                            <Text className="text-primary-600 font-JakartaMedium">{contributor?.name}</Text>
                            <TouchableOpacity 
                              onPress={() => setSelectedContributors(prev => prev.filter(cId => cId !== id))}
                              className="ml-2"
                            >
                              <Ionicons name="close-circle" size={16} color="#0286FF" />
                            </TouchableOpacity>
                          </View>
                        );
                      })}
                    </View>
                  )}
                </View>
              </View>
            </View>
          </View>
        );
      
      case 2:
        return (
          <View className="p-4">
            <Text className="text-2xl font-JakartaBold mb-6">Preview</Text>
            {['Where am I now?', 'Where do I want to get?', 'How do I get there?', 
              'My Strengths', 'Positive thoughts', 'Comments', 'How can I tell how I am doing?'].map((title) => (
              <PreviewSection 
                key={title}
                title={title}
                content="Content will appear here based on your input"
              />
            ))}
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <ScrollView className="flex-1" contentContainerStyle={{ paddingBottom: 100}} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="p-4 bg-white border-b border-gray-100">
          <TouchableOpacity 
            className="flex-row items-center bg-gray-50 self-start px-4 py-2 rounded-xl"
            onPress={() => router.back()}
          >
            <Ionicons name="arrow-back" size={20} color="#666" />
            <Text className="ml-2 font-JakartaMedium text-gray-700">Back</Text>
          </TouchableOpacity>
          
          {/* Progress */}
          <View className="mt-4">
            <View className="flex-row items-center mb-3">
              <Text className="text-gray-600 font-JakartaMedium">Step {currentStep} of {totalSteps}</Text>
              <Text className="mx-2 text-gray-400">•</Text>
              <Text className="text-primary-600 font-JakartaMedium">
                {currentStep === 1 ? 'Basic Information' : 'Preview'}
              </Text>
            </View>
            
            <View className="h-1 bg-gray-100 rounded-full">
              <View 
                className="h-1 bg-primary-500 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </View>
          </View>
        </View>

        {renderContent()}

        {/* Navigation Buttons */}
        <View className="p-4 ">
          <View className="flex-row items-center justify-between">
            {currentStep > 1 && (
              <TouchableOpacity 
                className="px-3 py-3 rounded-xl flex mr-2 items-center"
                onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
              >
                <Text className="font-JakartaMedium text-gray-700">Previous</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity 
              className="px-3 py-3 bg-primary-500 rounded-xl flex items-center ml-2"
              onPress={() => {
                if (currentStep === totalSteps) {
                  console.log('Form submitted');
                } else {
                  setCurrentStep(Math.min(totalSteps, currentStep + 1));
                }
              }}
            >
              <Text className="font-JakartaMedium text-white">
                {currentStep === totalSteps ? 'Submit' : 'Continue'}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

         {/* Bottom Navigation */}
         <View className="flex-row absolute bottom-0 w-full justify-between p-4 bg-white border-t border-gray-200">
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
          onPress={() => router.push('/(root)/(tabs)/care-plans')}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">CP</Text>
          </View>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className="font-JakartaMedium text-gray-500">{label}</Text>
    <Text className="font-JakartaBold text-gray-900">{value}</Text>
  </View>
);

const PreviewSection = ({ title, content }: { title: string; content: string }) => (
  <View className="mb-6 bg-white p-4 rounded-xl border border-gray-100">
    <Text className="text-lg font-JakartaBold text-gray-900 mb-2">{title}</Text>
    <Text className="text-gray-600 font-JakartaRegular">{content}</Text>
  </View>
);

export default CarePlans;