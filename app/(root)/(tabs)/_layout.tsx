/* eslint-disable prettier/prettier */
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#0286FF",
        tabBarInactiveTintColor: "#666",
        headerShown: false,
        tabBarStyle: {
          ...Platform.select({
            ios: {
              elevation: 0,
              backgroundColor: 'white',
              borderTopWidth: 1,
              borderTopColor: '#E5E5E5',
              height: 80,
              paddingBottom: 20,
            },
            android: {
              elevation: 8,
              backgroundColor: 'white',
              height: 65,
              paddingBottom: 10,
            },
          }),
        },
      }}>
      <Tabs.Screen
        name="daily-records"
        options={{
          title: 'DR',
          tabBarIcon: ({ color }) => (
            <Ionicons name="calendar-outline" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="details"
        options={{
          title: '',
          tabBarIcon: ({ color }) => (
            <Ionicons  />
          ),
        }}
      />
      <Tabs.Screen
        name="care-plans"
        options={{
          title: 'CP',
          tabBarIcon: ({ color }) => (
            <Ionicons name="medical-outline" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
