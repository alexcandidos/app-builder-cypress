const baseUrl = 'http://localhost:8080'
const defaultLanguageId = 'en_US'

module.exports = {
  baseUrl,
  defaultLanguageId,
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
  languageId: defaultLanguageId.replace('_', '-'),
  object: `${baseUrl}/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_auth=cIaiVlKB%2F#/`
}
