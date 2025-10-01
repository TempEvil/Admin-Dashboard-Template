import i18next from "i18next";
import { initReactI18next } from "react-i18next";

import kh from "@/assets/languages/kh.json";
import en from "@/assets/languages/en.json";

// Get the saved language from localStorage, fallback to 'en'
const savedLanguage = localStorage.getItem("language") || "en";

i18next.use(initReactI18next).init({
  resources: { 
    kh: { translation: kh.translation }, 
    en: { translation: en.translation } 
  },
  lng: savedLanguage, // Use the saved language
  fallbackLng: "en",
  interpolation: {
    escapeValue: false, // React already does escaping
  },
});

export default i18next;