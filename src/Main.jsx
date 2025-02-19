import React, { useState, useEffect } from "react";
import Result from "./Result.jsx";
import Languages from "./Languages.jsx";
import UserInput from "./UserInput.jsx";
import Keyboard from "./Keyboard.jsx";
import NewGame from "./NewGame.jsx";
import words from "./words.js";
import { languages } from "./languages.js";
import { getFarewellText } from "./utils.js"

export default function Main() {
    // Function to choose a random word
    function chooseRandomWord() {
        const index = Math.floor(Math.random() * words.length);
        const randomWord = words[index].toUpperCase();
        console.log(randomWord);
        return Array.from(randomWord);
    }

    // Function to initialize correct guessed letters array
    function createCorrectGuessedLettersArray(word) {
        return Array(word.length).fill('');
    }

    // State to keep track of word to be guessed
    const [currentWord, setCurrentWord] = useState(() => chooseRandomWord());

    // State to keep track of correct guessed letters
    const [correctGuessedLetters, setCorrectGuessedLetters] = useState(() =>
        createCorrectGuessedLettersArray(currentWord)
    );

    // State to keep track of wrong guesses
    const [wrongGuessedLetters, setWrongGuessedLetters] = useState([]);

    // state to keep track of lost languages
    const [lostLanguages, setLostLanguages] = React.useState([])

    // State to keep track if the game is over
    const [gameOver, setGameOver] = useState(false);

    // Effect to reset correct guessed letters when word changes
    useEffect(() => {
        setCorrectGuessedLetters(createCorrectGuessedLettersArray(currentWord));
    }, [currentWord]);

    // state to track the farewell message when a language is lost
    const [farewellMessage, setFarewellMessage] = useState("");

    // Effect to check if game is over
    useEffect(() => {
        if (wrongGuessedLetters.length >= 8 || !correctGuessedLetters.includes("")) {
            setGameOver(true);
        }
    }, [wrongGuessedLetters, correctGuessedLetters]);

    // update the lost languages array
    useEffect(() => {
        if (wrongGuessedLetters.length > 0) {
            setLostLanguages(()=>{
                let newArr = []
                newArr.push(languages[(wrongGuessedLetters.length)-1].name)
                return newArr
            });
        }
    }, [wrongGuessedLetters]);


    return (
        <>
            {/* Component to show the languages remaining */}
            <Languages
                wrongGuessedLetters={wrongGuessedLetters}
            />

            {/* Result component responsible for displaying the game status */}
            <Result
                wrongGuessedLetters={wrongGuessedLetters}
                correctGuessedLetters={correctGuessedLetters}
                gameOver={gameOver}
                setGameOver={setGameOver}
                currentWord={currentWord}
                lostLanguages={lostLanguages}
                setLostLanguages={setLostLanguages}
                getFarewellText={getFarewellText}
                farewellMessage={farewellMessage}
                setFarewellMessage={setFarewellMessage}
            />

            {/* Component to show the correct guessed letters */}
            <UserInput correctGuessedLetters={correctGuessedLetters} />

            {/* Component for keyboard */}
            <Keyboard
                correctGuessedLetters={correctGuessedLetters}
                setCorrectGuessedLetters={setCorrectGuessedLetters}
                wrongGuessedLetters={wrongGuessedLetters}
                setWrongGuessedLetters={setWrongGuessedLetters}
                currentWord={currentWord}
                gameOver={gameOver}
                setGameOver={setGameOver}
            />

            {/* Component for starting a new game */}
            <NewGame
                setCurrentWord={setCurrentWord}
                setCorrectGuessedLetters={setCorrectGuessedLetters}
                setWrongGuessedLetters={setWrongGuessedLetters}
                setGameOver={setGameOver}
                chooseRandomWord={chooseRandomWord}
                createCorrectGuessedLettersArray={createCorrectGuessedLettersArray}
                setLostLanguages={setLostLanguages}
                setFarewellMessage={setFarewellMessage}
            />

        </>
    );
}
