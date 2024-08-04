import  { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEmployeeDetails = async () => {
      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `https://free-ap-south-1.cosmocloud.io/development/api/employee/${id}`,
        headers: {
          projectId: import.meta.env.VITE_PROJECT_ID, 
          environmentId: import.meta.env.VITE_ENVIRONMENT_ID
        }
      };

      try {
        const response = await axios.request(config);
        setEmployee(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching employee details:', error);
        setError('Failed to fetch employee details.');
        setLoading(false);
      }
    };

    fetchEmployeeDetails();
  }, [id]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center min-h-screen bg-gray-100">{error}</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Employee Details</h1>
        <div className="mb-4">
          <p className="text-lg"><strong>ID:</strong> {employee._id}</p>
          <p className="text-lg"><strong>Name:</strong> {employee.name}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Address</h2>
          <p className="text-lg">{employee.address.line1}</p>
          <p className="text-lg">{employee.address.city}, {employee.address.country} {employee.address.zip_code}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">Contact Details</h2>
          <p className="text-lg"><strong>Email:</strong> {employee.contact_details.email}</p>
          <p className="text-lg"><strong>Phone:</strong> {employee.contact_details.phone}</p>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;
