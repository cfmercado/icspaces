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
    2: 'OIC',
    3: 'Director',
  
    // add other status codes as needed
  };

    



  const AccountDialog: React.FC<AccountDialogProps> = ({
    open,
    onClose,
    user,
  }) => {


    function FetchUserDetails(email:string){

      useEffect(() => {
        fetch('https://icspaces-backend.onrender.com/get-user-information', {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(email), // Uncomment this line if you need to send data in the request body
        })
        .then(response => response.json())
        .then(data => {
          console.log(data)
        });
      }, []);

    };

    function AsyncSetUserDetails(role:string){

      useEffect(() => {
        setItemsCount(role);
    }, []);
    };
    const handleItemsCountChange = (event: SelectChangeEvent<string>) => {
        setItemsCount(event.target.value as string);
      };
 
    const [itemsCount, setItemsCount] = useState('Faculty');
    const [userDetails,setUserDetails]=useState();
    const [college,setCollege]=useState();
    const [department,setDepartment]=useState();  
    const [studentNumber,setstudentNumber]=useState();  
    return (
      
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          <Stack direction='row' justifyContent='space-between' >
            <Typography variant='h6'>Account Info</Typography>
            <Button sx={{justifyContent:'flex'}}>
              <CloseIcon></CloseIcon>
            </Button>
          </Stack>
         
        </DialogTitle>
        <DialogContent>
          {user && (
            <>
            {AsyncSetUserDetails(userRole[user.usertype])}
            <Grid container>
                <Grid item>
                    <Stack direction='row' spacing={2} padding={1} sx={{ display: "flex", alignItems: "center", justifyContent:"space-evenly"}}>
                        <Avatar sx={{ width: 50, height: 50 }}>VH</Avatar>
                        <Typography variant='h6'>{user.lname},&nbsp;{user.fname}</Typography>
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
                        <MenuItem value={'Student'}>Student</MenuItem>
                        <MenuItem value={'Faculty'}>Faculty</MenuItem>
                        <MenuItem value={'OIC'}>OIC</MenuItem>
                        <MenuItem value={'Director'}>Director</MenuItem>
                        
                    </Select>
                </FormControl>
            
                <Typography variant="body1">
                Email: &nbsp;{user.email}
                 </Typography>
                 {itemsCount==='Student' && <TextField helperText='Student Number' value="2021-09338"/>}
                {(itemsCount==='Faculty') &&           
                  <FormControl variant="outlined" size='small' style={{maxWidth: 300}}>
                      <InputLabel id="items-count-dep">Department</InputLabel>
                      <Select
                          labelId="items-count-label"
                          defaultValue={user.department}                 
                  
                          label="Items Count"
                      >             
                          <MenuItem value={'ICS'}>Institute of Computer Science</MenuItem>
                          <MenuItem value={'DHFE'}>Department of Human and Family Development Studie</MenuItem>
                      </Select>
                  </FormControl>
                }
                {(itemsCount==='Faculty') &&  
                  <FormControl variant="outlined" size='small' style={{maxWidth: 300}}>
                        <InputLabel id="items-count-college">College</InputLabel>
                        <Select
                            labelId="items-count-label"
                            defaultValue={user.college}                 
                            label="Items Count"
                        >             
                            <MenuItem value={'ICS'}>College of Arts and Sciences</MenuItem>
                            <MenuItem value={'DHFE'}>College of Human Ecology</MenuItem>
                        </Select>
                  </FormControl>
                }
                <Typography variant="body1">
                    Date of Creation: &nbsp; January 6
                </Typography>
            </Stack>
            </>
          )
          
          }
          
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="warning">
            Confirm Edit
          </Button>
          <Button onClick={onClose} color="primary">
            Close
          </Button>
          
        </DialogActions>
      </Dialog>
    );
  };
  
  export default AccountDialog;
  