export default NavigationItemPopUp;
declare function NavigationItemPopUp({ availableLocale, isOpen, isLoading, data, config, onSubmit, onClose, usedContentTypeItems, getContentTypeItems, usedContentTypesData, locale, readNavigationItemFromLocale, slugify, permissions, }: {
    availableLocale: any;
    isOpen: any;
    isLoading: any;
    data: any;
    config?: {} | undefined;
    onSubmit: any;
    onClose: any;
    usedContentTypeItems: any;
    getContentTypeItems: any;
    usedContentTypesData: any;
    locale: any;
    readNavigationItemFromLocale: any;
    slugify: any;
    permissions?: {} | undefined;
}): React.JSX.Element;
declare namespace NavigationItemPopUp {
    namespace propTypes {
        let data: PropTypes.Validator<object>;
        let config: PropTypes.Validator<object>;
        let isOpen: PropTypes.Requireable<boolean>;
        let isLoading: PropTypes.Requireable<boolean>;
        let onSubmit: PropTypes.Validator<(...args: any[]) => any>;
        let onClose: PropTypes.Validator<(...args: any[]) => any>;
        let getContentTypeItems: PropTypes.Validator<(...args: any[]) => any>;
        let locale: PropTypes.Requireable<string>;
        let readNavigationItemFromLocale: PropTypes.Validator<(...args: any[]) => any>;
        let slugify: PropTypes.Validator<(...args: any[]) => any>;
    }
}
import React from 'react';
import PropTypes from 'prop-types';
//# sourceMappingURL=index.d.ts.map