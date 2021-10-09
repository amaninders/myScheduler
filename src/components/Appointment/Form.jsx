import React from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import { useState } from 'react';

function Form(props) {

	const [student, setStudent] = useState(props.student || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null)

	const reset = () => {
		setStudent('');
		setInterviewer(null);
	}
	
	const cancel = () => {
		reset();
		props.onCancel();
		return;
	}

	const onFormSubmit = (event) => {
		event.preventDefault();
	}

	return (
		<main className="appointment__card appointment__card--create">
		  <section className="appointment__card-left">
		    <form autoComplete="off" onSubmit={(event) => onFormSubmit(event)} >
		      <input
		        className="appointment__create-input text--semi-bold"
		        name={props.name}
		        type="text"
		        placeholder="Enter Student Name"
		        value={student}
						onChange={(event) => setStudent(event.target.value)}
						data-testid="student-name-input"
		      />
		    </form>
		    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
		  </section>
		  <section className="appointment__card-right">
		    <section className="appointment__actions">
		      <Button danger onClick={() => cancel()}>Cancel</Button>
		      <Button confirm onClick={() => props.onSave(student, interviewer)}>Save</Button>
		    </section>
		  </section>
		</main>
	)
}

export default Form

// props.onSave(student, interviewer)