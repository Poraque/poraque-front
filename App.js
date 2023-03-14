import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, Text } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from './screens/SplashScreen';
import HomeScreen from './screens/HomeScreen';
import TabNavScreens from './screens/TabNavScreens';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <TailwindProvider>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavScreens} />
      </Stack.Navigator>
      </NavigationContainer>
    </TailwindProvider>
  );
}
