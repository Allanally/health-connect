/* eslint-disable prettier/prettier */
import { InputFieldProps } from "@/types/type"
import { Image, Keyboard, KeyboardAvoidingView, Platform, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import { useState } from "react";
const InputField = ({
  Label,
  LabelStyle,
  icon,
  secureTextEntry = false,
  containerStyle,
  inputStyle,
  iconStyle,
  className,
  isRequired=false,
  ...props
}: InputFieldProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-2 w-full">
          <Text className={`text-lg text-black font-JakartaSemiBold mb-3 ${LabelStyle}`}>
            {Label}
          </Text>
          <View
         className={`flex flex-row justify-start items-center relative 
          bg-white border border-neutral-100 h-14
          focus:border-primary-500 ${
            isRequired ? "rounded-full bg-neutral-200" : "rounded-2xl" 
          } ${containerStyle}`}
          >
            {icon && <Image source={icon} className={`w-6 h-6 ml-4 ${iconStyle}`} />}
            <TextInput
              className={`rounded-full p-4 font-JakartaSemiBold text-[15px] flex-1 ${inputStyle} text-left`}
              secureTextEntry={isPasswordVisible}
              {...props}
            />
            {secureTextEntry && (
              <TouchableWithoutFeedback onPress={togglePasswordVisibility}>
                <Image
                  source={
                    isPasswordVisible
                      ? require('@/assets/icons/show-password.png') 
                      : require('@/assets/icons/hide-password.png') 
                  }
                  className="absolute right-4 w-6 h-6"
                />
              </TouchableWithoutFeedback>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default InputField;
