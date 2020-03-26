import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

import QuizForm from './QuizForm';
import LoadingSpinner from '../shared/LoadingSpinner';
import ModalDialog from '../modals/ModalDialog';
import { updateLocalStorage, result$ } from '../observable/store';

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: ${props => props.isLoading ? 'center': 'flex-start'};
  align-items: ${props => props.isLoading ? 'center': 'flex-start'};

  height: ${props => props.isLoading ? '100vh': '100%'};
  width: 100%;
`;

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    axios.get('https://opentdb.com/api.php?amount=10&category=15')
      .then(blob => blob.data.results)
      .then(questions => setQuestions(questions))
      .catch(error => console.log(error));
  }, [])

  function handleSubmit(res) {
    let newResult = {...result$.value};
    newResult.gamesPlayed++;
    newResult.correctAnswers += res.length;
    newResult.incorrectAnswers += 10 - res.length;

    updateLocalStorage(newResult);
    handleModal(true);
  }
  
  function handleModal(boolean) {
    setOpenModal(boolean);
  }

  let isLoading = true;
  if (questions.length >= 1) {
    isLoading = false;
  }

  return (
    <Container isLoading={isLoading}>
      {isLoading ? <LoadingSpinner scale={1} /> : <QuizForm questions={questions} handleSubmit={handleSubmit}/>}
      {openModal ? <ModalDialog handleModal={handleModal}/> : null}
    </Container>
  )
}