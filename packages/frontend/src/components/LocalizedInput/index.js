import ClayLocalizedInput from '@clayui/localized-input'
import { useField } from '@unform/core'
import React, { useEffect, useRef, useState } from 'react'

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

const locales = Object.keys(languages).map((key) => {
  const label = key.replace('_', '-')
  return {
    label,
    symbol: label.toLowerCase()
  }
})

const LocalizedField = (props) => {
  const inputRef = useRef(null)
  const [selectedLocale, setSelectedLocale] = useState(locales[0])
  const [translations, setTranslations] = useState({})

  const { fieldName, registerField } = useField(`${props.name}.${selectedLocale.label}`)
  useEffect(() => {
    registerField({
      name: fieldName,
      path: 'value',
      ref: inputRef.current
    })
  }, [fieldName, registerField])

  const changeSelectedLocate = (value) => {
    setSelectedLocale(value)
  }

  return (
    <ClayLocalizedInput
      {...props}
      id="locale1"
      ref={inputRef}
      spritemap={spritemap}
      locales={locales}
      onSelectedLocaleChange={changeSelectedLocate}
      onTranslationsChange={setTranslations}
      selectedLocale={selectedLocale}
      translations={translations}
    />
  )
}

export default LocalizedField
