import React, { useState , useEffect} from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button , MenuItem} from '@mui/material'
function FormDialog({open , onClose , onSave, editData}) {
    const [preview, setPreview] = useState(null);
     const textFieldStyle ={"& .MuiOutlinedInput-root": {
              // set radius for the input wrapper (affects background clipping)
              borderRadius: "12px",
              
              // set radius for the visible outline
            "> fieldset": {
            borderRadius: "12px",
             },
    }}; 
    useEffect(() => {
    if (editData && editData.image) {
      setPreview(editData.image);
    }
  }, [editData]);
    const formik = useFormik({
        enableReinitialize : true,
        initialValues: {
            name: editData?.name || "",
            age: editData?.age ||"",
            email: editData?.email ||"",
            department: editData?.department || "",
            phone: editData?.phone || "",
            image: editData?.image || null,

        },
        validationSchema: Yup.object({
            name: Yup.string().required("Name is required"),
            age: Yup.number().required("Age is required").min(21, "Age is must 21 and above").max(60,"Age is must 60 and below"),
            email: Yup.string().email("Invalid email").required("Email is required"),
            department: Yup.string().required("Department is required"),
            phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Number is required"),
            image: Yup.string().nullable().required("Image is required")
        }),
        onSubmit: (values) => {
            console.log("Form Submitted", values)
            onSave({...values, id:editData?.id});
        }

    })
    const handleImageChange = (event) => {
        const file = event.target.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreview(reader.result);
            formik.setFieldValue("image", reader.result)
            }
            reader.readAsDataURL(file)
        }
    }
    return (
        <div>
            <Dialog open={open} onClose={onClose}
                sx={{
                    "& .MuiDialog-paper": {
                        boxSizing: "border-box",
                        width: "700px",
                        padding: 0,
                        borderRadius: "20px",
                        overflow: "hidden",
                        backgroundColor : "#ffffffff"
                    }
                }}>
                <DialogTitle
                    sx={{
                        textAlign: 'center',
                        fontWeight: '700',
                        color : editData ?"#e3be09ff" : "#20c62dff"
                    }}>
                    {editData ? "Edit Employee":"Add Employee"}
                </DialogTitle>

<DialogContent>
  <form onSubmit={formik.handleSubmit}>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>

      <TextField
        placeholder='Employee Name'
        name='name'
        type='text'
        sx={textFieldStyle}
        value={formik.values.name}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        placeholder='Age'
        name='age'
        type='number'
        sx={textFieldStyle}
        value={formik.values.age}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.age && Boolean(formik.errors.age)}
        helperText={formik.touched.age && formik.errors.age}
      />

      <TextField
        placeholder='Email'
        name='email'
        type='email'
        sx={textFieldStyle}
        value={formik.values.email}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <TextField
        placeholder="Mobile Number"
        name="phone"
        type="text"
        sx={textFieldStyle}
        value={formik.values.phone}
        onBlur={formik.handleBlur}
        onChange={(e) => {
          const onlyNums = e.target.value.replace(/\D/g, "");
          formik.setFieldValue("phone", onlyNums);
        }}
        inputProps={{ maxLength: 10 }}
        error={formik.touched.phone && Boolean(formik.errors.phone)}
        helperText={formik.touched.phone && formik.errors.phone}
      />

      <TextField
        select
        name="department"
        placeholder='Select department'
        sx={textFieldStyle}
        value={formik.values.department}
        onBlur={formik.handleBlur}
        onChange={formik.handleChange}
        error={formik.touched.department && Boolean(formik.errors.department)}
        helperText={formik.touched.department && formik.errors.department}
        SelectProps={{ displayEmpty: true }}
      >
        <MenuItem value="" disabled>
          <span style={{ color: "#999" }}>Select Department</span>
        </MenuItem>
        <MenuItem value="frontend">Frontend</MenuItem>
        <MenuItem value="backend">Backend</MenuItem>
        <MenuItem value="android">Android</MenuItem>
        <MenuItem value="tester">Tester</MenuItem>
      </TextField>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <input
          name="image"
          type="file"
          accept="image/*"
          onBlur={formik.handleBlur}
          onChange={handleImageChange}
        />
        {formik.touched.image && formik.errors.image && (
          <p style={{ color: "red" }}>{formik.errors.image}</p>
        )}
      </div>

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: "100px", height: "100px", borderRadius: "10px" }}
        />
      )}
    </div>

    <DialogActions>
      <Button sx={{ color: 'red', textTransform: 'capitalize' }} onClick={onClose}>
        Cancel
      </Button>
      <Button
        variant="contained"
        sx={{
          backgroundColor: editData ? "#e3be09ff" : "#20c62dff",
          borderRadius: '25px',
          textTransform: 'capitalize'
        }}
        type="submit"
      >
        {editData ? "Update" : "Add"}
      </Button>
    </DialogActions>
  </form>
</DialogContent>

            </Dialog>
        </div>
    )
}

export default FormDialog
