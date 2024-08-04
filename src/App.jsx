
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import EmployeeList from './pages/EmployeeList'
import EmployeeDetails from './pages/EmployeeDetails';
import AddEmployee from './pages/AddEmployee'
function App() {
  return (
    <Router>
      
        <Routes>
          <Route path="/" element={<EmployeeList />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
          <Route path="/addemployee" element={<AddEmployee />} />

        </Routes>
     
    </Router>
  );
}

export default App;
