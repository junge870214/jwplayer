import { invert } from 'utils/underscore';
import { isIframe } from 'utils/browser';

/**
 * A map of 2-letter language codes (ISO 639-1) to language name in English
 */
const codeToLang = {
    zh: 'Chinese',
    nl: 'Dutch',
    en: 'English',
    fr: 'French',
    de: 'German',
    it: 'Italian',
    ja: 'Japanese',
    pt: 'Portuguese',
    ru: 'Russian',
    es: 'Spanish',
    el: 'Greek',
};

const langToCode = invert(codeToLang);

export function getLabel(language) {
    if (!language) {
        return;
    }

    // We do not map ISO 639-2 (3-letter codes)
    if (language.length === 3) {
        return language;
    }

    return codeToLang[language.substr(0, 2)] || language;
}

export function getCode(language) {
    return langToCode[language] || '';
}

export function getLanguage() {
    let language = extractLanguage(document);
    if (!language && isIframe()) {
        language = extractLanguage(window.top.document);
    }
    return language || navigator.language || navigator.browserLanguage || navigator.userLanguage || navigator.systemLanguage;
}

function extractLanguage(doc) {
    const htmlTag = doc.querySelector('html');
    return htmlTag ? htmlTag.getAttribute('lang') : null;
}
