import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession, signOut } from "next-auth/react"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Contact() {
    const router = useRouter();

    const { data: session, status } = useSession()
        const [formData, setFormData] = useState({
          email: '',
          subject: '',
          phone: '',
          message: '',
        });

        // Function to handle login click redirection
        const loginClick = () => {
          const redirectTo = '/api/auth/signin'; // Replace with the desired route
          router.push(redirectTo);
        };
      
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFormData((prevData) => ({
            ...prevData,
            [name]: value,
          }));
        };
      
        const handleSubmit = async (e) => {
          e.preventDefault();
      
          try {
            // Make a POST request to the API route to send the email
            const response = await axios.post('/api/sendEmail', formData);
      
            // Handle the API response as needed
            console.log('Email sent:', response.data);
          } catch (error) {
            console.error('Error sending email:', error);
          }
        };

    if (status === "loading") {
        return <p>Loading...</p>
    }

    return (
        <>
                <h2 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Contact Us</h2>
                <p>Please reach out via the form below! We respond within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-8 pt-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Your email</label>
                        <input type="email" id="email" name="email"
                        value={formData.email}
                        onChange={handleChange} required className="shadow-sm bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="john@doe.com" required></input>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required className="block p-3 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required></input>
                    </div>
                    <div>
                        <label htmlFor="phone" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Phone Number</label>
                        <input type="text" id="phone" name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required className="block p-3 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="(888) 555-1234" required></input>
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-white dark:text-gray-300">Message</label>
                        <input type="text" id="message" name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required className="block p-3 w-full text-sm text-white bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Your message here" required></input>
                    </div>
                <button type="submit"
                    className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                >Contact Us</button>
                </form>
        </>
    );
}