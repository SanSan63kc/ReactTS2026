import React from 'react';
import { useTranslation } from 'react-i18next';
import { Loader } from 'shared/ui/Loader/Loader';

const AboutPage = () => {
    let {t} = useTranslation("about")
    return (
        <div>
            {t("О сайте")}
        </div>
    );
};

export default AboutPage;
