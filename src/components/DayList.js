import React from "react";

import DayListItem from './DayListItem';
// The DayList component should receive the value represented by the state
// The DayList component should also receive the function that can update the state

export default function DayList(props) {


  return (
    <ul>
      {props.days.map((day) => {
        return (
          
          <DayListItem
            key={day.id}
            name={day.name}
            spots={day.spots}
            selected={day.name === props.day}
            setDay={props.setDay} />
           
        );
      })

      }

    </ul>
  );
}
