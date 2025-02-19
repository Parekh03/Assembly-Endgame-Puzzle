export default function NewGame({
    currentWord,
    setCurrentWord,
    correctGuessedLetters,
    setCorrectGuessedLetters,
    wrongGuessedLetters,
    setWrongGuessedLetters,
    gameOver,
    setGameOver,
    chooseRandomWord,
    createCorrectGuessedLettersArray,
    setLostLanguages,
    setFarewellMessage
}) {
    function startNewGame() {
        const newWord = chooseRandomWord()
        setCurrentWord(newWord)
        setCorrectGuessedLetters(() => createCorrectGuessedLettersArray(newWord))
        setWrongGuessedLetters([])
        setGameOver(false)
        setLostLanguages([])
        setFarewellMessage("")
    }

    return (
        <button id="new-game-button" onClick={startNewGame}>New Game</button>
    )
}