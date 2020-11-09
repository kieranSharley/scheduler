import React, { useState, useEffect } from "react";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import "components/Application.scss";
import  useApplicationData  from 'hooks/useApplicationData';

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from 'helpers/selectors';



  export default function Application(props) {

    const {
      state,
      setDay,
      bookInterview,
      cancelInterview
    } = useApplicationData();
    const interviewers = getInterviewersForDay(state, state.day);
    
    const dailyAppointments = getAppointmentsForDay(state, state.day);
    const schedule = dailyAppointments.map((appointment) => {
      const interview = getInterview(state, appointment.interview);
      return (
        <Appointment
          id={appointment.id}
          time={appointment.time}
          key={appointment.id}
          interview={interview}
          interviewers={interviewers}
          bookInterview={bookInterview}
          cancelInterview={cancelInterview}
        />
      );
    });




  return (
    <main className="layout">

      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu"  >

          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
      </section>

      <section className="schedule">
        {schedule}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}

