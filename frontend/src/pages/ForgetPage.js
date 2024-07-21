import React, { useState } from 'react';

const ForgotPassword = () => {
  // Define state for the email field
  const [email, setEmail] = useState('');

  // Handle email field changes
  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform password reset logic here
    console.log('Password reset request submitted for:', email);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white p-6 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-4">Reset Your Password</h2>
        
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
        </div>
        <div className='text-center'>
            <button type="submit" className=" text-white py-2 px-10 rounded">
          Send email
        </button>
        </div>
      
      </form>
    </div>
  );
};

export default ForgotPassword;
