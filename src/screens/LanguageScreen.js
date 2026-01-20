import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  I18nManager,
} from 'react-native';
import { LanguageContext } from '../context/LanguageProvider';
import { useTranslation } from '../hooks/useTranslation';
import colors from '../assets/colors';

export default function LanguageScreen({ navigation }) {
  const { changeLanguage, language } = useContext(LanguageContext);
  const [selected, setSelected] = useState(language);
  const t = useTranslation();

  const handleSave = async () => {
    const needsRTLRestart = selected === 'AR';
    await changeLanguage(selected);

    if (!needsRTLRestart) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home' }],
      });
    }
  };


  const LANGUAGES = [
    { code: 'EN', label: 'English' },
    { code: 'FN', label: 'French' },
    { code: 'AR', label: 'العربية' },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{t('SelectLanguage')}</Text>
      <Text style={styles.subHeading}>
        {t('ChooseYourPreferredLanguage')}
      </Text>

      <View style={styles.list}>
        {LANGUAGES.map(({ code, label }) => {
          const isSelected = selected === code;

          return (
            <TouchableOpacity
              key={code}
              onPress={() => setSelected(code)}
              activeOpacity={0.8}
              style={[
                styles.card,
                isSelected && styles.selectedCard,
              ]}
            >
              <Text
                style={[
                  styles.cardText,
                  isSelected && styles.selectedText,
                ]}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity
        style={[
          styles.saveButton,
          selected === language && styles.disabledButton,
        ]}
        onPress={handleSave}
        disabled={selected === language}
      >
        <Text style={styles.saveText}>{t('Save')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#fff',
  },

  heading: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 40,
  },

  subHeading: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    marginVertical: 10,
  },

  list: {
    marginTop: 30,
  },

  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 12,
    backgroundColor: '#fafafa',
  },

  selectedCard: {
    borderColor: colors.primary,
    backgroundColor: '#f3f7ff',
  },

  cardText: {
    fontSize: 16,
    fontWeight: '500',
  },

  selectedText: {
    color: colors.primary,
    fontWeight: '600',
  },

  saveButton: {
    marginTop: 'auto',
    backgroundColor: colors.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },

  disabledButton: {
    backgroundColor: '#ccc',
  },

  saveText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
