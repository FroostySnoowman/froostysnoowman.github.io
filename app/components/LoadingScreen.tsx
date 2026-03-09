import React from "react";
import { useLanguage } from "../contexts/language-context";

const LoadingScreen: React.FC = () => {
  const { texts } = useLanguage();

  return (
    <div className="bg-white fixed inset-0 z-50 flex items-center justify-center">
      <h1 className="text-xl font-semibold">{texts.loading.text}</h1>
    </div>
  );
};

export default LoadingScreen;
