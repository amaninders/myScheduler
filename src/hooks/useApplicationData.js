const { default: axios } = require("axios");
const { useState, useEffect } = require("react");

export default function useApplicationData(params) {
	
	const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {}
	});

	const setDay = day => {setState({...state, day})}

	useEffect(() => {		 		 
		const getDays 				= axios.get('http://localhost:8001/api/days');
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


	// INTERVIEW HANDLER
	async function handleInterview(id, interview, method) {
		

		// GET THE APPOINTMENT
		const appointment = {
			...state.appointments[id],
			interview: { ...interview || null }
		};

		// UPDATE THE APPOINTMENTS OBJECT WITH NEW APPOINTMENT
		const appointments = {
			...state.appointments,
			[id]: appointment
		};

		setState(prev => ({ ...prev,	appointments}))

		// MAKE REQUEST TO UPDATE THE APPOINTMENTS IN THE DB

		const URL     = `http://localhost:8001/api/appointments/${id}`
		const body    = {interview: interview}
		const action  = (method === 'put' ? axios.put(URL, body) : axios.delete(URL))
		const retrieve = axios.get('http://localhost:8001/api/days')
			
		let result = axios.all([action, retrieve])
			.then(axios.spread((...responses) => {					
						const days = (responses[1].data)
						console.log(days)
						setState(prev => ({ ...prev,	appointments, days }))
						return { result: 'success', err: null } 
				}))
				.catch(err => {
					return { result: null, err: err }
				})

		return result;
	}
	
	return{
			state,
			setDay,
			handleInterview
		}
}