import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession, signOut } from "next-auth/react"
import axios from 'axios';
import Link from 'next/link';

export default function Contact() {

    const { data: session, status } = useSession()
        const [formData, setFormData] = useState({
          email: '',
          subject: '',
          message: '',
        });
      
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
    if (status === "unauthenticated") {
        return <p>Unauthenticated. Please login!</p>
    }

    return (
        <>
                <h2 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">About/Contact Us</h2>
                <p>Figueroa Studios is a production and rehearsal space located in Los Angeles. We provide an accessible, affordable place to be creative and loud. Our air-conditioned studio is in a beautiful garden location near Downtown LA. Parking is provided and we offer engineering/production support on request. We are a 5 minute walk from the Metro A line and multiple bus lines.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">Booking:</h3>
                <p>In order to book, please <Link href="/register" className="text-sky-400/100">update your profile.</Link> Once you have added all required fields, you can use our <Link href="/booking" className="text-sky-400/100">booking form</Link> to complete your booking.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">Cancellations</h3>
                <p className="text-center">To cancel, please reach out to us via text or email. We will process your refund within 24 hours. Cancelations with less than 24 hour notice are subject to a $10 fee.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-gray-900 dark:text-white pt-5">Gear:</h3>
                <p className="text-center italic">Gear availability is subject to change. Please reach out to us if you will need something specific for your session!</p>
                <div className="columns-3xs pt-4">
                    <ul className="list-disc">
                        <li>Mac Mini 3 workstation</li>
                        <li>Ableton Live</li>
                        <li>Mackie Thump 1200W PA System</li>
                        <li>Adam T7V Monitor Pair</li> 
                        <li>Soundcraft MTK-12 Mixer/Audio Interface</li>
                        <li>AKG C414 Microphone</li>
                        <li>Shure SM58 Microphones</li>
                        <li>Ensoniq ESQ-1</li>
                        <li>Moog Slim Phatty</li>
                        <li>Korg DW-8000</li>
                        <li>Arp Axxe</li>
                        <li>Korg Minilogue</li>
                        <li>Akai MPK Mini 3</li>
                        <li>Keyboard Stands</li>
                        <li>Gretsch Baritone Guitar</li>
                        <li>Squier Jaguar Electric Guitar</li>
                        <li>Fender Deluxe Reverb Amplifier</li>
                        <li>Fender R.A.D. Bass Amp</li>
                        <li>Cables</li>
                    </ul>
                </div>
                <form onSubmit={handleSubmit} className="space-y-8 pt-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" name="email"
                        value={formData.email}
                        onChange={handleChange} required className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="john@doe.com" required></input>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required></input>
                    </div>
                    <div>
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Message</label>
                        <input type="text" id="message" name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required></input>
                    </div>
                <Button type="submit" variant="contained" className="dark:bg-gray-700 dark:text-white" endIcon={<SendIcon />}>Contact Us</Button>
                </form>
        </>
    );
}