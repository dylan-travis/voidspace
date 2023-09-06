import React, { useState, useEffect, useRef } from 'react';
import { format } from 'date-fns';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { useSession, getSession } from "next-auth/react"
import { v4 as uuidv4 } from 'uuid';


const TimePicker = ({ selectedDay, updateCalendarState, bookings, bookedHours, setBookedHours, filteredBookings }) => {

    // State variables
    const [selectedHour, setSelectedHour] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [meetings, setMeetings] = useState([]);
    const { data: session } = useSession()
    const [updatedBookings, setUpdatedBookings] = useState([])
    const [cart, setCart] = useState([]);
    const [includeEngineer, setIncludeEngineer] = useState(false);

    // Create a ref to hold the reference of the modal container
    const modalRef = useRef(null);

    // Function to handle click outside the modal
    const handleOutsideClick = (e) => {
        if (modalRef.current && !modalRef.current.contains(e.target)) {
            setIsModalOpen(false);
        }
    };

    // useEffect to initialize the updatedBookings state with the initial bookings data
    useEffect(() => {
        const bookedHoursSet = new Set(); // Using a Set to avoid duplicates
        const cartItems = []
        cart.forEach((item) => {
            cartItems.push(item);
          });
        const mergedArray = [...cartItems, ...bookings];
        mergedArray.forEach((booking) => {
            const { bookingDate, bookingHour, confirmed } = booking;
            bookedHoursSet.add({ date: bookingDate, hour: bookingHour, confirmed: confirmed });
        });

        setBookedHours(Array.from(bookedHoursSet));
        setUpdatedBookings(Array.from(bookedHoursSet));
    }, [bookings, setBookedHours]);

    // useEffect to update the updatedBookings state whenever the bookings prop changes
    useEffect(() => {
        const bookedHoursSet = new Set();
        const cartItems = []
        cart.forEach((item) => {
            cartItems.push(item);
          });
        const mergedArray = [...cartItems, ...bookings];
        mergedArray.forEach((booking) => {
            const { bookingDate, bookingHour, confirmed } = booking;
            bookedHoursSet.add({ date: bookingDate, hour: bookingHour, confirmed: confirmed });
        });
        // console.log("bookedHoursSet: " + JSON.stringify(Array.from(bookedHoursSet)));
        setUpdatedBookings(Array.from(bookedHoursSet));
    }, [bookings, cart]);

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

    // formats the hour to 12-hour clock format
    function formatHoursTo12HourClock(hour) {
        // Parse the hour string to an integer
        const parsedHour = parseInt(hour, 10);
        // Ensure the hour is within the valid range (0 to 23)
        if (isNaN(parsedHour) || parsedHour < 0 || parsedHour > 23) {
            throw new Error('Invalid hour value. Please provide a valid 24-hour clock hour (0 to 23).');
        }
        // Convert to 12-hour clock format
        const formattedHour = parsedHour % 12 || 12;
        // Determine AM or PM based on the original hour value
        const period = parsedHour < 12 ? 'AM' : 'PM';
        return `${formattedHour}${period}`;
    }

    // when you click on a time slot, update selectedHour
    const handleHourClick = (hour) => {
        setSelectedHour(hour);
        setIsModalOpen(true);
    };

    const handleBookingSubmit = async (e) => {
        e.preventDefault();
        const uniqueKey = uuidv4();
        try {
            const timePickerApiUrl = process.env.NEXT_PUBLIC_NEXTAUTH_URL + "/api/addToCart";
            const withEngineer = includeEngineer;
            let withEngineerBody = JSON.stringify({
                userId: session.user.id,
                id: session.user.id,
                username: session.user.username,
                bookingDate: selectedDay,
                bookingHour: selectedHour,
                endBookingHour: selectedHour + 2,
                endBookingDate: selectedDay,
                imgUrl: "/blacksquare.jpg",
                date: Date.now(),
                confirmed: false,
                productName: "Two Hours with Engineer",
                price: "price_1NleGuK1A3hq7BalHOpwdQqU",
                productPrice: 110,
                quantity: 1,
                key: uniqueKey,
                engineer: includeEngineer, // Include engineer in the request
            });
            let withoutEngineerBody = JSON.stringify({
                userId: session.user.id,
                id: session.user.id,
                username: session.user.username,
                bookingDate: selectedDay,
                bookingHour: selectedHour,
                endBookingHour: selectedHour + 2,
                endBookingDate: selectedDay,
                imgUrl: "/blacksquare.jpg",
                date: Date.now(),
                confirmed: false,
                productName: "Two Hours",
                price: "price_1NQcKtK1A3hq7BalXT5wvjyv",
                productPrice: 60,
                quantity: 1,
                key: uniqueKey,
                engineer: includeEngineer, // No engineer
            });
            let response = await fetch(timePickerApiUrl, {
                method: "POST",
                body: withEngineer ? withEngineerBody : withoutEngineerBody,
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                
            });
            response = await response.json();

            // Update the cart state by creating a new array with the new item
            setCart((prevCart) => [...cart, response]);

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
            let americanHours = formatHoursTo12HourClock(hour)
            // Reformat the booking.date to match the format of selectedDay ("YYYY-MM-DD")
            function bookingDateFormatted(date) {
                // console.log("trying to format date: " + date)
                try {
                    new Date(date).toISOString().split('T')[0];
                }
                catch {
                    console.log("error formatting date")
                }
            }

            // Reformat selectedDay to match the format "YYYY-MM-DD"
            function bookingSelectedDayFormatted(bookingdate) {
                bookingdate.toISOString().split('T')[0];
            }

            const isBooked = filteredBookings.some(
                (booking) => bookingDateFormatted(booking.bookingDate) === bookingSelectedDayFormatted(selectedDay) && booking.bookingHour === hour
            );
            return (
                <button
                    key={(hour)}
                    onClick={() => handleHourClick(hour)}
                    disabled={isBooked}
                    className="xxs:w-16 xs:w-16 text-center xxs:text-sm xs:text-sm disabled:text-gray-700 disabled:hover:bg-red-500 bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-gray-300 hover:border-transparent rounded"
                >
                    {americanHours}
                </button>
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
                <Box className="bg-gray-900">
                    <div className="fixed inset-0 flex items-center justify-center">
                        <div ref={modalRef} className="bg-gray-700 dark:bg-gray-700 p-4 shadow-lg rounded">
                            <form onSubmit={handleBookingSubmit}>
                                <div>
                                    <div className="bg-gray-600  shadow-lg border-solid rounded ">
                                        <h2 className="text-xl font-bold mb-4 text-center">Book the Studio:</h2>
                                        <p className="text-med italic  text-center">{formatHoursTo12HourClock(selectedHour)}-{formatHoursTo12HourClock(selectedHour + 2)} </p>
                                        <p className="text-med italic  mb-4 text-center">{format(new Date(selectedDay), 'dd MMMM, yyyy')}</p>
                                        <input type="checkbox" className="ml-4  " checked={includeEngineer} onChange={(e) => setIncludeEngineer(e.target.checked)}></input> <span className="text-sm italic text-center ">Include an engineer ($50/hr)
                                        </span></div>
                                    <label htmlFor="description" className="">Comments:</label>
                                    <textarea id="description" className="shadow-sm  bg-gray-400 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" />
                                </div>
                                <div className="flex justify-end mt-4">
                                    <button
                                        type="button"
                                        onClick={() => setIsModalOpen(false)}
                                        className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                                        >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="bg-transparent hover:bg-gray-900 text-white font-semibold hover:text-white py-2 px-4 border border-white hover:border-transparent rounded"
                                        >
                                        Add to Cart
                                    </button>
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
