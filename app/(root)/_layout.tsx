/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';
import React from 'react';

const Layout = () => {
    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
          <Stack.Screen name="home" options={{ headerShown: false }} />   
          <Stack.Screen name="care-plan-details" options={{ headerShown: false}} />
          <Stack.Screen name="care-plan-history" options={{ headerShown: false}} />
        </Stack>
    )
}

export default Layout;