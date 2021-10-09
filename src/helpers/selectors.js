// get appointments for a given day from data

export const getAppointmentsForDay = (state, day) => {

	const output = state.days.filter(item => item.name === day).map(item => item.appointments);

	return output.length ? output.flat().map(item => state.appointments[item]) : [];

}


export const getInterview = (state, interview) => {

	const interviewer =  interview ? {...interview, interviewer: state.interviewers[interview.interviewer]} : null
	
	return interviewer

}


export const getInterviewersForDay = (state, day) => {

	const output = state.days.filter(item => item.name === day).map(item => item.interviewers);

	return output.length ? output.flat().map(item => state.interviewers[item]) : [];

}

export const getStateWithUpdatedData = (prevState, appointments) => {

	// add new appointments to previous state
  const output = {
    ...prevState,
		appointments
  }

	// hashmap used to set the day index
	// this is used to assign spots for the day
	const hashmap = {
    Monday: 0,
    Tuesday: 1,
    Wednesday: 2,
    Thursday: 3,
    Friday: 4,
  }

	// default value for number of interviews
	let spots = 5;

	// reusing getAppointmentsForDay to calculate spots
	getAppointmentsForDay(output, output.day).forEach(el => {
		if (el.interview) {
			spots--
		}
	});

	output.days[hashmap[output.day]].spots = spots;

  return output
}