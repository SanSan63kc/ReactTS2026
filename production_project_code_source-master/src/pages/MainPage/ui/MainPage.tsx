import { BugButton } from 'app/providers/ErrorBoundary';
import React from 'react';
import { useTranslation } from 'react-i18next';

const MainPage = () => {
    let {t} = useTranslation()
    return (
        <div>
            {/* <BugButton/> */}
            {t("Главная страница")}
        </div>
    );
};

export default MainPage;
