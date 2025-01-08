/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack>
          <Stack.Screen name="care-plans" options={{ headerShown: false }} /> 
          <Stack.Screen name="daily-records" options={{ headerShown: false }} />   
          <Stack.Screen name="details" options={{ headerShown: false}} />
        </Stack>
    )
}

export default Layout;