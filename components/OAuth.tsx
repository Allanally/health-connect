/* eslint-disable prettier/prettier */
import { View, Text, Image, TouchableOpacity } from "react-native";
import { images } from "@/constants";
 const OAuth = () => {

   return (
    <View>
        <TouchableOpacity className="px-9 py-3 flex flex-row justify-center items-center rounded-full border border-neutral-300">
        <Image source={images.msc} 
            resizeMode="contain"
            className="w-7 h-7 mx-2" />
            <Text className="text-lg font-JakartaMedium">Continue with microsoft</Text>
        </TouchableOpacity>
         <View className="flex flex-row justify-center items-center mt-4 
        gap-x-3">
            <View className="flex-1 h-[1px] bg-general-100" />
            <Text className="text-lg text-neutral-400 -mt-1">OR</Text>
            <View className="flex-1 h-[1px] bg-general-100" />
            
        </View>
    </View>
   )
 }

 export default OAuth;