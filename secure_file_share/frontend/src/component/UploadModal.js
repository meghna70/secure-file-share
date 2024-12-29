import { Typography } from '@mui/material'
import React from 'react'
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import UploadPage from './FileUpload';

function UploadModal(props) {
  return (
    <Modal
    open={props.open}
        onClose={() => props.setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
    >
    <ModalDialog
      color="primary"
      variant="soft"
    >
      <ModalClose />
      <UploadPage/>
    </ModalDialog>
  </Modal>
  )
}

export default UploadModal