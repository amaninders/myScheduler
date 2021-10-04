import React from 'react'
import InterviewerList from 'components/InterviewerList'
import Button from 'components/Button'
import { useState } from 'react';

function Form(props) {

	const [student, setStudent] = useState(props.name || '');
	const [interviewer, setInterviewer] = useState(props.interviewer || null)

	console.log(student, interviewer)

	return (
		<main className="appointment__card appointment__card--create">
		  <section className="appointment__card-left">
		    <form autoComplete="off">
		      <input
		        className="appointment__create-input text--semi-bold"
		        name={props.name}
		        type="text"
		        placeholder="Enter Student Name"
		        value={student}
						onChange={(event) => setStudent(event.target.value)}
		      />
		    </form>
		    <InterviewerList interviewers={props.interviewers} interviewer={interviewer} setInterviewer={setInterviewer} />
		  </section>
		  <section className="appointment__card-right">
		    <section className="appointment__actions">
		      <Button danger onClick={() => props.onCancel()}>Cancel</Button>
		      <Button confirm onClick={() => props.onSave()}>Save</Button>
		    </section>
		  </section>
		</main>
	)
}

export default Form
