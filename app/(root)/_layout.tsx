/* eslint-disable prettier/prettier */
import { Stack } from 'expo-router';

const Layout = () => {
    return (
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} /> 
          <Stack.Screen name="home" options={{ headerShown: false }} />   
        </Stack>
    )
}

export default Layout;