import ClayButton from '@clayui/button'
import ClayModal, { useModal } from '@clayui/modal'
import { Form } from '@unform/web'
import React from 'react'

const spritemap = require('@clayui/css/lib/images/icons/icons.svg')

const Modal = ({ children, onSubmit, setVisible, title, visible }) => {
  const { observer, onClose } = useModal({
    onClose: () => setVisible(false)
  })

  return (
    <>
      {visible && (
        <ClayModal
          observer={observer}
          size="lg"
          spritemap={spritemap}
          status="info"
        >
          <Form onSubmit={onSubmit}>
            <ClayModal.Header>{title}</ClayModal.Header>
            <ClayModal.Body>
              {children}
            </ClayModal.Body>
            <ClayModal.Footer
              first={
                <ClayButton.Group spaced>
                  <ClayButton displayType="secondary">{'Cancel'}</ClayButton>
                </ClayButton.Group>
              }
              last={<ClayButton type="submit" onClick={onClose}>{'Save'}</ClayButton>}
            />
          </Form>
        </ClayModal>
      )}
    </>
  )
}

export default Modal
