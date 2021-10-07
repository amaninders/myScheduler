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