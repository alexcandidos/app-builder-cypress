const { random: { boolean, number } } = require('faker')
const defaultOptions = ['help', 'label', 'required', 'showLabel', 'repeatable']

const types = [
  {
    name: 'Text',
    options: [...defaultOptions, 'placeholder', 'displayType', 'predefinedValue'],
    type: 'text'
  },
  {
    name: 'Select from List',
    options: [...defaultOptions, 'options', 'predefinedOptions', 'multiple'],
    type: 'select'
  },
  {
    name: 'Single Selection',
    options: [...defaultOptions, 'options', 'predefinedOptions', 'inline'],
    type: 'radio'
  },
  {
    name: 'Multiple Selection',
    options: [...defaultOptions, 'showAsSwitcher', 'options', 'inline'],
    type: 'checkbox_multiple'
  },
  {
    name: 'Date',
    options: [...defaultOptions, 'predefinedValue'],
    type: 'date'
  },
  {
    name: 'Numeric',
    options: [...defaultOptions, 'predefinedValue'],
    type: 'numeric'
  },
  {
    name: 'Upload',
    options: [...defaultOptions],
    type: 'document_library'
  }
]

const optionsValues = {
  displayType: { get: () => boolean() ? 'multiple' : 'single' },
  help: { get: () => boolean() ? 'Help' : '' },
  inline: { get: boolean },
  label: { get: (fieldType) => fieldType.name },
  multiple: { get: boolean },
  options: { get: () => ['A', 'B', 'C'] },
  placeholder: { get: () => boolean() ? 'Placeholder' : '' },
  predefinedOptions: { get: () => ['A', 'B', 'C'] },
  predefinedValue: { get: () => boolean() ? 'value' : '' },
  repeatable: { get: boolean },
  required: { get: boolean },
  showAsSwitcher: { get: boolean },
  showLabel: { get: boolean },
  tooltip: { get: boolean }
}

const getRandomNumbers = (maxNumber) => {
  var arr = []
  let i = 0
  while (i < maxNumber) {
    i++
    const r = Math.floor(Math.random() * maxNumber) + 1
    if (arr.indexOf(r) === -1) arr.push(r)
  }
  return arr.length ? arr : [1]
}

const getConfig = (fieldType) => {
  const config = {}
  const totalOfOptions = fieldType.options.length
  const indexes = getRandomNumbers(number(totalOfOptions))
  indexes.map((index) => {
    const option = optionsValues[fieldType.options[index - 1]]
    config[fieldType.options[index - 1]] = option.get(fieldType)
  })

  return config
}

const fieldTypeGenerator = (fieldTypes = types) => {
  const newFieldTypes = fieldTypes.map((fieldType) => {
    const { name, type } = fieldType
    const config = getConfig(fieldType)

    return {
      config,
      name,
      type
    }
  })

  return newFieldTypes
}

const Scenarios = {
  SCENARIO_1: {
    fieldTypes: [
      {
        config: {
          displayType: 'multiple',
          help: 'Its recommended inform the School Name',
          label: 'School Name',
          placeholder: 'School name here',
          predefinedValue: 'Keven',
          repeatable: true,
          required: true
        },
        name: 'Text',
        type: 'text'
      },
      {
        config: {
          help: 'Student Grade',
          label: 'School Grade',
          multiple: true,
          options: ['First Grade', 'Second Grade', 'Third Grade'],
          repeatable: true,
          required: true
        },
        name: 'Select from List',
        type: 'select'
      },
      {
        config: {
          help: 'Self Care',
          label: 'Self Care',
          options: ['First aid', 'Health Package', 'Playground'],
          repeatable: true,
          required: true
        },
        name: 'Single Selection',
        type: 'radio'
      },
      {
        config: {
          help: 'Basic Toolkit',
          inline: true,
          label: 'Basic Toolkit',
          options: ['Pencil', 'Pen', 'Eraser', 'Notebook'],
          repeatable: true,
          required: true
        },
        name: 'Multiple Selection',
        type: 'checkbox_multiple'
      },
      {
        config: {
          help: 'Student Born Date',
          label: 'Student Born',
          repeatable: true,
          required: true
        },
        name: 'Date',
        type: 'date'
      },
      {
        config: {
          help: 'Student Grade',
          label: 'School Grade',
          repeatable: true,
          required: true
        },
        name: 'Numeric',
        type: 'numeric'
      },
      { name: 'Fields Group' },
      { name: 'Upload', type: 'document_library' }
    ],
    name: 'School',
    object: {
      name: 'School',
      newObject: true
    }
  },
  SCENARIO_2: {
    fieldTypes: fieldTypeGenerator(types),
    name: 'Random',
    object: {
      name: 'Random',
      newObject: true
    }
  }
}

// console.log(Scenarios.SCENARIO_1)
// console.log('HR')
// console.log(Scenarios.SCENARIO_2)
module.exports = Scenarios
