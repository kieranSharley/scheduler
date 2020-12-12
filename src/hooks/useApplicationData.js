import { useState, useEffect } from "react";
import axios from "axios";

const useApplicationData = function () {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [
      {
        id: 1,
        time: "12pm",
      },
      {
        id: 2,
        time: "1pm",
        interview: {
          student: "Lydia Miller-Jones",
          interviewer: {
            id: 1,
            name: "Sylvia Palmer",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
      {
        id: 3,
        time: "2pm",
        interview: {
          student: "Paul Chen",
          interviewer: {
            id: 2,
            name: "Tori Malcolm",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
      {
        id: 4,
        time: "3pm",
        interview: {
          student: "Scott Morton",
          interviewer: {
            id: 3,
            name: "Mildred Nazir",
            avatar: "https://i.imgur.com/LpaY82x.png",
          },
        },
      },
    ],
    interviewers: [
      {
        id: 1,
        name: "Sylvia Palmer",
        avatar: "https://i.imgur.com/LpaY82x.png",
      },
      {
        id: 2,
        name: "Tori Malcolm",
        avatar: "https://i.imgur.com/Nmx0Qxo.png",
      },
      {
        id: 3,
        name: "Mildred Nazir",
        avatar: "https://i.imgur.com/T2WwVfS.png",
      },
      { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
      { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
    ],
  });

  const setDay = (day) => setState({ ...state, day });

  const bookInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayID = getDay(state.day);

    const day = {
      ...state.days[dayID],
      spots: state.days[dayID].spots,
    };
    if (state.appointments[id].interview === null) {
      day.spots = day.spots - 1;
    }

    const days = [...state.days];
    days[dayID] = day;

    return axios.put(`/api/appointments/${id}`, appointment).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const cancelInterview = function (id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };

    const dayID = getDay(state.day);

    const day = {
      ...state.days[dayID],
      spots: state.days[dayID].spots,
    };
    day.spots = day.spots + 1;
    let days = [...state.days];
    days[dayID] = day;

    return axios.delete(`/api/appointments/${id}`).then((res) => {
      setState({
        ...state,
        appointments,
        days,
      });
    });
  };

  const getDay = function (name) {
    const match = (element) => element.name === name;
    return state.days.findIndex(match);
  };

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`),
    ]).then((all) => {
      console.log(all[0]); // first
      console.log(all[1]); // second
      console.log(all[2]);
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  return { state, setDay, bookInterview, cancelInterview };
};
export default useApplicationData;