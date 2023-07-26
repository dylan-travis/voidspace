import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession } from "next-auth/react"


export async function getServerSideProps() {
    try {
        let response = await fetch('http://localhost:3000/api/addBooking');
        let bookings = await response.json();

        return {
            props: { bookings: JSON.parse(JSON.stringify(bookings)) },
        };
    } catch (e) {
        console.error(e);
    }
}

const TimePicker = ({ selectedDay, updateCalendarState }) => {

    // State variables
    const [selectedHour, setSelectedHour] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const [bookedHours, setBookedHours] = useState([16, 18]); // Example: 16:00 and 18:00 are booked
    const { data: session } = useSession()
    // Create a ref to hold the reference of the modal container
    const modalRef = useRef(null);

    // Function to handle click outside the modal
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    // Add click event listener when the modal opens
    useEffect(() => {
        if (isModalOpen) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        // Clean up the click event listener when the component unmounts or the modal closes
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [isModalOpen]);


    const handleHourClick = (hour) => {
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch("http://localhost:3000/api/addBooking", {
                method: "POST",
                body: JSON.stringify({
                    id: session.user.id,
                    bookingDate: selectedDay,
                    bookingHour: selectedHour,
                    date: Date.now(),
                    confirmed: false,
                    productName: "Two Hours",
                    price: "price_1NQcKtK1A3hq7BalXT5wvjyv",
                    productPrice: 60,
                    quantity: 1

                }),
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
            });
            response = await response.json();
            console.log("response from handleBookingSubmit" + JSON.stringify(response))
            // Invoke the updateCalendarState prop to trigger the state update in the Calendar component
            setIsModalOpen(false);
            updateCalendarState(response);
        } catch (errorMessage) {
            console.error(errorMessage);
        }
    };

    // Logic for rendering out buttons for each hour
    const renderHoursButtons = () => {
        const hours = Array.from({ length: 5 }, (_, i) => 12 + i * 2); // Generate hours from 15 to 21

        // This maps out the hours array and returns a button for each hour
        // Needs conditional logic for disabling the button if the hour is already booked
        return hours.map((hour) => {
            const isBooked = bookedHours.includes(hour);

            return (
                <Button
                    key={hour}
                    className={`${isBooked ? 'disabled bg-gray-300 hover:bg-gray-300' : ''}`}
                    onClick={() => handleHourClick(hour)}
                    disabled={isBooked}
                    variant="contained"
                >
                    {format(new Date().setHours(hour, 0), 'HH:mm')}
                </Button>
            );
        });
    };



    return (
        <div>
            <h1 className="text-2xl font-bold mb-4 text-center pt-8">Select a time:</h1>
            <div className="flex p-4 justify-center space-x-2">
                {renderHoursButtons()}
            </div>
            {isModalOpen && (
                <Box>
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div ref={modalRef} className="bg-white p-4 shadow-lg rounded">
                            <form onSubmit={handleBookingSubmit}>
                                <div>
                                    <div className="bg-slate-200 shadow-lg border-solid rounded ">
                                        <h2 className="text-xl font-bold mb-4 text-center">Book the Studio:</h2>
                                        <p className="text-med italic  text-center">{format(new Date().setHours(selectedHour, 0), 'HH:mm')}-{format(new Date().setHours(selectedHour + 2, 0), 'HH:mm')} </p>
                                        <p className="text-med italic mb-4 text-center">{format(new Date(selectedDay), 'dd MMMM, yyyy')}</p>
                                        <input type="checkbox" className="ml-4"></input> <span className="text-sm italic text-center">Include an engineer ($50/hr)
                                        </span></div>
                                    <label htmlFor="description">Comments:</label>
                                    <textarea id="description" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <Button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        variant="contained"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        variant="contained"
                                        color="primary"
                                    >
                                        Add to Cart
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </Box>
            )}
            {/* Rest of the calendar components */}
        </div>
    );
};

export default TimePicker;
