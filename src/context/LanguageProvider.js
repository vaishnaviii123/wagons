import React, { createContext, useState, useEffect } from 'react';
import { I18nManager, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

export const LanguageContext = createContext();

const LANGUAGE_KEY = 'APP_LANGUAGE';
const LANGUAGE_SELECTED_KEY = 'LANGUAGE_SELECTED';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('EN');

  useEffect(() => {
    const loadLanguage = async () => {
      const lang = await AsyncStorage.getItem(LANGUAGE_KEY);
      if (lang) setLanguage(lang);
      else setLanguage('EN');
    };
    loadLanguage();
  }, []);

  const changeLanguage = async (lang) => {
    if (lang === language) return;

    await AsyncStorage.setItem(LANGUAGE_KEY, lang);
    await AsyncStorage.setItem(LANGUAGE_SELECTED_KEY, 'true');

    const shouldBeRTL = lang === 'AR';

    if (I18nManager.isRTL !== shouldBeRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(shouldBeRTL);
      RNRestart.restart();
      return;
    }

    setLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
