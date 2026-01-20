import { useContext } from 'react';
import { LanguageContext } from '../context/LanguageProvider';
import { Languages } from '../constants/Languages';

export const useTranslation = () => {
  const { language } = useContext(LanguageContext);

  return (key) => {
    return Languages[key]?.[language] || key;
  };
};
