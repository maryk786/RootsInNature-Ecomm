import React, { useState } from 'react';

const ResetPassword = () => {
  // Define state for the password fields
  const [formData, setFormData] = useState({
    newPassword: '',
    confirmPassword: '',
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform password reset logic here
    if (formData.newPassword === formData.confirmPassword) {
      console.log('Password reset successful:', formData.newPassword);
    } else {
      console.log('Passwords do not match');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">New Password</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className='text-center'>
           <button type="submit" className=" text-white py-2 rounded">
          Reset Password
        </button> 
        </div>
        
      </form>
    </div>
  );
};

export default ResetPassword;
