import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


// Function to format date with zero-padding for month and day
const formatDateWithZeroPadding = (date) => {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Zero-padding for month
    const day = date.getDate().toString().padStart(2, '0'); // Zero-padding for day
    return `${month}/${day}/${year}`;
};


const DigitalClock = () => {
    const [currentTime, /*setCurrentTime*/] = useState(new Date());
    const [, /*enteredId*/ setEnteredId] = useState("");
    const [loggedInEmployee, setLoggedInEmployee] = useState(null);
    const [loggedInEmployeeOne, setLoggedInEmployeeOne] = useState(null);
    const [workdays, setWorkdays] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [endTime, setEndTime] = useState(null);
    const [breakInTime, setBreakInTime] = useState(null);
    const [breakOutTime, setBreakOutTime] = useState(null);
    const [totalWorkTime, setTotalWorkTime] = useState(0);
    const [isWorkdayStarted, setIsWorkdayStarted] = useState(false);

    // Helper function to display success message
    const showSuccessToast = (message) => {
        toast.success(message);
    };

    // Helper function to display error message
    const showErrorToast = (message) => {
        toast.error(message);
    };

    useEffect(() => {
        // Retrieve logged-in employee data
        const fetchLoggedInEmployee = async () => {
            try {
                const response = await fetch("http://localhost:5000/LoggedInEmployee");
                if (!response.ok) {
                    throw new Error("Network response was not ok.");
                }
                const data = await response.json();
                setLoggedInEmployee(data);
                setEnteredId(data?.employeeId || "");
            } catch (error) {
                console.error("Error fetching logged-in employee:", error);
            }
        };

        fetchLoggedInEmployee();
    }, []);







    useEffect(() => {
        // Load data from local storage when component mounts

        const storedStartTime = localStorage.getItem("startTime");
        if (storedStartTime) {
            const parsedStartTime = JSON.parse(storedStartTime);
            parsedStartTime.date = new Date(parsedStartTime.date); // Parse date string into Date object
            setStartTime(parsedStartTime);
        }
        const storedBreakInTime = localStorage.getItem("breakInTime");
        if (storedBreakInTime) {
            const parsedBreakInTime = JSON.parse(storedBreakInTime);
            parsedBreakInTime.date = new Date(parsedBreakInTime.date); // Parse date string into Date object
            setBreakInTime(parsedBreakInTime);
        }

        const storedBreakOtTime = localStorage.getItem("breakOutTime");
        if (storedBreakOtTime) {
            const parsedBreakOtTime = JSON.parse(storedBreakOtTime);
            parsedBreakOtTime.date = new Date(parsedBreakOtTime.date); // Parse date string into Date object
            setBreakOutTime(parsedBreakOtTime);
        }

        const storedTotalWorkTime = localStorage.getItem("totalWorkTime");
        if (storedTotalWorkTime) {
            // Parse the string representation back to milliseconds
            const parsedTotalWorkTime = parseTimeString(storedTotalWorkTime);
            setTotalWorkTime(parsedTotalWorkTime);
        }

        // Add similar blocks to load other data as needed

    }, []);


const parseTimeString = (timeString) => {
    const [hours, minutes, seconds] = timeString.split(':').map(Number);
    return (hours * 60 * 60 + minutes * 60 + seconds) * 1000; // Convert to milliseconds
};


    useEffect(() => {
        if (startTime) {
            localStorage.setItem("startTime", JSON.stringify(startTime));
        }


        else {
            localStorage.removeItem("startTime");
        }

        if (breakInTime) {
            localStorage.setItem("breakInTime", JSON.stringify(breakInTime));
        } else {
            localStorage.removeItem("breakInTime");
        }
        if (breakOutTime) {
            localStorage.setItem("breakOutTime", JSON.stringify(breakOutTime));
        } else {
            localStorage.removeItem("breakOutTime");
        }
        if (endTime) {
            localStorage.setItem("endTime", JSON.stringify(endTime));
        } else {
            localStorage.removeItem("endTime");
        }
        if (totalWorkTime) {
            // Convert totalWorkTime to a string representing hours, minutes, and seconds
            const totalWorkTimeAsString = formatMilliseconds(totalWorkTime);
            localStorage.setItem("totalWorkTime", totalWorkTimeAsString);
        } else {
            localStorage.removeItem("totalWorkTime");
        }

        // Add similar blocks to save other data as needed

    }, [startTime, breakInTime, breakOutTime, endTime ,totalWorkTime]);

    useEffect(() => {
        setEnteredId(loggedInEmployee?.employeeId || "");
    }, [loggedInEmployee]);

    useEffect(() => {
        // Retrieve stored logged-in employee data
        const storedEmployee = localStorage.getItem("loggedInEmployee");

        if (storedEmployee) {
            try {
                const parsedEmployee = JSON.parse(storedEmployee);
                setLoggedInEmployeeOne(parsedEmployee);
            } catch (error) {
                console.error("Error parsing loggedInEmployee:", error);
            }
        } else {
            console.log("No loggedInEmployee found in local storage");
        }

        // Retrieve start day data from local storage
        const storedStartDayData = localStorage.getItem("startDayData");
        if (storedStartDayData) {
            try {
                const parsedStartDayData = JSON.parse(storedStartDayData);
                setStartTime(parsedStartDayData.startTime);
                setIsWorkdayStarted(parsedStartDayData.isWorkdayStarted);
            } catch (error) {
                console.error("Error parsing start day data:", error);
            }
        }
    }, []);

    useEffect(() => {
        // Save start day data to local storage whenever it changes
        if (startTime) {
            const startDayData = {
                startTime,
                isWorkdayStarted,
            };
            localStorage.setItem("startDayData", JSON.stringify(startDayData));
        }
    }, [startTime, isWorkdayStarted]);

    useEffect(() => {
        // updateCalendar();
    }, [workdays]);

    const handleStartDay = async () => {
        try {
            console.log("Logged-in employee data in handleStartDay:", loggedInEmployeeOne); // Add this line
            // Check if work hours already exist for the logged-in employee on the current date
            const response = await axios.post(
                "http://localhost:3001/api/checkWorkHours",
                {
                    employeeId: loggedInEmployeeOne?.employeeid || "",
                    date: formatDateWithZeroPadding(new Date()), // Format date as dd/mm/yyyy
                }
            );

            if (response.data.workHoursExist) {
                // Show only the "You already logged out. See you tomorrow!" toast
                showErrorToast("You already logged out. See you tomorrow!");
            } else {
                // Continue starting the day if work hours do not exist
                const currentDate = new Date();
                const formattedStartTime = currentDate.toLocaleTimeString();
                setStartTime({ time: formattedStartTime, date: currentDate });
                setIsWorkdayStarted(true);

                // Log when starting the day
                console.log("Starting the day. Data saved to localStorage:", {
                    startTime: formattedStartTime,
                    startDate:currentDate,
                    isWorkdayStarted: true,
                });

                // Show the "Day started successfully!" toast
                showSuccessToast("Day started successfully!");
            }
        } catch (error) {
            console.error("Error checking work hours:", error);
            showErrorToast("Error starting the day. Please try again.");
            // Handle the error (e.g., show an error message to the user)
        }
    };

    const handleEndDay = async () => {
        if (startTime) {
            try {
                console.log("Logged-in employee data in handleEndDay:", loggedInEmployeeOne);

                // Get the current time
                const currentDate = new Date();
                const formattedEndTime = currentDate.toLocaleTimeString();
                setEndTime({ time: formattedEndTime, date: currentDate });

                // Format end date with zero-padding for month and day
                const formattedEndDate = formatDateWithZeroPadding(currentDate);

                // Calculate total work days
                let updatedTotalWorkDays = 0; // Initialize with 0
                const totalWorkDaysResponse = await axios.get(
                    `http://localhost:3001/total_work_days/${loggedInEmployeeOne?.employeeid}`
                );

                if (totalWorkDaysResponse && totalWorkDaysResponse.data && !isNaN(totalWorkDaysResponse.data.totalWorkDays)) {
                    updatedTotalWorkDays = totalWorkDaysResponse.data.totalWorkDays + 1;
                }

                // Ensure that updatedTotalWorkDays is a valid number
                if (isNaN(updatedTotalWorkDays) || updatedTotalWorkDays < 1) {
                    throw new Error("Invalid total work days value");
                }

                // Calculate total duration between startTime and endTime
                const totalDuration = currentDate.getTime() - startTime.date.getTime();

                // Calculate duration of breaks
                let breakDuration = 0;
                if (breakInTime && breakOutTime) {
                    breakDuration = breakOutTime.date.getTime() - breakInTime.date.getTime();
                }

                // Subtract break duration from total duration to get effective work duration
                const effectiveWorkDuration = totalDuration - breakDuration;

                // Convert effective work duration to format (hours:minutes:seconds)
                const formattedTotalWorkTime = formatMilliseconds(effectiveWorkDuration);

                const dataToSend = {
                    employeeId: loggedInEmployeeOne?.employeeid || "",
                    startTime: startTime.time,
                    startDate: startTime.date,
                    endTime: formattedEndTime,
                    endDate: formattedEndDate, // Update endDate format
                    breakInTime: breakInTime ? breakInTime.time : null,
                    breakOutTime: breakOutTime ? breakOutTime.time : null,
                    workHours: formatMilliseconds(totalDuration), // Include total work hours (including breaks) in the document
                    totalWorkTime: formattedTotalWorkTime, // Include effective total work time (excluding breaks) in the document
                    totalWorkDays: updatedTotalWorkDays, // Include totalWorkDays in the document
                };

                const response = await axios.post(
                    "http://localhost:3001/api/saveUnifiedData",
                    dataToSend
                );

                console.log("Server response:", response.data);

                // Update the state with the new totalWorkDays value
                setWorkdays((prevWorkdays) => [...prevWorkdays, dataToSend]);

                // Clear relevant state variables
                setStartTime(null);
                setEndTime(null);
                setBreakInTime(null);
                setBreakOutTime(null);
                setTotalWorkTime(0);
                setIsWorkdayStarted(false);

                // Clear start day data from local storage
                localStorage.removeItem("startDayData");
                console.log("Local storage data cleared.");
                showSuccessToast("Day ended successfully!");
            } catch (error) {
                console.error("Error handling end day:", error);
                showErrorToast("Error ending the day. Please try again.");
            }
        } else {
            showErrorToast("Please start the day first.");
        }
    };


    const handleBreakIn = () => {
        if (startTime && startTime.date instanceof Date) {
            const currentDate = new Date();
            const formattedBreakInTime = currentDate.toLocaleTimeString();
            setBreakInTime({ time: formattedBreakInTime, date: currentDate });

            // Subtract break-in time from total work hours
            const breakInMilliseconds =
                currentDate.getTime() - startTime.date.getTime();
            setTotalWorkTime(totalWorkTime + breakInMilliseconds);
            // Log when taking a break
            console.log("Taking a break. Break in time saved to localStorage:", {
                breakInTime: formattedBreakInTime,
            });
            showSuccessToast("Break in recorded successfully!");
        } else {
            showErrorToast(
                "Break in time already recorded or the day has not started."
            );
            showErrorToast("Error recording break in. Please try again.");
        }
    };


    const handleBreakOut = () => {
        if (startTime && breakInTime && !breakOutTime) {
            const currentDate = new Date();
            const formattedBreakOutTime = currentDate.toLocaleTimeString();
            setBreakOutTime({ time: formattedBreakOutTime, date: currentDate });
            // Log when ending a break
            console.log("Ending the break. Break out time saved to localStorage:", {
                breakOutTime: formattedBreakOutTime,
            });
            showSuccessToast("Break out recorded successfully!");
        } else {
            showErrorToast(
                "Break out time already recorded or break in time is missing."
            );
            showErrorToast("Error recording break out. Please try again.");
        }
    };



    return (
        <>
            {/* <Sideba1 /> */}
            <div className="masterc-container123">
                <div>
                    <div className="digital-clock-container">
                        <div className="flex23">
                            <div>
                                {loggedInEmployeeOne && (
                                    <p className="p_enteredid">
                                        {" "}
                                        LOGIN ID: {loggedInEmployeeOne.employeeid}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div>
                            <button onClick={handleStartDay}>Start Day</button>
                            <button onClick={handleEndDay}>End Day</button>
                            <button onClick={handleBreakIn}>Break In</button>
                            <button onClick={handleBreakOut}>Break Out</button>
                            {isWorkdayStarted &&
                                startTime && startTime.date instanceof Date && (
                                    <div>
                                        <p>Start Time: {startTime.time}</p>
                                        <p>Start Date: {startTime.date.toLocaleDateString()}</p>
                                    </div>
                                )}


                            {endTime && (
                                <div>
                                    <p>End Time: {endTime.time}</p>
                                    <p>End Date: {endTime.date.toLocaleDateString()}</p>
                                </div>
                            )}

                            {breakInTime && breakInTime.date && breakInTime.date instanceof Date && (
                                <div>
                                    <p>Break In Time: {breakInTime.time}</p>
                                    <p>Break In Date: {breakInTime.date.toLocaleDateString()}</p>
                                </div>
                            )}

                            {breakOutTime && breakOutTime.date && breakOutTime.date instanceof Date && (
                                <div>
                                    <p>Break Out Time: {breakOutTime.time}</p>
                                    <p>Break Out Date: {breakOutTime.date.toLocaleDateString()}</p>
                                </div>
                            )}

                            {totalWorkTime && (
                                <div>
                                    <p>Total Hours Worked: {formatMilliseconds(totalWorkTime)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
                <ToastContainer autoClose={3000} />{" "}
            </div>
        </>
    );
};

const formatMilliseconds = (milliseconds) => {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.round((milliseconds % (1000 * 60)) / 1000);
    return `${hours}:${minutes}:${seconds}`;
};

export default DigitalClock;