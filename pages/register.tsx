// register page using TypeScript that has a form with the following fields: Name, Last Name, Email, Password, Confirm Password, Phone Number, Address, City, State, Zip Code, and Country. Please also create a form to upload a photo of a driver's license, as well as a submit button which uploads the form and creates a user in the MongoDB database.

import React, { useState } from 'react';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';
import FormControl from '@mui/material/FormControl';

interface RegisterFormData {
  name: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  photo: File | null;
}

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    photo: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission and user creation in the MongoDB database
    console.log(formData);
  };

  return (
    <FormControl>
      <h1 className="font-bold text-4xl p-8">Register</h1>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <TextField  type="text"
            id="name"
            name="name" onSubmit={handleSubmit} value={formData.name}/>
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <TextField  type="text"
            id="lastName"
            name="lastName" onSubmit={handleSubmit} value={formData.lastName}/>
        </div>
        {/* Other form fields */}
        <div>
          <label htmlFor="photo">Driver's License Photo:</label>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoUpload}
          />
        </div>
        <Button type="submit" variant="outlined">Submit</Button>
      </form>
    </FormControl>
  );
};

export default RegisterPage;
