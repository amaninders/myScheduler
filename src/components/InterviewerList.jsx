import React from 'react'
import "./InterviewerList.scss"
import InterviewerListItem from './InterviewerListItem'

function InterviewerList(props) {
	const interviewersList = props.interviewers.map(interviewer => 
		<InterviewerListItem 
			key={ interviewer.id }
			id={ interviewer.id }
			name={ interviewer.name }
			avatar={ interviewer.avatar }
			setInterviewer={props.setInterviewer}
			selected={ interviewer.id === props.interviewer}
		/>
	)	

	return (
		<section className="interviewers">
		  <h4 className="interviewers__header text--light">Interviewer</h4>
		  <ul className="interviewers__list">{ interviewersList }</ul>
		</section>
	)
}

export default InterviewerList
