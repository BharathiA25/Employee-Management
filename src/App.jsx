import Employee from './pages/Employee'
import FormDialog from './components/FormDialog'
import DeleteDialog from './components/DeleteDialog'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <Employee/>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App
