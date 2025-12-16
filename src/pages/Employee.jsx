import { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Button } from '@mui/material';
import FormDialog from '../components/FormDialog';
import DeleteDialog from '../components/DeleteDialog';
import { useSelector, useDispatch } from 'react-redux';
import { fetchEmployees, createEmployee, removeEmployee, updateEmployee } from '../features/employee-manages/employeeSlice';

const BASE_URL = "https://melodi-proprietorial-hue.ngrok-free.dev";

function Employee() {
  const dispatch = useDispatch();
  const { rows, loading } = useSelector((state) => state.employees)
  const [open, setOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [editData, setEditData] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  useEffect(() => {
    dispatch(fetchEmployees())
  }, [dispatch]);

  const handleAddorEdit = async (employee) => {
    const formData = new FormData();
    formData.append("name", employee.name);
    formData.append("age", employee.age);
    formData.append("email", employee.email);
    formData.append("phone", employee.phone);
    formData.append("department", employee.department);

    if (employee.id) {
      if (employee.imageFile) {
        formData.append("image", employee.imageFile);
      }
      await dispatch(updateEmployee({ id: employee.id, formData }));
    } else {
      formData.append("image", employee.imageFile);
      await dispatch(createEmployee(formData));
    }

    setOpen(false);
    setEditData(null);
  };

  const handleDeleteEmployee = async (id) => {
    await dispatch(removeEmployee(id))
    setDeleteOpen(false);
  }


  const handleDelete = async (id) => {
    setDeleteId(id);
    setDeleteOpen(true);
  }
  const handleEdit = (data) => {
    setEditData(data);
    setOpen(true);
  };

  const columns = [
    { field: 'id', headerName: 'ID', width: 100 },
    {
      field: 'image',
      headerName: 'Image',
      width: 120,
      renderCell: (params) => {
        if (!params.row.image) return null;

        // Replace Windows backslashes with slashes
        let imgPath = params.row.image.replace(/\\/g, "/");

        // Remove leading slash to avoid double slashes
        if (imgPath.startsWith("/")) {
          imgPath = imgPath.slice(1);
        }

        // Encode URI to handle spaces and special characters
        const fullURL = `${BASE_URL}/${encodeURI(imgPath)}`;
        //console.log("full url :", fullURL)
        return (
          <a
            href={fullURL}
            target='_blank'
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={fullURL}
              alt="employee"
              style={{
                display: 'block',
                maxWidth: '70%',
                maxHeight: '70%',
                borderRadius: "50px",
                objectFit: "cover"
              }}
            />
          </a>
        );
      }
    },

    { field: 'name', headerName: 'Name', width: 120 },
    { field: 'age', headerName: 'Age', width: 110 },
    { field: 'email', headerName: 'Email', width: 240 },
    { field: 'phone', headerName: 'Mobile Number', width: 200 },
    { field: 'department', headerName: 'Department', width: 180 },

    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant='contained'
            color='warning'
            size='small'
            onClick={() => handleEdit(params.row)}
            style={{ marginRight: 10 }}
          >
            Edit
          </Button>
          <Button
            variant='contained'
            color='error'
            size='small'
            onClick={() => handleDelete(params.row.id)}
          >
            Delete
          </Button>
        </>
      )
    }
  ];

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div
        style={{
          height: '100px',
          width: '100%',
          backgroundColor: '#1a4ca2ff',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h4 style={{ color: '#fff', fontSize: '20px' }}>Employee Management System</h4>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', padding: '20px', gap: '20px' }}>
        <h3>Employee List</h3>

        <Box display="flex" justifyContent="flex-start">
          <Button
            variant="contained"
            disabled={loading}
            onClick={() => setOpen(true)}
            sx={{ textTransform: 'capitalize', backgroundColor: '#31b209ff' }}
          >
            Add New Employee
          </Button>
        </Box>
        <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
          <div style={{ width: "fit-content", margin: "0 auto" }}>
            <DataGrid
              rows={rows}
              columns={columns}
              loading={loading}
              autoHeight
              getRowId={(row) => row.id}
              disableExtendRowFullWidth
              disableColumnResize
              columnBuffer={0}

              sx={{
                borderRadius: '20px',
                "& .MuiDataGrid-columnHeaders": {
                  backgroundColor: "#1656ccff !important",
                },

                "& .MuiDataGrid-columnHeader": {
                  backgroundColor: "#1656ccff !important",
                  color: "#fff !important",
                  fontWeight: "bold",
                  fontSize: "16px",
                },

                // THE FIX: center header content
                "& .MuiDataGrid-columnHeader .MuiDataGrid-columnHeaderTitleContainer": {
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                },

                // Center cell text
                "& .MuiDataGrid-cell": {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                },
              }}


            />
          </div>
        </div>
        {open && (
          <FormDialog
            open={open}
            onClose={() => {
              setEditData(null);
              setOpen(false);
            }}
            editData={editData}
            onSave={handleAddorEdit}
          />
        )}
        {deleteOpen && (
          <DeleteDialog
            open={deleteOpen}
            onClose={() => {
              setDeleteOpen(false)
            }}
            onDelete={() => handleDeleteEmployee(deleteId)} />
        )}
      </div>
    </div>
  );
}

export default Employee;


