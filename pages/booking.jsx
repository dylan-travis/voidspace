import React from 'react';
import { Menu, Transition } from '@headlessui/react'
import { DotsVerticalIcon } from '@heroicons/react/outline'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid'
import {
    add,
    eachDayOfInterval,
    endOfMonth,
    format,
    getDay,
    isEqual,
    isSameDay,
    isSameMonth,
    isToday,
    parse,
    parseISO,
    startOfToday,
} from 'date-fns'
import { Fragment, useState, useEffect } from 'react'
import TimePicker from '../components/TimePicker'
import { useSession, getSession } from "next-auth/react"


function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

// Grabs bookings from DB
export async function getServerSideProps() {
    try {
        const apiUrl = process.env.NEXTAUTH_URL + "/api/getBookings"
        let response = await fetch(apiUrl);
        console.log(response)
        const bookings = await response.json();
        // console.log(bookings)
        return { props: { bookings } };
    } catch (e) {
        console.error(e);
    }
}



// Displays calendar and booked appointments
export default function Calendar({ bookings }) {
    const { data: session, status } = useSession()
    let today = startOfToday()
    let [selectedDay, setSelectedDay] = useState(today)
    const [filteredBookings, setFilteredBookings] = useState([]);
    const [allBookings, setAllBookings] = useState([]);
    let [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'))
    let firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date())
    const [bookedHours, setBookedHours] = useState([]);

    let days = eachDayOfInterval({
        start: firstDayCurrentMonth,
        end: endOfMonth(firstDayCurrentMonth),
    });

    // Updates Calendar state from Timepicker - establishes a connection between the two components in order to show new meetings as they are created.
    async function updateCalendarState(response) {
        // Logic to update the state in the Calendar component
        // Update the bookings state with the new meeting from the response (if available)
        if (response) {
            let newResponseApiUrl = process.env.NEXTAUTH_URL + '/getBookings';
            let newResponse = await fetch(newResponseApiUrl);
            const updatedBookings = await newResponse.json();
            // Add the new meeting to the existing allBookings array using spread operator
            setAllBookings([...allBookings, updatedBookings]);
            // Takes the updatedBookings array and filters it to only show the meetings that match the selected day
            // console.log("All Bookings is now: " + JSON.stringify(allBookings))
            setFilteredBookings(updatedBookings.filter((meeting) =>
                isSameDay(parseISO(meeting.bookingDate), selectedDay)));
            setBookedHours([...bookedHours, ...updatedBookings.map((booking) => booking.bookingHour)])
        }
        else {
            setFilteredBookings(bookings.filter((meeting) =>
                isSameDay(parseISO(meeting.bookingDate), selectedDay)));

            logBookings(bookings, selectedDay);
        }
    }

    // Deletes meeting from DB
    const handleDeleteMeeting = (bookingId) => {
        setFilteredBookings((prevBookings) =>
            prevBookings.filter((meeting) => meeting._id !== bookingId)
        );
    };

    // Filtering logic for bookings goes here - looks at the selected day and pulls all meetings that match that day. This is the setFilteredBookings object.
    async function logBookings() {
        try {
            const allBookings = bookings;
            const selectedDayBookings = bookings.filter((meeting) =>
                isSameDay(parseISO(meeting.bookingDate), selectedDay)
            );
            setAllBookings(allBookings);
            setFilteredBookings(selectedDayBookings);
        } catch (e) {
            console.error(e);
        }
    }
    // Note that logBookings is asynchronously called in several locations in this file. This is because we need to wait for the bookings to be fetched from the DB before we can filter them.
    useEffect(() => {

        logBookings();
    }, [selectedDay]);

    // Functions for navigating the calendar
    function previousMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    function nextMonth() {
        let firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 })
        setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'))
    }

    if (status === "loading") {
        return <p>Loading...</p>
    }
    if (status === "unauthenticated") {
        return <p>Access Denied</p>
    }

    return (
        <div>
            <h1 className="text-center text-4xl font-bold pt-5 pb-5">Booking</h1>
            <div className="max-w-md px-4 mx-auto sm:px-7 md:max-w-4xl md:px-6">
                <div className="md:grid md:grid-cols-2 md:divide-x md:divide-gray-200">
                    <div className="md:pr-14">
                        <div className="flex items-center">
                            <h2 className="flex-auto font-semibold text-gray-900">
                                {format(firstDayCurrentMonth, 'MMMM yyyy')}
                            </h2>
                            <button
                                type="button"
                                onClick={previousMonth}
                                className="-my-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Previous month</span>
                                <ChevronLeftIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                            <button
                                onClick={nextMonth}
                                type="button"
                                className="-my-1.5 -mr-1.5 ml-2 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
                            >
                                <span className="sr-only">Next month</span>
                                <ChevronRightIcon className="w-5 h-5" aria-hidden="true" />
                            </button>
                        </div>
                        <div className="grid grid-cols-7 mt-10 text-xs leading-6 text-center text-gray-500">
                            <div>S</div>
                            <div>M</div>
                            <div>T</div>
                            <div>W</div>
                            <div>T</div>
                            <div>F</div>
                            <div>S</div>
                        </div>
                        <div className="grid grid-cols-7 mt-2 text-sm">
                            {days.map((day, dayIdx) => (
                                <div
                                    key={day.toString()}
                                    className={classNames(
                                        dayIdx === 0 && colStartClasses[getDay(day)],
                                        'py-1.5'
                                    )}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setSelectedDay(day)}
                                        className={classNames(
                                            isEqual(day, selectedDay) && 'text-white',
                                            !isEqual(day, selectedDay) &&
                                            isToday(day) &&
                                            'text-red-500',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-900',
                                            !isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            !isSameMonth(day, firstDayCurrentMonth) &&
                                            'text-gray-400',
                                            isEqual(day, selectedDay) && isToday(day) && 'bg-red-500',
                                            isEqual(day, selectedDay) &&
                                            !isToday(day) &&
                                            'bg-gray-900',
                                            !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                                            (isEqual(day, selectedDay) || isToday(day)) &&
                                            'font-semibold',
                                            'mx-auto flex h-8 w-8 items-center justify-center rounded-full'
                                        )}
                                    >
                                        <time dateTime={format(day, 'yyyy-MM-dd')}>
                                            {format(day, 'd')}
                                        </time>
                                    </button>

                                    <div className="w-1 h-1 mx-auto mt-1">
                                        {allBookings.some((meeting) =>
                                            isSameDay(parseISO(meeting.bookingDate), day)
                                        ) && (
                                                <div className="w-1 h-1 rounded-full bg-sky-500"></div>
                                            )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <section className="mt-12 md:mt-0 md:pl-14">
                        <h2 className="font-semibold text-gray-900">
                            Bookings for{' '}
                            <time dateTime={format(selectedDay, 'yyyy-MM-dd')}>
                                {format(selectedDay, 'MMM dd, yyy')}
                            </time>
                        </h2>
                        <ol className="mt-4 space-y-1 text-sm leading-6 text-gray-500">
                            {/* here is where we loop over the meetings */}
                            {filteredBookings.length > 0 ? (
                                filteredBookings.map((meeting) => (
                                    <Meeting meeting={meeting} handleDeleteMeeting={handleDeleteMeeting} key={meeting._id} updateCalendarState={updateCalendarState} />
                                ))
                            ) : (
                                <p>No bookings today.</p>

                            )}
                        </ol>
                    </section>
                </div>
            </div>
            <TimePicker selectedDay={selectedDay} updateCalendarState={updateCalendarState} bookings={bookings} bookedHours={bookedHours} setBookedHours={setBookedHours} filteredBookings={filteredBookings} />
        </div>
    )
}

// Displays Meetings within the calendar
function Meeting({ meeting, handleDeleteMeeting }) {
    let startDateTime = parseISO(meeting.bookingDate)
    let endDateTime = parseISO(meeting.endBookingDate)
    let bookingHourStart = formatHoursTo12HourClock(meeting.bookingHour)
    let bookingHourEnd = formatHoursTo12HourClock(meeting.endBookingHour)

    const handleDeleteBooking = async (bookingId) => {
        const deleteBookingApiUrl = process.env.NEXTAUTH_URL + '/api/deleteBooking';
        try {
            await fetch(deleteBookingApiUrl + `?_id=${bookingId}`, {
                method: "DELETE"
            });
            // Perform any additional actions after successful deletion
            handleDeleteMeeting(bookingId);
        } catch (error) {
            console.error(error);
        }
    };

    const DeleteBookingLink = ({ bookingId, handleDelete }) => {
        return (

            <a
                href="#"
                className='text-black block px-4 py-2 text-sm'

                onClick={(e) => {
                    e.preventDefault();
                    handleDelete(bookingId);
                }}
            >
                Delete Booking
            </a>

        );
    };

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

    return (
        <li key={meeting._id} className="flex items-center px-4 py-2 space-x-4 group rounded-xl focus-within:bg-gray-100 hover:bg-gray-100">
            <img
                src="/blacksquare.jpg"
                alt=""
                className="flex-none w-10 h-10 rounded-full"
            />
            <div className="flex-auto">
                <p className="text-gray-900">{meeting.username} {meeting.confirmed ? <span className="italic text-green-500"> (confirmed)</span> : <span className="italic text-red-600"> (unconfirmed)</span>}</p>
                <p className="mt-0.5">
                    <time dateTime={meeting.startDatetime}>
                        {bookingHourStart}
                    </time>{' '}
                    -{' '}
                    <time dateTime={meeting.endDatetime}>
                        {bookingHourEnd}
                    </time>

                </p>
            </div>
            <Menu
                as="div"
                className="relative opacity-0 focus-within:opacity-100 group-hover:opacity-100"
            >
                <div>
                    <Menu.Button className="-m-2 flex items-center rounded-full p-1.5 text-gray-500 hover:text-gray-600">
                        <span className="sr-only">Open options</span>
                        <DotsVerticalIcon className="w-6 h-6" aria-hidden="true" />
                    </Menu.Button>
                </div>


                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 origin-top-right bg-white rounded-md shadow-lg w-36 ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item as="div">
                                {({ active }) => (
                                    <a
                                        href="#"
                                        className={classNames(
                                            active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                                            'block px-4 py-2 text-sm'
                                        )}
                                    >
                                        Edit
                                    </a>
                                )}
                            </Menu.Item>
                            <Menu.Item as="div">
                                <DeleteBookingLink bookingId={meeting._id} handleDelete={handleDeleteBooking}
                                />
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>
        </li>
    )
}

let colStartClasses = [
    '',
    'col-start-2',
    'col-start-3',
    'col-start-4',
    'col-start-5',
    'col-start-6',
    'col-start-7',
]
