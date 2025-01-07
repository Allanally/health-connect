/* eslint-disable prettier/prettier */
import { images } from '@/constants';
import { router } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  const serviceUsers = [
    { id: 1, name: 'John Doe', status: 'Active' },
    { id: 2, name: 'Jane Smith', status: 'Active' },
    { id: 3, name: 'Mike Johnson', status: 'Inactive' },
    { id: 4, name: 'Sarah Williams', status: 'Active' },
    { id: 5, name: 'Tom Brown', status: 'Active' },
    { id: 6, name: 'Emily Davis', status: 'Inactive' },
  ];
const handlePress = () => {
  router.push('/(root)/(tabs)/details')
}
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
      <View className="p-5 ">
        <View className="flex-row items-center mb-3">
          <Image className='w-12 h-12' source={images.logo} />
          <Text className="ml-2 text-lg font-['Jakarta-SemiBold']">
            Health Connect
          </Text>
        </View>
        <Text className="text-2xl text-gray-800 font-['Jakarta-Regular']">
          Good afternoon, Jane
        </Text>
      </View>

      <Text className="text-3xl font-['Jakarta-Bold'] -mt-5 p-5 pb-2.5">
        Service users
      </Text>

      
        <View className="p-2.5 flex-row flex-wrap justify-between">
          {serviceUsers.map((user) => (
            <TouchableOpacity 
              key={user.id} 
              className="w-[48%] bg-gray-100 rounded-xl p-4 mb-4 shadow"
              onPress={handlePress}
            >
              <View className="justify-between h-20">
                <Text className="text-base text-gray-800 font-['Jakarta-Medium']">
                  {user.name}
                </Text>
                <Text 
                  className={`text-sm font-['Jakarta-Regular'] ${
                    user.status === 'Active' ? 'text-green-600' : 'text-orange-500'
                  }`}
                >
                  {user.status}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 