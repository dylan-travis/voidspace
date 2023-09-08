import React, { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession, signOut } from "next-auth/react"
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';

export default function Contact() {
    const router = useRouter();

    const { data: session, status } = useSession()
        const [formData, setFormData] = useState({
          email: '',
          subject: '',
          message: '',
        });

        // Function to handle login click redirection
        const loginClick = () => {
          const redirectTo = '/api/auth/signin'; // Replace with the desired route
          router.push(redirectTo);
        };

    if (status === "loading") {
        return <p>Loading...</p>
    }
    if (status === "unauthenticated") {
        return( 
          <>
          <h2 className="mb-4 text-4xl font-bold text-center text-white  pt-5">About Us</h2>
          <p>Voidspace is a production and rehearsal space located in East LA. We provide an accessible, affordable place to be creative and loud. Our air-conditioned studio is in a beautiful garden location near Highland Park. Parking is provided and we offer engineering/production support on request. We are a 5 minute walk from the Metro A line and multiple bus lines.</p>
          <Image src="/studio.jpg" width="1000" height="1000" className="pt-2" alt="Voidspace studio photo"/>
          <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Booking</h3>
          <p>In order to book, please <Link href="/api/auth/signin" className="text-sky-400/100">login.</Link> Once logged in, you can use our <Link href="/booking" className="text-sky-400/100">booking form</Link> to complete your booking. Daily and weekly rates are also available <Link href="/contact" className="text-sky-400/100">via our contact form.</Link> We will ask you for some additional information to verify your identity via email. Address and directions will be provided once booking is complete.</p> 
          <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Cancellations</h3>
          <p className="text-center">To cancel, please reach out to us via text or email. We will process your refund within 24 hours. Cancelations with less than 24 hour notice are subject to a $10 fee.</p>
          <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Pricing</h3>
          <p className="text-center">The studio is currently $20/hr with a 2 hour minimum. Engineering/production support is $50/hr with a two hour minimum.</p>
          <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Parking</h3>
          <p className="text-center">Protected driveway parking is provided for up to two vehicles. Street parking is also widely available.</p>
          <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Gear</h3>
          <p className="text-center italic">Please login for our gear list! Gear availability is subject to change. Please reach out to us if you will need something specific for your session!</p>
  </>
        )
    }

    return (
        <>
                <h2 className="mb-4 text-4xl font-bold text-center text-white  pt-5">About Us</h2>
                <p>Voidspace is a production and rehearsal space located in East LA. We provide an accessible, affordable place to be creative and loud. Our air-conditioned studio is in a beautiful garden location near Highland Park. Parking is provided and we offer engineering/production support on request. We are a 5 minute walk from the Metro A line and multiple bus lines.</p>
                <p>The studio itself features approximately 11'x14' of usable space, and can be configured as needed. Sliding glass doors lead to an outdoor patio/smoking area. Drums are allowed, but not provided.</p>
                <Image src="/studio.jpg" width="1000" height="1000" className="pt-2" alt="Voidspace studio photo"/>
                <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Booking</h3>
                <p>In order to book, please <Link href="/api/auth/signin" className="text-sky-400/100">login.</Link> Once you have added all required fields, you can use our <Link href="/booking" className="text-sky-400/100">booking form</Link> to complete your booking. Daily and weekly rates are also available <Link href="/contact" className="text-sky-400/100">via our contact form.</Link></p>
                <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Cancellations</h3>
                <p className="text-center">To cancel, please reach out to us via text or email. We will process your refund within 24 hours. Cancelations with less than 24 hour notice are subject to a $10 fee.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Pricing</h3>
                <p className="text-center">The studio is currently $20/hr with a 2 hour minimum. Engineering/production support is $50/hr with a two hour minimum.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Parking</h3>
                <p className="text-center">Protected driveway parking is provided for up to two vehicles. Street parking is also widely available.</p>
                <h3 className="mb-4 text-4xl font-bold text-center text-white  pt-5">Gear</h3>
                <p className="text-center italic">Gear availability is subject to change. Please reach out to us if you will need something specific for your session!</p>
                <div className="columns-3xs pt-4 pl-4">
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
                        <li>AC/Heating</li>
                    </ul>
                </div>
        </>
    );

}