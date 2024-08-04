import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DeleteModal from '@/components/DeleteModal';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      const myHeaders = new Headers();
      myHeaders.append("projectId",  import.meta.env.VITE_PROJECT_ID);
      myHeaders.append("environmentId", import.meta.env.VITE_ENVIRONMENT_ID);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow"
      };

      try {
        const response = await fetch("https://free-ap-south-1.cosmocloud.io/development/api/employee?limit=10&offset=0", requestOptions)
        .then((response) => response.text())
        .then((result) => JSON.parse(result));
        
        console.log(response.data)
        setEmployees(response.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const openDeleteModal = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEmployeeToDelete(null);
  };

  const confirmDelete = () => {
    setEmployees(employees.filter(employee => employee.id !== employeeToDelete.id));
    closeDeleteModal();
  };

  return (
    <div>
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-center p-8">
        Employee Directory
      </h1>
      <div className="text-center mb-8">
        <Link
          to="/addemployee"
          className="bg-green-500 text-white py-2 px-4 rounded"
        >
          Add Employee
        </Link>
      </div>
      {isLoading ? (
        <p className="text-center text-gray-500">Loading...</p>
      ) : employees.length === 0 ? (
        <p className="text-center text-gray-500">No Employees in the system</p>
      ) : (
        <div className='flex justify-center items-center'>
          <table className="min-w-[80%] bg-white border">
            <thead>
              <tr>
                <th className="py-2 px-4 border">ID</th>
                <th className="py-2 px-4 border">Name</th>
                <th className="py-2 px-4 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id}>
                  <td className="py-2 px-4 border">{employee._id}</td>
                  <td className="py-2 px-4 border">{employee.name}</td>
                  <td className="py-2 px-4 border flex justify-around">
                    <Link
                      to={`/employee/${employee._id}`}
                      className="bg-blue-500 text-white py-1 px-3 rounded"
                    >
                      View More
                    </Link>
                    <button
                      onClick={() => openDeleteModal(employee)}
                      className="bg-red-500 text-white py-1 px-3 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <DeleteModal
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default EmployeeList;
