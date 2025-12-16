import React, { useState, useEffect } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, MenuItem } from '@mui/material'
import { useFormik } from 'formik'
import * as Yup from 'yup'
function FormDialog({ open, onClose, onSave, editData }) {
  const [preview, setPreview] = useState(null);

  const textFieldStyle = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "12px",
      "> fieldset": {
        borderRadius: "12px",
      },
    }
  };

const BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

  useEffect(() => {
    if (editData?.image) {
      const cleanPath = editData.image.replace(/\\/g, "/");
      setPreview(`${BASE_URL}/${cleanPath}`);

    }
  }, [editData]);
  
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: editData?.name || "",
      age: editData?.age || "",
      email: editData?.email || "",
      department: editData?.department || "",
      phone: editData?.phone || "",
      image: editData?.image?.replace(/\\/g, "/") || "",
      imageFile: null

    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
      age: Yup.number().required("Age is required").min(21, "Age is must 21 and above").max(60, "Age is must 60 and below"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      department: Yup.string().required("Department is required"),
      phone: Yup.string().matches(/^[0-9]{10}$/, "Must be 10 digits").required("Number is required"),
      image: Yup.string().test("required-image", "Image is required", function (value) {
        if (editData) return true; // skip when editing
        return !!this.parent.imageFile;
      })
    }),
    onSubmit: (values) => {
      console.log("Form Submitted", values)
      onSave({ ...values, imageFile: values.imageFile, id: editData?.id });
    }

  })
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("imageFile", file);
    formik.setFieldValue("image", file.name)
    if (file) {
      setPreview(URL.createObjectURL(file));
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
            backgroundColor: "#ffffffff"
          }
        }}>
        <DialogTitle
          sx={{
            textAlign: 'center',
            fontWeight: '700',
            color: editData ? "#e3be09ff" : "#20c62dff"
          }}>
          {editData ? "Edit Employee" : "Add Employee"}
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
                type='text'
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

              <div style={{ display: "flex", flexDirection: "column", gap: '6px' }}>
                <label
                  htmlFor="image"
                  style={{
                    padding: "10px 14px",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    borderRadius: "8px",
                    cursor: "pointer",
                    width: "fit-content",
                    fontSize: "14px",
                  }}
                > Choose File</label>
                <input
                  id='image'
                  name="image"
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onBlur={formik.handleBlur}
                  onChange={handleImageChange}
                />
                {formik.values.image && (
                  <span style={{ fontSize: "14px", color: "#333" }}>
                    Selected: {formik.values.image.split("/").pop()}
                  </span>
                )}

                {formik.touched.image && formik.errors.image && (
                  <p style={{ color: "red", margin: 0 }}>{formik.errors.image}</p>
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
