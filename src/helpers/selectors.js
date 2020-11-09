import React, { useState, useEffect, state } from 'react';

export function getAppointmentsForDay(state, day) {

  let result = [];
  let dailyAppointments = null;
  if (state.days.length === 0) {
    return [];
  }
 


  for (const theDay of state.days) {
    if (theDay.name === day) {
      dailyAppointments = theDay.appointments;
    }
  }

  if (!dailyAppointments) {
    return []; }

  for (const appID of dailyAppointments) {
    for (const key in state.appointments) {
      if (parseInt(key) === appID) {
        result.push(state.appointments[key])
        break;
      }
    }
  }
  return result;
}


export function  getInterview(state, interview) {
  const result = {};
  if (!interview) {
    return null;
  }

  const interviewer = state.interviewers[interview.interviewer];

  result["student"] = interview.student;
  result["interviewer"] = interviewer;
  return result;
}

export function getInterviewersForDay(state, day) {

  let result = [];
  let interviewersArr = null;
  if (state.days.length === 0) {
    return [];
  }
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      interviewersArr = dayObj.interviewers;
    }
  }

  if (!interviewersArr) {
    return [];
  }

  console.log(interviewersArr);

  for (const intID of interviewersArr) {
    for (const key in state.interviewers) {
      if (parseInt(key) === intID) {
        result.push(state.interviewers[key])
        break;
      }
    }
  }

  return result;
}
