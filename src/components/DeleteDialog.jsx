import React from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions,Typography,  Button} from '@mui/material'

function DeleteDialog({open, onClose, onDelete} ) {
  return (
    <div>
       <Dialog open={open} onClose={onClose}  fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Delete Employee</DialogTitle>

      <DialogContent>
        <Typography>
          Are you sure you want to delete this Employee? This action cannot be undone.
        </Typography>
      </DialogContent>

      <DialogActions>
        <Button  sx={{ color: "gray" }} onClick={onClose}>
          Cancel
        </Button>

        <Button
          variant="contained"
          sx={{ backgroundColor: "red", color: "white" }}
          onClick={onDelete}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
      
    </div>
  )
}

export default DeleteDialog
