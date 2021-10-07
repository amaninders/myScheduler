const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

export default function useApplicationDate(params) {
	
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = day => {setState({...state, day})}

	useEffect(() => {		 		 
		const getDays = axios.get('http://localhost:8001/api/days');
		const getAppointments = axios.get('http://localhost:8001/api/appointments');
		const getInterviewers = axios.get('http://localhost:8001/api/interviewers');
		 
		axios.all([getDays, getAppointments, getInterviewers])
			.then(axios.spread((...responses) => {
		  	setState(prev => ({
					...prev, 
					days: responses[0].data,
					appointments: responses[1].data,
					interviewers: responses[2].data
				}))
			})).catch(err => console.log(err));			
	},[])

		// BOOK INTERVIEW
		async function bookInterview(id, interview) {

			// GET THE APPOINTMENT
			const appointment = {
				...state.appointments[id],
				interview: { ...interview }
			};
	
			// UPDATE THE APPOINTMENTS OBJECT WITH NEW APPOINTMENT
			const appointments = {
				...state.appointments,
				[id]: appointment
			};
			
			// MAKE REQUEST TO UPDATE THE APPOINTMENTS IN THE DB
			let result = axios.put(`http://localhost:8001/api/appointments/${id}`, {interview: interview})
				.then(() => {
					setState({ ...state,	appointments })
					return { result: 'success', err: null } 
				})
				.catch(err => {
					return { result: null, err: err }
				});
			return result;
		}
	
	
		// DELETE INTERVIEW
		async function deleteBooking(id, interview) {
			
			const appointment={
				...state.appointments[id],
				interview: interview
			}
	
			const appointments={
				...state.appointments,
				[id]: appointment
			}
	
			// MAKE REQUEST TO DELETE THE APPOINTMENT IN THE DB
			let result = axios.delete(`http://localhost:8001/api/appointments/${id}`)
				.then(() => {
					setState({ ...state,	appointments })
					return { result: 'success', err: null } 
				})
				.catch(err => {
					return { result: null, err: err }
				});
	
			return result;
		}

		return{
			state,
			setDay,
			bookInterview,
			deleteBooking
		}
}