import React from 'react';
import {
  Button
} from "@mui/material";

function QuizResult(props) {
  return (
    <>
    <div className='show-score'>
        Your Score:{props.score}<br/>
        Total Score:{props.totalScore}
    </div>
    <Button onClick={props.tryAgain} variant='contained'>Try Again</Button>
    </>
  )
}

export default QuizResult