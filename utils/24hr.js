export default function formatHoursTo12HourClock(hour) {
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