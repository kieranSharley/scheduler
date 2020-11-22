import React, {useState} from 'react';
import Empty from './Empty.js';
import Header from './Header.js';
import Show from './Show.js';
import useVisualMode from '../../hooks/useVisualMode';
import Form from './Form.js';
import Status from 'components/Appointment/Status';
import Error from 'components/Appointment/Error';
import Confirm from 'components/Appointment/Confirm';
import './styles.scss';

const {state, setState} = useState

export default function Appointment(props) {

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";
const CREATE = "CREATE";
const EDIT = "EDIT";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";

const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

  const onAdd = () => transition(CREATE);
  const onBack = () => back(EMPTY);

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props
      .bookInterview(props.id, interview)
      .then(() => transition(SHOW),
      )
      .catch(error => transition(ERROR_SAVE, true));
  }

  function destroy(event) {
  
    transition(DELETING, true);
    
    props
      .cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(error => transition(ERROR_DELETE, true));
  }
  const onEdit = function (name, interviewer) {
    const interview = {
      student: name,
      interviewer: interviewer,
    };
    setState(state, interview);
    transition(EDIT);
  };

  const onDelete = function () {
    transition(CONFIRM);
  };
  return (
    <article
      className="appointment"
      data-testid="appointment"
    >
      <Header
        time={props.time}
      />
      {mode === CONFIRM && <Confirm
        message="Are you sure you would like to delete?"
        onCancel={back}
        onConfirm={destroy}
      />}
      {mode === ERROR_DELETE &&
      <Error message="Error Deleting" onClose={back}/>}
      {mode === ERROR_SAVE &&
      <Error message="Error Saving" onClose={back}/>}
      {mode === SAVING && <Status message="Saving"/>}
      {mode === DELETING && <Status message="Deleting"/>}
      {mode === EMPTY && <Empty onAdd={onAdd} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers}
        onCancel={onBack}
        onSave={save}
      />}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          name={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={onBack}
          onSave={save}
        />
      )}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
    </article>

    
  );
}