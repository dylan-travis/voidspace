import React, { useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import axios from 'axios'; // Import Axios for making HTTP requests

interface RegisterFormData {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  photo: File | null;
}

export async function getServerSideProps(context) {
  const req = context.req
  const res = context.res
  let username = getCookie('username', { req, res });
  if (username != undefined){
      return {
          redirect: {
              permanent: false,
              destination: "/"
          }
      }
  }
  return { props: {username:false} };
};

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState<RegisterFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    photo: null,
  });

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setFormData((prevData) => ({
      ...prevData,
      photo: file,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Make an API request to your server to create the user
      console.log(formData)
      const response = await axios.post('/api/registerUser', formData);

      // Handle the API response as needed
      console.log('User registration response:', response.data);
      
      // Optionally, you can redirect the user to another page after successful registration
      // Router.push('/success'); // Import Router from 'next/router'
    } catch (error) {
      console.error('Error registering user:', error);
      // Handle errors and display error messages to the user
    }
  };
  const router = useRouter()
  const { msg } = router.body

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">Register</h1>
      <form action="/api/registerUser" method="POST" className="space-y-8">
        <div>
          <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Name:</label>
          <input type="text" id="firstName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="John"/>
        </div>
        <div>
          <label htmlFor="lastName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Last Name:</label>
          <input type="text" id="lastName" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Doe"/>
        </div>
        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Email:</label>
          <input type="text" id="email"  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="john@doe.com"/>
        </div>
        <div>
          <label htmlFor="phoneNumber" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Phone:</label>
          <input type="text" id="phoneNumber" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="888-888-8888"/>
        </div>
        <div>
          <label htmlFor="photo" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Driver's License Photo:</label>
          <Button variant="contained" className="dark:bg-gray-700 dark:text-white" component="label">
            Upload File
            <input
              type="file"
              id="photo"
              name="photo"
              hidden
              onChange={handlePhotoUpload}
            />
          </Button>
        </div>
        <Button type="submit" variant="contained" className="dark:bg-gray-700 dark:text-white" endIcon={<SendIcon />}>Submit</Button>
      </form>
    </>
  );
};

export default RegisterPage;
