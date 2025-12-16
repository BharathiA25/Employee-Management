import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addEmployee, editEmployee, deleteEmployee, getAllEmployee } from "../../api/EmployeApi";
import { toast } from "react-toastify";

const initialState = {
  rows: [],
  loading: false,
  error: null,
}

export const fetchEmployees = createAsyncThunk(
  "employee/fetch",
  async (_, { rejectWithValue }) => {
    try {
      const res = await getAllEmployee();
      const data = Array.isArray(res.data) ? res.data : [res.data];
      return data
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
);

export const createEmployee = createAsyncThunk(
  "employee/create",
  async (formData, { dispatch, rejectWithValue }) => {
    try {
      await addEmployee(formData);
      dispatch(fetchEmployees())
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
);

export const updateEmployee = createAsyncThunk(
  "employee/update",
  async ({ id, formData }, { dispatch, rejectWithValue }) => {
    try {
      await editEmployee(id, formData);
      dispatch(fetchEmployees())
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
);

export const removeEmployee = createAsyncThunk(
  "employee/delete",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      await deleteEmployee(id);
      dispatch(fetchEmployees())
    }
    catch (err) {
      return rejectWithValue(err.response?.data || err.message)
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.rows = action.payload.map((e) => ({
          ...e,
          id: e.id,
        }))
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        toast.error("Failed to load employees")
      })
      .addCase(createEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(createEmployee.fulfilled, (state) => {
        state.loading = false;
        toast.success("Employee added successfully");
      })
      .addCase(createEmployee.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to add employee");
      })
      .addCase(updateEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateEmployee.fulfilled, (state) => {
        state.loading = false;
        toast.success("Employee updated successfully");
      })
      .addCase(updateEmployee.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to update employee");
      })
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeEmployee.fulfilled, (state) => {
        state.loading = false;
        toast.success("Employee deleted successfully");
      })
      .addCase(removeEmployee.rejected, (state) => {
        state.loading = false;
        toast.error("Failed to delete employee");
      })

  }

});

export default employeeSlice.reducer;