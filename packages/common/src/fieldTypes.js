const defaultOptions = ['help', 'label', 'required', 'showLabel', 'repeatable']

const fieldOptions = [
  {label: 'Add', name: 'addType', type: 'string'},
  {label: 'Display Type', name: 'displayType', type: 'string'},
  {label: 'Help', name: 'help', type: 'string'},
  {label: 'Inline', name: 'inline', type: 'boolean'},
  {label: 'Label', name: 'label', type: 'string'},
  {label: 'Multiple', name: 'multiple', type: 'boolean'},
  {label: 'Options', name: 'options', type: 'array'},
  {label: 'Placeholder', name: 'placeholder', type: 'string'},
  {label: 'PredefinedValue', name: 'predefinedValue', type: 'string'},
  {label: 'PredefinedOptions', name: 'predefinedOptions', type: 'array'},
  {label: 'Repeatable', name: 'repeatable', type: 'boolean'},
  {label: 'Required', name: 'required', type: 'boolean'},
  {label: 'Show as Switcher', name: 'showAsSwitcher', type: 'boolean'},
  {label: 'Show Label', name: 'showLabel', type: 'boolean'},
]

const getFieldOptions = (options) => {
    return options.map(option => {
      return fieldOptions.find((opt) => opt.name === option)
    })
}

const types = [
  {
    name: 'Text',
    options: getFieldOptions([...defaultOptions, 'placeholder', 'displayType', 'predefinedValue']),
    type: 'text'
  },
  {
    name: 'Select from List',
    options: getFieldOptions([...defaultOptions, 'options', 'predefinedOptions', 'multiple']),
    type: 'select'
  },
  {
    name: 'Single Selection',
    options: getFieldOptions([...defaultOptions, 'options', 'predefinedOptions', 'inline']),
    type: 'radio'
  },
  {
    name: 'Multiple Selection',
    options: getFieldOptions([...defaultOptions, 'showAsSwitcher', 'options', 'inline']),
    type: 'checkbox_multiple'
  },
  {
    name: 'Date',
    options: getFieldOptions([...defaultOptions, 'predefinedValue']),
    type: 'date'
  },
  {
    name: 'Numeric',
    options: getFieldOptions([...defaultOptions, 'predefinedValue']),
    type: 'numeric'
  },
  {
    name: 'Upload',
    options: getFieldOptions([...defaultOptions]),
    type: 'document_library'
  }
]

module.exports = types;
