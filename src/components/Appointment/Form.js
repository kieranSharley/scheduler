import React, { useState } from 'react';
import Button from "../Button";
import InterviewerList from "../InterviewerList";

// Update the Form component to add the name and interviewer to state using setName and setInterviewer.
export default function Form(props) {
  const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [name, setName] = useState(props.name || "");

  const reset = function () {
    setName('');
    setInterviewer(null);
  };

  const cancel = function () {
    reset();
    props.onCancel();
  };
  const [error, setError] = useState("");

  const validate = function() {
    if (name === "" || interviewer === null) {
      setError("Student name and interviewer cannot be blank");
      return;
    }
    setError("");
    props.onSave(name, interviewer);
  }


  return (


    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}
>
          <input
            className="appointment__create-input text--semi-bold"
            name="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            type="text"
            placeholder="Enter Student Name"
            data-testid="student-name-input"

          />
          <section className="appointment__validation">{error}</section>

        </form>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={setInterviewer} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>

  );
}

