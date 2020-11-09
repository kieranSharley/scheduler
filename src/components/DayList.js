import React from "react";

import DayListItem from './DayListItem';
// The DayList component should receive the value represented by the state
// The DayList component should also receive the function that can update the state

export default function DayList({days, day, setDay}) {


  return (
    <ul>
      {days.map((elem) => {
        return (
          
          <DayListItem
            key={elem.id}
            name={elem.name}
            spots={elem.spots}
            selected={elem.name === day} //day is setDay.day i think
            setDay={setDay} />
           
        );
      })

      }

    </ul>
  );
}
// key={day.id}
//     name={day.name}
//     spots={day.spots}
//     selected={day.name === props.day}
//     setDay={props.setDay}











/**  let data = [ <DayListItem
    key={day.id}
    name={day.name}
    spots={day.spots}
    selected={day.name === props.day}
    setDay={props.setDay} />
 ]
  const List = data.map((days) => {

  }); */
//~~~~~~~~~~~~~

// const items = data.map(item =>
//   <li>{days}</li>
// );

// return (
//   <div className="App">
//     <h4>My Bad Search Page</h4>
//     <Input label='Hello' onSave={show} text="" />
//     <h4>{message}</h4>

//     <ul>
//       {newItems}
//     </ul>

//   </div>;