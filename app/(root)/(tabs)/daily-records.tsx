/* eslint-disable prettier/prettier */
import { View, Text, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const DailyRecords = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="p-5 border-b border-gray-200">
        <Text className="text-2xl font-JakartaBold">Daily Records</Text>
      </View>
      <ScrollView className="flex-1 p-4">
        {/* Add your daily records content here */}
      </ScrollView>
    </SafeAreaView>
  );
};

export default DailyRecords;