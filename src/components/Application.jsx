import React from "react";
import DayList from './DayList.jsx'
import "components/Application.scss"
import Appointment from "./Appointment/index.jsx";
import useApplicationData from 'hooks/useApplicationData'
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors.js";

export default function Application(props) {
	
	const {
		state,
		setDay,
		handleInterview
	} = useApplicationData()

	const dailyAppointments = getAppointmentsForDay(state, state.day);
	const dailyInterviewers = getInterviewersForDay(state, state.day);
	const appointmentData = dailyAppointments.map(appointment => {

		const interview = getInterview(state, appointment.interview);
		return (
			<Appointment 
				{...appointment}
				key={appointment.id} 
				interview={interview}
				interviewers={dailyInterviewers}
				handleInterview={handleInterview}
		  />
		)
	})

	// ADDS CLOSING TO THE LIST OF APPOINTMENTS FOR A DAY
	appointmentData.push(<Appointment key="last" time="5pm" />) 

	// RENDER THE COMPONENT
  return (
    <main className="layout">
      <section className="sidebar">
				<img
				  className="sidebar--centered"
				  src="images/logo.png"
				  alt="Interview Scheduler"
				/>
				<hr className="sidebar__separator sidebar--centered" />
				<nav className="sidebar__menu">
					<DayList
					  day={state.day}
					  days={state.days}
					  setDay={setDay}
					/>
				</nav>
				
				<img
				  className="sidebar__lhl sidebar--centered"
				  src="images/lhl.png"
				  alt="Lighthouse Labs"
				/>
    </section>
      <section className="schedule">
        { appointmentData }
      </section>
    </main>
  );
}
