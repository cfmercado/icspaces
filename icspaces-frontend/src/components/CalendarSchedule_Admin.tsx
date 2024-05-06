import React, { useState, useEffect } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { parseISO } from "date-fns";
import { format } from "date-fns";

interface Reservation {
  activity_name: string;
  start_datetime: string;
  end_datetime: string;
}

interface CalendarSchedule_AdminProps {
  reservations: Reservation[];
}

const CalendarSchedule_Admin: React.FC<CalendarSchedule_AdminProps> = ({
  reservations,
}) => {
  const localizer = momentLocalizer(moment);

  const events = reservations.map((reservation) => {
    const start = parseISO(reservation.start_datetime);
    const end = parseISO(reservation.end_datetime);

    return {
      title: reservation.activity_name,
      start: new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate(),
        start.getHours(),
        start.getMinutes()
      ),
      end: new Date(
        end.getFullYear(),
        end.getMonth(),
        end.getDate(),
        end.getHours(),
        end.getMinutes()
      ),
    };
  });

  console.log("events", events);

  return (
    <div style={{ height: "500px", fontFamily: "Inter" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500, margin: "50px" }}
        min={new Date(0, 0, 0, 7, 0)} // 7:00 AM
        max={new Date(0, 0, 0, 22, 0)} // 9:00 PM
      />
    </div>
  );
};

export default CalendarSchedule_Admin;
