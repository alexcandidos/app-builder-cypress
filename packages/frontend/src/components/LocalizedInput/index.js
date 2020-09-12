import ClayLocalizedInput from '@clayui/localized-input'
import React, { useContext, useState } from 'react'

import AppContext from '../../AppContext'

const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const languages = {
  en_US: { key: 'en_US', value: 'English (United States' },
  ar_SA: { key: 'ar_SA', value: 'Arabic (Saudi Arabia)' },
  ca_ES: { key: 'ca_ES', value: 'Catalan (Spain)' },
  zh_CN: { key: 'zh_CN', value: 'Chinese (China)' },
  nl_NL: { key: 'nl_NL', value: 'Dutch (Netherlands)' },
  fi_FI: { key: 'fi_FI', value: 'Finnish (Finland)' },
  fr_FR: { key: 'fr_FR', value: 'French (France)' },
  de_DE: { key: 'de_DE', value: 'German (Germany)' },
  hu_HU: { key: 'hu_HU', value: 'Hungarian (Hungary)' },
  ja_JP: { key: 'ja_JP', value: 'Japanese (Japan)' },
  pt_BR: { key: 'pt_BR', value: 'Portuguese (Brazil)' },
  es_ES: { key: 'es_ES', value: 'Spanish (Spain)' },
  sv_SE: { key: 'sv_SE', value: 'Swedish (Sweden)' }
}

const formatLocale = (defaultLanguageId) => {
  const newLanguages = {
    [defaultLanguageId]: defaultLanguageId,
    ...languages
  }
  return Object.keys(newLanguages).map((key) => {
    const label = key.replace('_', '-')
    return {
      label,
      symbol: label.toLowerCase()
    }
  })
}

const LocalizedField = ({ name, onChange = () => {}, defaultValue = {}, ...props }) => {
  const [{ scenario: { settings: { defaultLanguageId } } }] = useContext(AppContext)
  const locales = formatLocale(defaultLanguageId.replace('-', '_'))
  const [selectedLocale, setSelectedLocale] = useState(locales[0])
  const [translations, setTranslations] = useState()

  React.useEffect(() => {
    if (!translations && Object.values(defaultValue).length) {
      const initialLocale = locales.find(({ label }) => label === defaultLanguageId)
      setSelectedLocale(initialLocale)
      setTranslations(defaultValue)
    }
  }, [defaultValue])

  const changeSelectedLocate = (value) => {
    setSelectedLocale(value)
  }

  const onTranslationChange = (value) => {
    onChange(name, value)
    setTranslations(value)
  }

  return (
    <ClayLocalizedInput
      {...props}
      spritemap={spritemap}
      locales={locales}
      translations={translations || {}}
      onSelectedLocaleChange={changeSelectedLocate}
      onTranslationsChange={onTranslationChange}
      selectedLocale={selectedLocale}
    />
  )
}

export default LocalizedField
