module.exports = {
  accountSettingsLanguageSelect: '#_com_liferay_my_account_web_portlet_MyAccountPortlet_languageId',
  changeObjectTab: (index) => {
    cy
      .wait(1000)
      .get('.custom-object-app .nav-item')
      .eq(index)
      .click()
  },
  ddmDisplayStyle: '[data-field-name="displayStyle"]',
  ddmInline: '[data-field-name="inline"]',
  ddmLabel: '[data-field-name="label"]',
  ddmMultiple: '[data-field-name="multiple"]',
  ddmPlaceholder: '[data-field-name="placeholder"]',
  ddmPredefinedValue: '[data-field-name="predefinedValue"]',
  ddmRepeatable: '[data-field-name="repeatable"]',
  ddmRequired: '[data-field-name="required"]',
  ddmShowAsSwitcher: '[data-field-name="showAsSwitcher"]',
  ddmShowLabel: '[data-field-name="showLabel"]',
  ddmTip: '[data-field-name="tip"]',
  ddmTooltip: '[data-field-name="tooltip"]',
  ddmVisibilityExpression: '[data-field-name="visibilityExpression"]',
  instanceLanguageSelect: '#_com_liferay_configuration_admin_web_portlet_InstanceSettingsPortlet_languageId',
  primaryButton: 'button.btn.btn-primary'
}
