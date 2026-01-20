import React, { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TouchableOpacity, Text } from 'react-native';
import { useTranslation } from '../hooks/useTranslation';
import colors from '../assets/colors';

import HomeScreen from '../screens/HomeScreen';
import DetailScreen from '../screens/DetailScreen';
import LanguageScreen from '../screens/LanguageScreen';

const Stack = createNativeStackNavigator();
const LANGUAGE_SELECTED_KEY = 'LANGUAGE_SELECTED';
export default function AppNavigator() {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLanguage = async () => {
      const selected = await AsyncStorage.getItem('LANGUAGE_SELECTED');
      setInitialRoute(selected ? 'Home' : 'Language');
    };
    checkLanguage();
  }, []);

  if (!initialRoute) return null;

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{
        headerShown: true, // ✅ headers enabled globally
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="Language"
        component={LanguageScreen}
        options={{ title: 'Select Language' }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation }) => {
          const t = useTranslation();

          return {
            title: t('Home'),
            headerRight: () => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Language')}
                activeOpacity={0.7}
                style={{ paddingHorizontal: 12 }}
              >
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: 14,
                    fontWeight: '600',
                  }}
                >
                  {t('Language')}
                </Text>
              </TouchableOpacity>
            ),
          };
        }}
      />

      <Stack.Screen
        name="Details"
        component={DetailScreen}
        options={{ title: 'Details' }}
      />
    </Stack.Navigator>
  );
}
