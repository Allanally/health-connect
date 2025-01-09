/* eslint-disable prettier/prettier */
import { View, Text, ScrollView, TextInput, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from '@expo/vector-icons';
import { useState } from "react";
import { router } from "expo-router";
import React from "react";

const CarePlans = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 2;
  //const [date, setDate] = useState(new Date());
 // const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDays, setSelectedDays] = useState('30');
  const [showDaysDropdown, setShowDaysDropdown] = useState(false);
  const [selectedContributors, setSelectedContributors] = useState<string[]>([]);
  const [showContributorsDropdown, setShowContributorsDropdown] = useState(false);

  const daysOptions = ['7', '14', '30', '60', '90'];

  const contributorOptions = [
    { id: '1', name: 'Dr. Sarah Johnson' },
    { id: '2', name: 'Nurse Mike Brown' },
    { id: '3', name: 'Therapist Emma Wilson' },
    { id: '4', name: 'Dr. David Lee' },
    { id: '5', name: 'Nurse Rachel Green' },
  ];

{/*  const onDateChange = (event: Event, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === 'ios');
    if (selectedDate) {
      setDate(selectedDate);
    }
  };*/}

  const renderContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <View className="w-[96%] ml-2">
            {/* Section 1: Where am I now? */}
            <View className="mb-6 ">
              <Text className="text-xl font-JakartaBold mb-3">Where am I now?</Text>
              <TextInput
                className="bg-gray-50 p-4 rounded-xl border border-gray-200"
                multiline
                placeholder="Type here..."
                textAlignVertical="top"
              />
            </View>

            {/* Section 2: Service User Information */}
            <View className="mb-6">
              <Text className="text-xl font-JakartaBold mb-3">Service user information</Text>
              <View className="bg-gray-50 p-4 rounded-xl border border-gray-200">
                <InfoRow label="Name" value="Jane Doe" />
                <InfoRow label="Age" value="25" />
                <InfoRow label="Gender" value="Male" />
                <InfoRow label="NHS Number" value="666666" />
                
                <Text className="mt-4 mb-2 font-JakartaMedium">
                  Has the care plan been discussed with the service user?
                </Text>
                <View className="flex-row gap-4">
                  <TouchableOpacity className="px-6 py-2 border border-gray-300 rounded-lg">
                    <Text>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity className="px-6 py-2 border border-gray-300 rounded-lg">
                    <Text>No</Text>
                  </TouchableOpacity>
                </View>

                <View className="mt-4 mb-2">
                  <Text className="font-JakartaMedium mb-2">When do you want to review this?</Text>
                  <TouchableOpacity 
                    onPress={() => setShowDaysDropdown(!showDaysDropdown)}
                    className="border border-gray-300 rounded-lg px-4 py-3"
                  >
                    <View className="flex-row justify-between items-center">
                      <Text>{selectedDays} days</Text>
                      <Ionicons 
                        name={showDaysDropdown ? "chevron-up" : "chevron-down"} 
                        size={20} 
                        color="#666" 
                        className="mr-4"
                      />
                    </View>
                  </TouchableOpacity>
                  
                  {showDaysDropdown && (
                    <View className="border border-gray-300 rounded-lg mt-1 bg-white">
                      {daysOptions.map((days) => (
                        <TouchableOpacity
                          key={days}
                          className="px-4 py-3 border-b border-gray-200"
                          onPress={() => {
                            setSelectedDays(days);
                            setShowDaysDropdown(false);
                          }}
                        >
                          <Text className={`${selectedDays === days ? 'text-primary-500 font-JakartaBold' : ''}`}>
                            {days} days
                          </Text>
                        </TouchableOpacity>
                      ))}
                    </View>
                  )}
                  <View className="flex mt-2 flex-row justify-start items-center">
                    <Text className=" font-JakartaMedium">Provider:</Text> 
                    <Text className="font-JakartaLight ml-1">James Smith</Text>
                  </View>
                  <View>
                    <Text className="mt-4 mb-2 font-JakartaMedium">Care Plan Contributors</Text>
                    <TouchableOpacity 
                      onPress={() => setShowContributorsDropdown(!showContributorsDropdown)}
                      className="border border-gray-300 rounded-lg px-4 py-3"
                    >
                      <View className="flex-row justify-between items-center">
                        <Text className="text-gray-600">
                          {selectedContributors.length > 0 
                            ? `${selectedContributors.length} selected`
                            : 'Select contributors'}
                        </Text>
                        <Ionicons 
                          name={showContributorsDropdown ? "chevron-up" : "chevron-down"} 
                          size={20} 
                          color="#666" 
                          className="mr-4"
                        />
                      </View>
                    </TouchableOpacity>
                    
                    {showContributorsDropdown && (
                      <View className="border border-gray-300 rounded-lg mt-1 bg-white">
                        {contributorOptions.map((contributor) => (
                          <TouchableOpacity
                            key={contributor.id}
                            className="px-4 py-3 border-b border-gray-200 flex-row justify-between items-center"
                            onPress={() => {
                              setSelectedContributors(prev => {
                                if (prev.includes(contributor.id)) {
                                  return prev.filter(id => id !== contributor.id);
                                }
                                return [...prev, contributor.id];
                              });
                            }}
                          >
                            <Text className={`${
                              selectedContributors.includes(contributor.id) 
                                ? 'text-primary-500 font-JakartaBold' 
                                : 'font-JakartaRegular'
                            }`}>
                              {contributor.name}
                            </Text>
                            {selectedContributors.includes(contributor.id) && (
                              <Ionicons name="checkmark" size={20} color="#0286FF" />
                            )}
                          </TouchableOpacity>
                        ))}
                      </View>
                    )}

                    {selectedContributors.length > 0 && (
                      <View className="mt-2 flex-wrap flex-row gap-2">
                        {selectedContributors.map(id => {
                          const contributor = contributorOptions.find(c => c.id === id);
                          return (
                            <View key={id} className="bg-primary-100 px-3 py-1 rounded-full flex-row items-center">
                              <Text className="text-primary-500 font-JakartaMedium text-sm">
                                {contributor?.name}
                              </Text>
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
          </View>
        );
      
      case 2:
        return (
          <View className="p-4">
            <Text className="text-2xl font-JakartaBold mb-6">Preview</Text>
            
            <PreviewSection 
              title="Where am I now?"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="Where do I want to get?"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="How do I get there?"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="My Strengths"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="Positive thoughts"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="Comments"
              content="An actual response goes here"
            />
            
            <PreviewSection 
              title="How can I tell how I am doing?"
              content="An actual response goes here"
            />
          </View>
        );
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
      {/* Header with Back Button and Progress Bar */}
      <View className="p-4">
        <TouchableOpacity className="flex-row items-center justify-center rounded-xl w-[30%] p-2 border border-neutral-200" onPress={() => router.back()}>
          <Text className="ml-2 text-lg font-JakartaMedium">Back</Text>
        </TouchableOpacity>
        
        <View className="mt-4">
          <View className="flex-row items-center">
            <Text className="text-lg font-JakartaMedium">Careplans</Text>
            <Ionicons name="chevron-forward" size={20} color="#666" />
            <Text className="text-lg font-JakartaBold">Oral Care</Text>
          </View>
          
          <View className="h-1 bg-gray-200 rounded-full mt-4">
            <View 
              className="h-1 bg-primary-500 rounded-full"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </View>
        </View>
      </View>

     
        {renderContent()}
     

        <View className="p-4">
  <View className="flex-row justify-between">
    {currentStep > 1 && (
      <TouchableOpacity 
        className="px-6 py-3 bg-gray-100 rounded-lg"
        onPress={() => setCurrentStep(Math.max(1, currentStep - 1))}
      >
        <Text className="font-JakartaMedium">Previous</Text>
      </TouchableOpacity>
    )}
    <TouchableOpacity 
      className="px-6 py-3 bg-primary-500 rounded-lg"
      onPress={() => {
        if (currentStep === totalSteps) {
          // Handle form submission
          console.log('Form submitted');
        } else {
          setCurrentStep(Math.min(totalSteps, currentStep + 1));
        }
      }}
    >
      <Text className="font-JakartaMedium text-white">
        {currentStep === totalSteps ? 'Submit' : 'Next'}
      </Text>
    </TouchableOpacity>
  </View>
</View>

     </ScrollView>
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
          onPress={() => router.push('/(root)/(tabs)/care-plans')}
        >
          <View className="flex-row items-center justify-center">
            <Text className=" font-medium ml-2">CP</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <View className="flex-row justify-between items-center py-2">
    <Text className="font-JakartaMedium text-gray-600">{label}:</Text>
    <Text className="font-JakartaBold">{value}</Text>
  </View>
);

const PreviewSection = ({ title, content }: { title: string; content: string }) => (
  <View className="mb-6">
    <Text className="text-lg font-JakartaBold mb-2">{title}</Text>
    <Text className="text-gray-600 font-JakartaRegular">{content}</Text>
  </View>
);

export default CarePlans;