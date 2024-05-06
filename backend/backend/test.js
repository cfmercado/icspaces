let query = "/get-all-reservations-by-user"
let url = `http://localhost:https://icspaces-backend.onrender.com/${query}`

let options = {
    method: 'POST',
    headers: {
        "Content-Type": "application/json"
    },
    //enter fields here
    body: JSON.stringify({
        
        email: 'user@example.com',
        student_number: '202402120',
        org: 'COSS',
        course: 'BSCS',
        college: 'CHE',
        department: 'IHNF'
    })
}

fetch(url, options)
.then(response => response.json())
.then(data => {
    console.log(data); // Handle the response data
})
.catch(error => {
    console.error('Error:', error); // Handle errors
});