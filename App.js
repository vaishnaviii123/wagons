import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';

import AppNavigator from './src/navigation/AppNavigator';
import { LogBox } from 'react-native';
import { TasksProvider } from './src/context/TasksContext';
import colors from './src/assets/colors';
import { LanguageProvider } from './src/context/LanguageProvider'

enableScreens();
LogBox.ignoreAllLogs(true);

export default function App() {

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <LanguageProvider>
        <TasksProvider>
          <NavigationContainer theme={isDarkMode ? DarkTheme : DefaultTheme}>
            <StatusBar
              barStyle={isDarkMode ? 'light-content' : 'dark-content'}
              backgroundColor={isDarkMode ? colors.dark : colors.light}
            />
            <AppNavigator />
          </NavigationContainer>
        </TasksProvider>
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
