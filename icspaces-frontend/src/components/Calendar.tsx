import * as React from 'react';
import dayjs from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Grid from '@mui/material/Grid';

const styles = {
  container: {
    paddingTop: '5px', // Adjust spacing as needed
  },
};

export default function DateCalendarValue() {
  const [value, setValue] = React.useState(dayjs('2022-04-17'));

  return (
    <Grid container direction="column" alignItems="center" spacing={1} style={styles.container}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item>
          <DatePicker
            label="Enter the Date"
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY',
              },
            }}
          />
        </Grid>
        <Grid item>
          <DemoContainer components={['DateCalendar', 'DateCalendar']}>
            <DemoItem>
              <DateCalendar value={value} onChange={(newValue) => setValue(newValue)} />
            </DemoItem>
          </DemoContainer>
        </Grid>
      </LocalizationProvider>
    </Grid>
  );
}