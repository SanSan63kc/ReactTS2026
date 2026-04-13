import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    let {t} = useTranslation()
    return (
        <div>
            {t("Главная страница")}
        </div>
    );
};

export default MainPage;
