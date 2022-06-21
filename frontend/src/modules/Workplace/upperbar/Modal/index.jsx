import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { createCategoryOnServer, fetchCategories, updateCurCategory } from '../../DataSlice';
import TextField from '@mui/material/TextField';
import classes from './index.module.css';
import { CREATE_NEW_CATEGORY_MODAL_MSG, CREATE_NEW_CATEGORY_PLACEHOLDER_MSG } from '../../../../const';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 350,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  p: 4,
};

export default function CreateCategoryModal(props) {

  const { open, setOpen } = props;

  const [text, setText] = React.useState("");

  const dispatch = useDispatch()


  const handleTextFieldChange = (e) => {
    setText(e.target.value)
  }

  const onKeyDown = (event) => {
    event.preventDefault()
    if (event.key === "Enter") {
      onSubmit()
    } 
  }

  const onSubmit = () => {
    const newCategoryName = text.trim();
    dispatch(createCategoryOnServer({ category: newCategoryName }))
      .then(() => dispatch(fetchCategories()))
      .then(() => dispatch(updateCurCategory(newCategoryName)))
      .then(() => setOpen(false));
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ marginBottom: 2 }}>
            {CREATE_NEW_CATEGORY_MODAL_MSG}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '300px'  }}>
            <TextField id="outlined-basic" className={classes.new_modal_name} label={CREATE_NEW_CATEGORY_PLACEHOLDER_MSG} onChange={handleTextFieldChange} onKeyUp={onKeyDown}/>
            <Button onClick={onSubmit} className={classes.btn} sx={{ marginLeft: 3 }}>Create</Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}