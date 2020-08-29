const baseUrl = 'http://localhost:8080'
const defaultLanguageId = 'en_US'

module.exports = {
  baseUrl,
  object: `${baseUrl}/group/guest/~/control_panel/manage?p_p_id=com_liferay_app_builder_web_internal_portlet_ObjectsPortlet&p_p_lifecycle=0&p_p_state=maximized&p_p_mode=view&p_p_auth=cIaiVlKB%2F#/`,
  defaultLanguageId,
  languageId: defaultLanguageId.replace('_', '-'),
  fieldTypes: [
    {
      name: 'Text',
      type: 'text',
      config: {
        // label: 'School Name',
        // placeholder: 'School name here',
        // help: 'Its recommended inform the School Name',
        // displayType: 'multiple',
        // required: true,
        predefinedValue: 'Keven',
        repeatable: true,
        showLabel: false
      }
    },
    { name: 'Select from List', type: 'select' },
    { name: 'Single Selection', type: 'radio' },
    { name: 'Multiple Selection', type: 'checkbox_multiple' },
    { name: 'Date', type: 'date' },
    { name: 'Numeric', type: 'numeric' },
    { name: 'Fields Group' },
    { name: 'Upload', type: 'document_library' }
  ]
}
