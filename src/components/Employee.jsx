import { DataGrid } from '@mui/x-data-grid'
import { Box, Button } from '@mui/material'
import FormDialog from './FormDialog'
import { useEffect, useState } from 'react'
function Employee() {
  const [rows, setRows] = useState([])
  const [open, setOpen] = useState(false)
  const [editData, setEditData] = useState(null)
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("employee"));
    if (saved) setRows(saved);
  }, []);

  useEffect(() => {
    if (rows.length > 0) {
      localStorage.setItem("employee", JSON.stringify(rows));
    }
  }, [rows]);

  const columns = [
    { field: 'id', headerName: 'ID', width: 80 },
    {field : 'image',
      headerName : 'Image', 
      width : 100,
    renderCell : (params) =>(
      <img 
      src={params.row.image} 
      alt="employee" 
      style={{ width: "50px", height: "50px", borderRadius: "8px", objectFit: "cover" }} 
    />
    )},
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'age', headerName: 'Age', width: 80 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'phone', headerName: 'Mobile Number', width: 130 },
    { field: 'department', headerName: 'Department', width: 140 },
    {
      field: 'action',
      headerName: 'Action',
      width: 200,
      renderCell: (params) => (
        <>
          <Button variant='contained' color='success' size='small' onClick={() => handleEdit(params.row)} style={{ marginRight: 10 }}>
            Edit
          </Button>
          <Button variant='contained' color='error' size='small' onClick={() => handleDelete(params.row.id)} >
            Delete
          </Button>
        </>
      )
    }
  ]

  const handleAddorEdit = (employee) => {
    if (employee.id) {
      setRows((prev) => prev.map((row) => (row.id === employee.id ? { ...employee } : row)))
    }
    else {
      const newEmployee = { ...employee, id: rows.length > 0 ? rows[rows.length - 1].id + 1 : 1 };
      setRows((prev) => [...prev, newEmployee])
    }
    setOpen(false);
    setEditData(null);
  }

  const handleDelete = (id) => {
    setRows(rows.filter((item) => item.id !== id))
  }
  const handleEdit = (data) => {
    setEditData(data)
    setOpen(true)
  }

  return (
    <div style={{ width: '100vw', height: '100vh'}}>
      <div style={{height : '100px', width:'100%', backgroundColor :'#1a4ca2ff', display:'flex', justifyContent:'center',alignItems:'center'}}>
        <h4 style={{color:'#fff', fontSize:'20px'}}> Employee Management System</h4>
      </div>
      <div style={{display:'flex', flexDirection:'column',padding:'20px',gap:'20px'}}>
        <h3>Employee List</h3>
       <Box display="flex" justifyContent="flex-start">
      <Button
        variant="contained"
        onClick={() => setOpen(true)}
        sx={{  textTransform:'capitalize', backgroundColor:'#31b209ff'}}
      >
        Add New Employee
      </Button>
      </Box> 

      <DataGrid
    rows={rows}
    columns={columns}
  sx={{
    borderRadius: 2,
    boxShadow: 3,
    backgroundColor: "#ffffff",
    padding: 1,

    "& .MuiDataGrid-columnHeaders": {
      backgroundColor: "#145cd9ff",
      color: "#fff",
    },
    "&& .MuiDataGrid-columnHeaderTitle": { 
      color: "#fff",
      fontSize: "15px",
      fontWeight: "bold",
    },

    "& .MuiDataGrid-row:hover": {
      backgroundColor: "#eaf1ff",
      cursor: "pointer",
    },

    "& .MuiDataGrid-cell": {
      fontSize: "14px",
    },

    "& .MuiDataGrid-footerContainer": {
      backgroundColor: "#f5f7ff",
    }
  }}
  autoHeight
/>

      {open && (
        <FormDialog
          open={open}
          onClose={() => {
            setEditData(null)
            setOpen(false)
          }}
          editData={editData}
          onSave={handleAddorEdit}
        />
      )}
      </div>
    </div>
  )
}

export default Employee
