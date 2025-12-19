import axios from 'axios'

const API = "https://melodi-proprietorial-hue.ngrok-free.dev/employee"

export const getAllEmployee = () => axios.get(API ,
  {headers: { 
    "ngrok-skip-browser-warning": "true" 
  }
})

export const addEmployee = (data) => axios.post(API, data,{
     headers: { 
      "Content-Type": "multipart/form-data",
      "ngrok-skip-browser-warning": "true"
    }
});

export const editEmployee = (id, data) => axios.put(`${API}/${id}`,data,{
     headers: { 
      "Content-Type": "multipart/form-data",
      "ngrok-skip-browser-warning": "true"
    }
});

export const deleteEmployee = (id) => axios.delete(`${API}/${id}`);