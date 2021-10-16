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
	const ERROR_SAVE2  = "ERROR_SAVE2"
	const ERROR_DELETE = "ERROR_DELETE"

	const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  ); 
	
	function onSave(name, interviewer) {
		const interview = {
			student: name,
			interviewer
		};

		if (name && interviewer) {
			transition(SAVING);		
			props.handleInterview(props.id, interview, 'put')
			.then(res => {
				if (res.result) {
					transition(SHOW);
					return;
				}
				transition(ERROR_SAVE)
			});
			return;
		}
		transition(ERROR_SAVE2)
	}

	function onDelete() {
		transition(CONFIRM);
	}

	function onConfirm(id) {
		transition(DELETING, true);
		props.handleInterview(id, null, 'delete')
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
					onSave={(name, interviwer, action) => onSave(name,interviwer, action)}
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
				onSave={(name, interviwer, action) => onSave(name,interviwer, action)}
			/>
			)}
			{mode === ERROR_SAVE && (
			  <Error 
					message="Sorry! We were unable to save the changes"
					onClose={() => transition(back)} 
				/>
			)}
			{mode === ERROR_SAVE2 && (
			  <Error 
					message="Please check the student name and interviewer selected"
					onClose={() => transition(back)} 
				/>
			)}
			{mode === ERROR_DELETE && (
			  <Error 
					message="We were unable to delete the appointment"
					onClose={() => transition(back, true)} 
				/>
			)}
		</article>
	)
}

export default Appointment
