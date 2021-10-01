import React from 'react'
import DayListItem from './DayListItem';

const DayList = (props) => {

	const parsedDays = props.days.map(day => 
		<DayListItem 
			key={day.name} 
			name={day.name} 
			spots={day.spots} 
			selected={day.name === props.day}
			setDay={props.setDay}  
		/>);

	return (
		<ul>
			{parsedDays}
		</ul>
	)
}

export default DayList
