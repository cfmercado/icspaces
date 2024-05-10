import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import Grid from '@mui/material/Grid';
import { Typography} from "@mui/material";

const styles = {
  container: {
    paddingTop: '5px', // Adjust spacing as needed
  },
};

export default function DateCalendarValue() {
  const today = dayjs();
  const [value, setValue] = React.useState(today); // Set initial value to today

  return (
    <Grid container direction="column" alignItems="center" spacing={1} style={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item>
          {/* <DatePicker
            label="Enter the Date"
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
          /> */}
          <Typography
            variant="h4"
            component="div"
            sx={{
              fontWeight: "bold",
              color: "#FFC000",
              textShadow: "2px 2px 4px rgba(0, 0, 0, 0.8)",
            }}
          >
            BOOK NOW !!
          </Typography>
        </Grid>
        <Grid item>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DemoItem>
              <DateCalendar 
                value={value} 
                onChange={(newValue) => setValue(newValue)} 
                minDate={today} // Set minDate to disable past dates
              />
            </DemoItem>
          </DemoContainer>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}
