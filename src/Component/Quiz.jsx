import React, { useState } from 'react'
import { QuizData } from '../Data/QuizData'
import QuizResult from './QuizResult';
import {
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    FormLabel,
    Card,
    Button
} from "@mui/material";

function Quiz() {
    //Current Question Number
    const [currentQuestion, setCurrentQuestion] = useState(0);
    // Score Update 
    const [score, setScore] = useState(0);
    // Select Answer Option
    const [selectOption, setSelectOption] = useState(0);
    // Set Timeout Time
    const [timeoutToAnswer, setTimeoutToAnswer] = useState(3000);
    // Show Result
    const [showResult, setShowResult] = useState(false);
    //Timer
    const [timmer, setTimmer] = useState(null);
    const [showQuestions, setShowQuestion] = useState(false)


    // Hand question change
    const handleQuestionChange = () => {
        updateScore();
        if (currentQuestion < QuizData.length - 1) {
            setCurrentQuestion((prevState) => {
                return prevState + 1
            });
            setSelectOption(0);
            startAndRemoveTimmer()
        } else {
            setShowResult(true)
            if (timmer) clearInterval(timmer)
        }
    }

    function startAndRemoveTimmer() {
        if (timmer) clearInterval(timmer)
        else {
            const interval = setTimeout(handleQuestionChange, timeoutToAnswer);
            setTimmer(interval)
        }
    }

    //Start Button on click
    const handleStart = () => {
        startAndRemoveTimmer()
        setShowQuestion(true)
    }


    const updateScore = () => {
        if (selectOption === QuizData[currentQuestion].answer) {
            setScore(score + 1);
        }
    }
    const resetAll = () => {
        setShowResult(false);
        setCurrentQuestion(0);
        setSelectOption(0);
        setScore(0);
        setShowQuestion(false)
    }
    return (
        <div>
            <h1 className="heading-txt">Quiz APP</h1>
            <p>You have 30 seconds for a question after 30 seconds next question will be appear.</p>
            <div className='start'>
                <Button variant='contained' onClick={handleStart}>Start</Button>
            </div>
            <div>
                {showQuestions ? (
                    <Card>
                        <div className="container">
                            {showResult ? (
                                <QuizResult score={score} totalScore={QuizData.length} tryAgain={resetAll} />
                            ) : (
                                <>
                                    <div className="question">
                                        <h4 className="question-appear">Question {currentQuestion + 1} of {QuizData.length} </h4>
                                        <div>
                                            <span className="question-number">{currentQuestion + 1}. </span>
                                            <span className="question-txt">{QuizData[currentQuestion].question}</span>
                                        </div>
                                    </div>
                                    <div className="option-container">
                                        <FormControl>
                                            <FormLabel id="demo-radio-buttons-group-label">Answers</FormLabel>
                                            <RadioGroup
                                                aria-labelledby="demo-radio-buttons-group-label"
                                                name="radio-buttons-group"
                                            >

                                                {QuizData[currentQuestion].options.map((option, i) => {
                                                    return (
                                                        <FormControlLabel value={option} control={<Radio />} label={option} onClick={() => setSelectOption(i + 1)} key={i} />
                                                    )
                                                })}
                                            </RadioGroup>
                                        </FormControl>
                                    </div>
                                    <Button onClick={handleQuestionChange} variant="contained">Next</Button>
                                </>)}
                        </div>
                    </Card>
                    ) : showResult
                }
            </div>
        </div>
    )
}

export default Quiz