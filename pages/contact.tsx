import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession, signOut } from "next-auth/react"
import axios from 'axios';
import Link from 'next/link';

export default function Contact() {

    const { data: session, status } = useSession()
    const [userId, setUserId] = useState('');
    const [username, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

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
                <form action="#" className="space-y-8 pt-8">
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <input type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="john@doe.com" required></input>
                    </div>
                    <div>
                        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <input type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required></input>
                    </div>
                    <div className="sm:col-span-2">
                        <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea id="message" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <button type="submit" className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-primary-700 sm:w-fit hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Send message</button>
                </form>
                <Button variant="contained" color="primary" endIcon={<SendIcon />}>Contact Us</Button>
        </>
    );
}