import React, { useEffect, useState } from 'react';
import he from 'he';

import { shuffle } from '../utilities';

export default function QuizFormAnswers({ value, question, currentQuestion, onChange }) {
  const [answers, setAnswers] = useState([]);
  
  useEffect(() => {
    const { incorrect_answers, correct_answer } = question;
    
    setAnswers(shuffle([correct_answer, ...incorrect_answers]));
  }, [question])
  
  return (
    <>
      {answers.map((answer, index) => {
        return (
          <div key={index}>
            <input 
              type="radio" 
              onChange={onChange}
              checked={value['Q' + currentQuestion] === he.decode(answer)}
              value={he.decode(answer)}
              id={he.decode(answer)} 
              name={`Q${currentQuestion}`}
            />
            <label htmlFor={he.decode(answer)}>
              {he.decode(answer)}
            </label>
          </div>
        )
      })}
    </>
  )
} 