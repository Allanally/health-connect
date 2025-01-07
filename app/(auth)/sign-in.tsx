/* eslint-disable prettier/prettier */
import CustomButton from "@/components/CustomButton";
import InputField from "@/components/InputField";
import OAuth from "@/components/OAuth";
import { icons, images } from "@/constants";
import { router } from "expo-router";
import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import { userApi } from "@/src/utils/api";


const SignIn = () => {
    const handlePress = () =>{
        router.push('/(auth)/forgot-password')
    }
    const handlePush = () => {
        router.push('/(root)/home')
    }
    const fetchUsers = async () => {
        try {
          const users = await userApi.getUsers();
          console.log(users);
        } catch (error) {
          console.error('Failed to fetch users:', error);
        }
      };
    return (
        <ScrollView className="flex-1 bg-white" showsVerticalScrollIndicator={false}>
            <View className="flex flex-col mt-6 items-center justify-center bg-white">
                {/* headers*/}
                <View className="relative flex flex-col items-center w-full">
                <Image className="z-0 w-28 h-24" source={images.hc} />
                <Text className="text-xl text-center mt-2 font-JakartaBold mb-2">Welcome Back!</Text>
                <Text className="text-md mb-5 ml-8 mr-8 font-JakartaLight mt-1 text-neutral-500">So glad to have you here! Enter your credentials below to 
                    access your account.
                </Text>
               <OAuth />
               <TouchableOpacity onPress={fetchUsers}>
                <Text>Fetch Users</Text>
               </TouchableOpacity>
                </View>
                {/*Next*/}
                <View className="flex flex-col mt-3 w-[90%]">
                <InputField Label="Email Address" placeholder="Type here ..." icon={icons.email}  />
                <InputField Label="Password" placeholder="******" icon={icons.lock} secureTextEntry={true}/>
                <TouchableOpacity onPress={handlePress}>
                <Text className="ml-2 text-[16px] text-blue-500 font-JakartaLight">Forgot Password?</Text>
                </TouchableOpacity>
                <CustomButton title="Login" className="mt-5 mb-12" onPress={handlePush} />
                </View>
            </View>
        </ScrollView>
    )
}


export default SignIn;

