import ClayButton from '@clayui/button'
import ClayDatePicker from '@clayui/date-picker'
import ClayForm, { ClayInput } from '@clayui/form'
import ClayLayout from '@clayui/layout'
import ClayMultiSelect from '@clayui/multi-select'
import ClayPanel from '@clayui/panel'
import React from 'react'
const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const ClayDatePickerWithState = (props) => {
  const [value, setValue] = React.useState('')

  return (
    <ClayDatePicker
      {...props}
      onValueChange={setValue}
      spritemap={spritemap}
      value={value}
    />
  )
}

export default () => {
  const [formValues, setFormValues] = React.useState({})
  const [value, setValue] = React.useState('')
  const [selectedItems, setSelectedItems] = React.useState([])

  return (
    <ClayLayout.ContainerFluid className="mt-6">
      <div className="row">
        <div className="col col-12">
          <ClayForm
            className="sheet"
            onSubmit={() => alert(JSON.stringify(formValues))}
          >
            <div className="sheet-header">
              <h2 className="sheet-title">Scenario Creator</h2>
            </div>

            <ClayPanel.Group>
              <ClayPanel
                displayTitle={'Organization Information'}
                displayType="unstyled"
                spritemap={spritemap}
              >
                <ClayPanel.Body>
                  <ClayForm.Group>
                    <label>{'Name'}</label>
                    <ClayInput
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          name: e.target.value
                        })
                      }
                      placeholder="Name"
                    />
                  </ClayForm.Group>
                  <ClayForm.Group>
                    <label>{'Country'}</label>
                    <ClayInput
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          country: e.target.value
                        })
                      }
                      placeholder="Country"
                    />
                  </ClayForm.Group>

                  <ClayForm.Group>
                    <label>{'Date'}</label>
                    <ClayDatePickerWithState />
                  </ClayForm.Group>

                  <ClayForm.Group>
                    <label>{'State'}</label>
                    <select
                      className="form-control"
                      onChange={(e) =>
                        setFormValues({
                          ...formValues,
                          state: e.target.value
                        })
                      }
                    >
                      <option disabled selected>
                        {'-- select an option --'}
                      </option>
                      <option>{'Happy'}</option>
                      <option>{'Mad'}</option>
                      <option>{'Sad'}</option>
                    </select>
                  </ClayForm.Group>
                </ClayPanel.Body>
              </ClayPanel>

              <ClayPanel
                collapsable
                defaultExpanded
                displayTitle={'More Information'}
                displayType="unstyled"
                showCollapseIcon
                spritemap={spritemap}
              >
                <ClayPanel.Body>
                  <ClayForm.Group>
                    <ClayForm.Text>
                      {
                        'You can use this space to provide more information in this form.'
                      }
                    </ClayForm.Text>
                  </ClayForm.Group>

                  <ClayForm.Group>
                    <label>{'Tags'}</label>

                    <ClayInput.Group>
                      <ClayInput.GroupItem>
                        <ClayMultiSelect
                          inputValue={value}
                          items={selectedItems}
                          onChange={setValue}
                          onItemsChange={(
                            items
                          ) => {
                            setFormValues({
                              ...formValues,
                              tags: items
                            })

                            setSelectedItems(
                              items
                            )
                          }}
                          placeholder="Tags..."
                          spritemap={spritemap}
                        />

                        <ClayForm.FeedbackGroup>
                          <ClayForm.Text>
                            {
                              'Use comma to enter tags'
                            }
                          </ClayForm.Text>
                        </ClayForm.FeedbackGroup>
                      </ClayInput.GroupItem>
                    </ClayInput.Group>
                  </ClayForm.Group>
                </ClayPanel.Body>
              </ClayPanel>
            </ClayPanel.Group>

            <div className="sheet-footer">
              <ClayButton.Group>
                <div className="btn-group-item">
                  <ClayButton type="submit">
                    {'Submit'}
                  </ClayButton>
                </div>
                <div className="btn-group-item">
                  <ClayButton displayType="secondary">
                    {'Cancel'}
                  </ClayButton>
                </div>
              </ClayButton.Group>
            </div>
          </ClayForm>
        </div>
      </div>
    </ClayLayout.ContainerFluid>
  )
}
