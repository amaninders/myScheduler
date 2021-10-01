import React from 'react';
import classNames from 'classnames';
import "components/DayListItem.scss";

function DayListItem(props) {
	const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full"    : !props.spots
  });

	const formatSpots = (num) => {
		return `${num} ${( num === 1 ? 'spot' : 'spots')} remaining`
	}

	return (
		<li onClick={() => props.setDay(props.name)} className={dayClass}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{ formatSpots(props.spots ? props.spots : 'no') }</h3>
    </li>
	)
}

export default DayListItem;
