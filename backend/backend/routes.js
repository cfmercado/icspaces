import { generateURL, checkIfLoggedIn, setSession, getSession, callbackHandler, logout, setUserInfoFirstLogin } from "./auth-controller.js"

import { searchHandler, getAllRooms, getAllRoomsAndUtilities, insertRoom, setRoomClassSchedule, setEditedRoom, addUtility, deleteUtility, getRoomInfo, searchRoomById, getRoomName, processUtilities } from "./room-controller.js"
import { getAllStudents, getAllUsers, changeUserType, updateStudentDetails, updateFacultyDetails, getAllFaculty, getUserfromReservation, getUserInformation, getEmail } from "./user-controller.js"
import { getNewAccounts, getTotalRequest, getPendingRequest, getTotalAccounts, getPending, getPaid, getReservationByRoom, getAllReservationsByUser, getReservation, getReservationByName, getReservationByStatus, addReservation, setAsApproved, setAsCancelled,  setAsDisapproved, 
    setAsPaid, addComment, getAllReservations, getTotalRoomReservations, getReservationSortedOldest, getReservationSortedNewest, getAllReservationsbyRoom } from "./reservation-controller.js"



const setUpRoutes = (app) => {
    // app.<METHOD>("/<ROUTE>", <FUNCTION>)
    app.get('/', (req, res) => { res.send("API Home") });
    app.post('/auth/google', generateURL)
    app.get('/auth/google/callback', callbackHandler)
    app.post('/logout', logout)

    //users
    app.post('/get-all-users', getAllUsers)
    app.post('/get-all-students', getAllStudents)
    app.post('/get-all-faculty', getAllFaculty)
    app.post('/change-user-type', changeUserType)
    app.post('/update-student-details', updateStudentDetails)
    app.post('/update-faculty-details', updateFacultyDetails)
    app.post('/get-user-from-reservation', getUserfromReservation)
    app.post('/get-user-information', getUserInformation)
    app.post('/get-email-of-user', getEmail)

    //rooms
    app.post('/get-room-info', getRoomInfo)
    app.post('/search', searchHandler)
    app.post('/insert-room', insertRoom)
    app.post('/get-all-rooms',getAllRoomsAndUtilities)
    app.post('/set-class-schedule', setRoomClassSchedule)
    app.post('/edit-room-information', setEditedRoom) 
    app.post('/add-utility', addUtility)
    app.post('/delete-utility', deleteUtility)
    app.post('/get-room', searchRoomById)
    app.post('/get-room-name', getRoomName)
    app.post('/set-utilities', processUtilities)

    //reservations
    app.post('/get-all-reservations-by-user', getAllReservationsByUser)
    app.post('/get-reservation', getReservation)
    app.post('/get-reservation-by-name', getReservationByName)
    app.post('/get-reservation-by-status', getReservationByStatus)
    app.post('/add-reservation', addReservation)
    app.post('/get-reservation-by-room', getReservationByRoom)
    app.post('/set-as-approved', setAsApproved)
    app.post('/set-as-disapproved', setAsDisapproved)
    app.post('/set-as-cancelled', setAsCancelled)
    app.post('/set-as-paid', setAsPaid)
    app.post('/add-comment', addComment)
    app.post('/get-total-reservations', getTotalRoomReservations)
    app.post('/get-all-reservation', getAllReservations)
    app.post('/get-all-reservations-sort-oldest', getReservationSortedOldest)
    app.post('/get-all-reservations-sort-latest', getReservationSortedNewest)
    app.post('/get-all-reservations-by-room', getAllReservationsbyRoom)


    // getTotalRequest, getPendingRequest, getTotalAccounts, getPending, getPaid, getNewAccounts
    app.post('/get-total-request', getTotalRequest)
    app.post('/get-pending-request', getPendingRequest)
    app.post('/get-total-accounts', getTotalAccounts)
    app.post('/get-pending', getPending)
    app.post('/get-paid', getPaid)
    app.post('/get-new-accounts', getNewAccounts)

    
    //auth
    // checks if the user session is saved after authentication
    // checks if req.session.user exists
    app.get('/is-logged-in', checkIfLoggedIn);

    //test to check is session data is set and retrieved
    //route to set session data
    app.get('/set-session', setSession);

    //route to get session data
    app.get('/get-session', getSession);
    app.post('/set-uinfo-firstlogin', setUserInfoFirstLogin)
}

export default setUpRoutes;