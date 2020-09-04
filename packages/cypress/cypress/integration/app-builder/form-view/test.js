function test (config) {
  const {
    displayType,
    help,
    inline,
    label,
    multiple,
    options = [],
    placeholder,
    predefinedValue,
    predefinedOptions,
    repeatable,
    required,
    showAsSwitcher,
    showLabel = true,
    tooltip
  } = config

  console.log(label)
}

const config = {
  displayType: 'multiple',
  help: 'Its recommended inform the School Name',
  label: {
    en_US: 'Company name',
    es_ES: 'Nombre de empresa',
    pt_BR: 'Nome da empresa'
  },
  placeholder: {
    en_US: 'In what company do you work now?',
    es_ES: '¿En qué empresa trabajas ahora?',
    pt_BR: 'Em que empresa trabalha agora?'
  },
  predefinedValue: 'Keven',
  repeatable: true,
  required: true
}

const getLocalizedConfig = () => {
  const newConfigs = {
    ...config
  }
  Object.keys(config).forEach((key) => {
    const value = config[key]
    if (typeof value === 'object') {
      newConfigs[key] = getLocalizedValue(value)
    }
  })
}

console.log(test(config))
