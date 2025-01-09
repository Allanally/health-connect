/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ArchiveListModalProps {
  visible: boolean;
  onClose: () => void;
  submittedPlans: any[];
  onSelectPlan: (plan: any) => void;
}

const ArchiveListModal: React.FC<ArchiveListModalProps> = ({ visible, onClose, submittedPlans, onSelectPlan }) => {
  const scaleValue = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (visible) {
      Animated.spring(scaleValue, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/70 justify-center items-center">
        <Animated.View 
          className="bg-white/90 w-11/12 max-h-[70%] rounded-2xl p-4"
          style={{ transform: [{ scale: scaleValue }] }}
        >
          <View className="flex-row justify-between items-center mb-4">
            <Text className=" text-xl font-JakartaSemiBold">Archive Care Plans</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#4f46e5" />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="mb-4">
            {submittedPlans.map((plan: { id: React.Key | null | undefined; title: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; date: any; }) => (
              <TouchableOpacity
                key={plan.id}
                className="flex-row items-center border border-indigo-500  px-6 py-5 rounded-xl mb-2"
                onPress={() => onSelectPlan(plan)}
              >
                <View className="flex-1">
                  <Text className=" text-lg font-JakartaMedium">{plan.title}</Text>
                </View>
                <Ionicons name="archive-outline" size={24} color="#4f46e5" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
      </View>
    </Modal>
  );
};

const ConfirmArchiveModal = ({ visible, onClose, onConfirm, planTitle }: { visible: boolean; onClose: () => void; onConfirm: () => void; planTitle: string }) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-center items-center">
        <View className="bg-white w-11/12 rounded-2xl p-6">
          <Text className=" text-xl font-JakartaMedium mb-2">Confirm Archive</Text>
          <Text className="font-JakartaLight mb-6">
            Are you sure you want to archive "{planTitle}"? This action can be reversed later.
          </Text>
          
          <View className="flex-row justify-end space-x-3">
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-gray-700"
              onPress={onClose}
            >
              <Text className="text-white font-JakartaLight">Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              className="px-4 py-2 rounded-lg bg-indigo-600"
              onPress={onConfirm}
            >
              <Text className="text-white font-JakartaLight">Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const ArchiveModalManager = ({ isListModalVisible, onClose, submittedPlans }: { isListModalVisible: boolean; onClose: () => void; submittedPlans: any[] }) => {
  const [isConfirmModalVisible, setConfirmModalVisible] = useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const handlePlanSelect = (plan: any) => {
    setSelectedPlan(plan);
    setConfirmModalVisible(true);
  };

  const handleConfirmArchive = () => {
    // Handle archive logic here
    setConfirmModalVisible(false);
    setSelectedPlan(null);
    onClose(); // Close the list modal as well
  };

  const handleConfirmModalClose = () => {
    setConfirmModalVisible(false);
    setSelectedPlan(null);
  };

  return (
    <>
      <ArchiveListModal
        visible={isListModalVisible}
        onClose={onClose}
        submittedPlans={submittedPlans}
        onSelectPlan={handlePlanSelect}
      />
      
      <ConfirmArchiveModal
        visible={isConfirmModalVisible}
        onClose={handleConfirmModalClose}
        onConfirm={handleConfirmArchive}
        planTitle={selectedPlan?.title}
      />
    </>
  );
};

export default ArchiveModalManager;