const tabs = ['Form Views', 'Table Views', 'Apps']
module.exports = {
  changeObjectTab: (index) => {
    cy
      .wait(1000)
      .get('.custom-object-app .nav-item')
      .eq(index)
      .click()
      .contains(tabs[index])
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
  ddmVisibilityExpression: '[data-field-name="visibilityExpression"]'
}
