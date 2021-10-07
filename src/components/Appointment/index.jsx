import React from 'react'
import "./styles.scss"
import Header from './Header'
import Empty from './Empty'
import Show from './Show'
import useVisualMode from 'hooks/useVisualMode'
import Form from './Form'
import Status from './Status'
import Confirm from './Confirm'
import Error from './Error'


function Appointment(props) {

	const CREATE  		 = "CREATE";
	const CONFIRM			 = "CONFIRM"
	const EDIT				 = "EDIT"
	const EMPTY				 = "EMPTY";
	const SHOW				 = "SHOW";
	const SAVING			 = "SAVING"
	const DELETING		 = "DELETING"
	const ERROR_SAVE	 = "ERROR_SAVE"
	const ERROR_DELETE = "ERROR_DELETE"



	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 
	
	function onSave(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};
		transition(SAVING);		
		props.bookInterview(props.id, interview)
			.then(res => {
				if (res.result) {
					transition(SHOW);
					return;
				}
				transition(ERROR_SAVE, true)
			});
	}

	function onDelete() {
		transition(CONFIRM);
	}

	function onConfirm(id) {
		transition(DELETING, true);
		props.deleteBooking(id)
			.then((res) => {
				if (res.err) {
					transition(ERROR_DELETE, true)
					return;
				}
				transition(EMPTY)
			})
	}

	function onEdit(id) {
		transition(EDIT)
	}
	
	return (
		<article className="appointment">
			<Header time={props.time}/>
			{mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
			{mode === SHOW && (
			  <Show
					id={props.id}
			    student={props.interview.student}
			    interviewer={props.interview.interviewer}
					onDelete={() => onDelete()}
					onEdit={(id)=> onEdit(id)}
			  />
			)}
			{mode === CREATE && (
			  <Form
					interviewers={props.interviewers}
					onCancel={() => transition(EMPTY)}
					onSave={(name, interviwer) => onSave(name,interviwer)}
			  />
			)}
			{mode === SAVING && (
			  <Status message="Saving" />
			)}
			{mode === DELETING && (
			  <Status message="DELETING" />
			)}
			{mode === CONFIRM && (
			  <Confirm 
					id={props.id}
					message="Do you really want to delete this appointment?"
					onCancel={() => transition(back)}
					onConfirm={(id) => onConfirm(id)} 
				/>
			)}
			{mode === EDIT && (
			  <Form
				student={props.interview.student}
				interviewer={props.interview.interviewer.id}
				interviewers={props.interviewers}
				onCancel={() => transition(SHOW)}
				onSave={(name, interviwer) => onSave(name,interviwer)}
			/>
			)}
			{mode === ERROR_SAVE && (
			  <Error 
					message="Sorry! We were unable to save the changes"
					onClose={() => transition(back)} 
				/>
			)}
			{mode === ERROR_DELETE && (
			  <Error 
					message="We were unable to delete the appointment"
					onClose={() => transition(back)} 
				/>
			)}
		</article>
	)
}

export default Appointment