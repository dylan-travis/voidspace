import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';


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


    const handleHourClick = (hour) => {
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        try {
            const title = e.target.elements.title.value;
            const name = e.target.elements.name.value;
            const description = e.target.elements.description.value;
            let response = await fetch("http://localhost:3000/api/addBooking", {
                method: "POST",
                body: JSON.stringify({
                    id: Math.random().toString(36).substr(2, 9),
                    name,
                    date: selectedDay,
                    hour: selectedHour,
                    title,
                    description,
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
                        <div className="bg-white p-4 shadow rounded">
                            <form onSubmit={handleBookingSubmit}>
                                <div>
                                    <label htmlFor="title">Title:</label>
                                    <input type="text" id="title" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
                                </div>
                                <div>
                                    <label htmlFor="title">Name:</label>
                                    <input type="text" id="name" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
                                </div>
                                <div>
                                    <label htmlFor="description">Description:</label>
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
