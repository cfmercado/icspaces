import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,Box, Grid,Stack,TextField,
    Button,
    Typography,
    Avatar,
    Select,FormControl,InputLabel,MenuItem
  } from "@mui/material";
  import { useState,useEffect } from "react";
  import { Users } from "./types";
  import { SelectChangeEvent } from "@mui/material/Select";
  import CloseIcon from '@mui/icons-material/Close';
  interface AccountDialogProps {
    open: boolean;
    onClose: () => void;
    user: Users | null;
  } 
  const userRole: Record<number, string> = { 
    0: 'Student',
    1: 'Faculty',
    2: 'Admin',
    3: 'Director',
  
    // add other status codes as needed
  };

  const AccountDialog: React.FC<AccountDialogProps> = ({
    open,
    onClose,
    user,
  }) => {
    // app.post('/get-student-details', getStudentDetails)
    // app.post('/get-faculty-details', getFacultyDetails)
    // app.post('/set-faculty-to-admin',setFacultyToAdmin)

    function FetchStudentDetails(email:string){
      useEffect(() => {
          fetch('https://api.icspaces.online/get-student-details', {
              method: 'POST', // or 'PUT'
              headers: {
              'Content-Type': 'application/json',
              },
              body: JSON.stringify({email}), // Uncomment this line if you need to send data in the request body
          })
          .then(response => response.json())
          .then(data => {
              setstudentNumber(data.student_number);
              setOrg(data.org);
              setCourse(data.course);
              setCollege(data.college);
              setDepartment(data.department);
              setuserMail(data.email);
          });
        }, []);
    };

    function FetchFacultyDetails(email:string){
      useEffect(() => {
        fetch('https://api.icspaces.online/get-faculty-details', {
            method: 'POST', // or 'PUT'
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({email}), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
            setCollege(data.college);
            setDepartment(data.department);
            setuserMail(data.email);
        });
      }, []);
  }

    function ConfirmEdit(usertype:string){

      if(itemsCount==='Student'){
        fetch('https://api.icspaces.online/update-student-details', {
          method: 'POST', // or 'PUT'
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            student_number:studentNumber,
            org:org,course:course,college:college,department:department,email:userMail
          }), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });
      }
      else if(usertype=='Student' && itemsCount=='Faculty'){//student to Faculty
        console.log('Student to Faculty');
        fetch('https://api.icspaces.online/change-user-type', {
          method: 'POST', // or 'PUT'
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            college:college,department:department,email:userMail
          }), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
      }
      else if(itemsCount=='Faculty' && usertype=='Faculty'){
        
        fetch('https://api.icspaces.online/update-faculty-details', {
          method: 'POST', // or 'PUT'
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            college:college,department:department,email:userMail
          }), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });
      }
      else if(itemsCount=='Admin' && usertype=='Faculty'){//Faculty to Admin
        console.log(userMail);
        fetch('https://api.icspaces.online/set-faculty-to-admin', {
          method: 'POST', // or 'PUT'
          headers: {
          'Content-Type': 'application/json',
          },
          body: JSON.stringify({userMail}), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
          console.log(data);
        });  
      }
   
    }

    function AsyncSetUserDetails(role:string,email:string){
      useEffect(() => {
        setItemsCount(role);
        setuserMail(email);
    }, []);
    };

    const handleItemsCountChange = (event: SelectChangeEvent<string>) => {
        setItemsCount(event.target.value as string);
      };
 
    const [itemsCount, setItemsCount] = useState('Faculty');
    const [userDetails,setUserDetails]=useState();
    const [college,setCollege]=useState('');
    const [department,setDepartment]=useState('');  
    const [studentNumber,setstudentNumber]=useState('');  
    const [course,setCourse]=useState('');  
    const [org,setOrg]=useState(''); 
    const [userMail,setuserMail]=useState('');
    const [student2Faculty,setstudent2Faculty]=useState(false);

    const handleUserMailChange = (event: { target: { value: string; }; }) => {
      setuserMail(event.target.value);
    };
    const handleCollegeChange = (event: { target: { value: string; }; }) => {
      setCollege(event.target.value);
    };
    const handleDepartmentChange = (event: { target: { value: string; }; }) => {
      setDepartment(event.target.value);
    };
    const handleStudentNumberChange = (event: { target: { value: string; }; }) => {
      setstudentNumber(event.target.value);
    };
    const handleOrgChange = (event: { target: { value: string; }; }) => {
      setOrg(event.target.value);
    };
    const handleCourseChange = (event: { target: { value: string; }; }) => {
      setCourse(event.target.value);
    };

    return (
      
      <Dialog open={open} onClose={onClose}>
    
        <DialogTitle>
          <Stack direction='row' justifyContent='space-between' >
            <Typography variant='h6'>Account Info</Typography>
            <Button sx={{justifyContent:'flex', borderRadius:'10px',backgroundColor:'#183048',
                    "&.MuiButton-root:hover": {
                      color: "#FFFFFF",
                      backgroundColor: "gray",
                    },
            }} onClick={onClose}>
            <Typography color='white' variant='subtitle2'>Exit</Typography>
              <CloseIcon sx={{color:'white'}}></CloseIcon>
             
            </Button>
          </Stack>
         
        </DialogTitle>
        <DialogContent>
          {user && (
            <>
            {AsyncSetUserDetails(userRole[user.usertype],user.email)}
            {user.usertype===0 && FetchStudentDetails(user.email)}
            {user.usertype===1 && FetchFacultyDetails(user.email)}

            <Grid container minWidth='35vh'>
                <Grid item>
                    <Stack direction='row' spacing={2} padding={1} sx={{ display: "flex", alignItems: "center", justifyContent:"space-evenly"}}>
                        <Avatar sx={{ width: 50, height: 50 }}>VH</Avatar>
                        <Typography variant='h6'>{user.fname},&nbsp;{user.lname}</Typography>
                    </Stack>
                </Grid>
            </Grid>
            <Stack spacing={2} mt={1}>
                <FormControl variant="outlined" size='small'>
                    <InputLabel id="items-count-label">Role</InputLabel>
                    <Select
                        labelId="items-count-label"
                        defaultValue={userRole[user.usertype]}                 
                        onChange={handleItemsCountChange}
                        label="Items Count"
                    >             
                        {user.usertype==0 && <MenuItem value={'Student'}>Student</MenuItem>}
                        {user.usertype<=1 && <MenuItem value={'Faculty'}>Faculty</MenuItem>}
                        {user.usertype>=1 && user.usertype!=3 && <MenuItem value={'Admin'}>Admin</MenuItem>} 
                        {user.usertype===3 && <MenuItem value={'Director'}>Director</MenuItem>}
                        
                    </Select>
                </FormControl>
                <Typography variant="body1">
                Email: &nbsp; {userMail}
                 </Typography>
                 {itemsCount==='Student' && 
                 <>
                  <TextField helperText='Student Number' value={studentNumber} onChange={handleStudentNumberChange}/>
                  <TextField helperText='Org' value={org} onChange={handleOrgChange}/>
                  <TextField helperText='Course' value={course} onChange={handleCourseChange}/>
                 </>
                 }
                

                  

                {itemsCount!=='Admin' &&  itemsCount!=='Director'&&
                <>
                  <FormControl variant="outlined" size='small' style={{maxWidth: 300}}>
                        <InputLabel id="items-count-college">College</InputLabel>
                        <Select
                            labelId="items-count-label"
                            value={college}
                            onChange={handleCollegeChange}
                            label="Items Count"
                        >             
                            <MenuItem value='College of Arts and Sciences'>College of Arts and Sciences</MenuItem>
                            <MenuItem value='College of Human Ecology'>College of Human Ecology</MenuItem>
                            <MenuItem value='College of Human Ecology'>College of Economics and Management</MenuItem>
                            <MenuItem value='College of Engineering'>College of Engineering</MenuItem>
                        </Select>
                  </FormControl>

                  <FormControl variant="outlined" size='small' style={{maxWidth: 300}}>
                      <InputLabel id="items-count-dep">Department</InputLabel>
                      <Select
                          labelId="items-count-label"
                          value={department}             
                          label="Items Count"
                          onChange={handleDepartmentChange}
                      >             
                          <MenuItem value={'Institute of Computer Science'}>Institute of Computer Science</MenuItem>
                          <MenuItem value={'Department of Human and Family Development Studies'}>Department of Human and Family Development Studies</MenuItem>
                      </Select>
                  </FormControl>     
                </>
                
                
                }


            </Stack>
            </>
          )
          
          }
          
        </DialogContent>
        <DialogActions>
        <Box display='flex' justifyContent='center'  width='100%' padding={1}>       {user&&<Button  onClick={ ()=> { ConfirmEdit(userRole[user.usertype]); onClose();} } sx={{borderRadius:'15px',backgroundColor:"#FFB532",}}  >
            Confirm Edit
          </Button>}</Box>
   
    
       
  
          
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AccountDialog;
  