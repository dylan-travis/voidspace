import React, { useEffect, useState } from 'react';
import { useSession, signOut } from "next-auth/react"
import { Box, Button, Divider, FormHelperText, Input, InputLabel, TextField } from '@mui/material';
import { FormControl } from '@mui/material';
import axios from 'axios';


  
function Profile() {
  
  const { data: session } = useSession()
  const [userId, setUserId] = useState('');
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const handleNameChange = (event) => {
    setUserName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneChange = (event) => {
    setPhone(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };
  

  useEffect(() => {
    // Fetch user profile data from the database and update the state
    if (session) {
      const fetchUserProfile = async () => {
        try {
          // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to fetch the user's profile
          const profileApiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL + '/api/fetchProfile';
          const response = await axios.get(profileApiUrl, {
            params: { userId: session.user.id },
          });
          const { username, email, phone, address } = response.data;
          setUserName(username);
          setEmail(email);
          setPhone(phone);
          setAddress(address);
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };
      fetchUserProfile();
    }
  }, [session]);

  
  if (session) {
    const userId = session.user.id;

    const handleSubmit = () => {
      const updatedProfile = {
        userId,
        username,
        email,
        phone,
        address,
      };  
  
      // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint to update the user's profile
      axios.put('/api/updateProfile', updatedProfile)
        .then((response) => {
          console.log('Profile updated successfully:', response.data);
          // Add any success message or additional logic as needed
        })
        .catch((error) => {
          console.error('Error updating profile:', error);
          // Add error handling or display error messages as needed
        });
    };

    return (
      <>
        <div>
          <h1 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">Update Profile</h1>
          <FormControl fullWidth>
            <TextField fullWidth required label="Name" id="Name" onChange={handleNameChange} value={username} className="mb-5"/>
            <TextField fullWidth required label="Email" id="Email" onChange={handleEmailChange} value={email}  className="mb-5"/>
            <TextField fullWidth value={phone} label="Phone" id="Phone" onChange={handlePhoneChange} className="mb-5"/>
            <TextField fullWidth value={address} label="Address" id="Address" onChange={handleAddressChange} className="mb-5"/>
        </FormControl>
          <div className="pt-4 text-center">
          <Button variant="contained" color="primary" onClick={handleSubmit} type="submit">Update</Button>
          <Button variant="contained" color="primary" component="label" >
                  <button onClick={() => signOut()}>SIGN OUT</button>
                </Button>
          </div>
        </div>
      </>
    )
  }
  return (
    <>
      <div>
        <h1 className="text-4xl font-bold pb-6">Not Signed In!</h1>
      </div>
    </>
  );
}

export default Profile;