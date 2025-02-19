import { useState, useEffect } from "react";

export default function Result({
    wrongGuessedLetters,
    correctGuessedLetters,
    gameOver,
    setGameOver,
    currentWord,
    lostLanguages,
    setLostLanguages,
    getFarewellText,
    farewellMessage,
    setFarewellMessage
}) {
    useEffect(() => {
        if (!gameOver && lostLanguages.length > 0) {
            // Get the last lost language
            const lastLostLanguage = lostLanguages[lostLanguages.length - 1];

            // Generate farewell message
            setFarewellMessage(getFarewellText(lastLostLanguage));

            // Remove the last lost language from state
            setLostLanguages((prev) => prev.slice(0, -1));
        }
    }, [lostLanguages, gameOver, getFarewellText]);

    if (!gameOver && farewellMessage) {
        return (
            <div id="result-div">
                <p>{farewellMessage}</p>
            </div>
        );
    }

    const hasLost = wrongGuessedLetters.length === 8;
    const hasWon = !correctGuessedLetters.includes("");

    if (hasLost || hasWon) {
        setGameOver(true);
    }

    return (
        <div id="result-div">
            {gameOver ? (
                hasWon ? (
                    <>
                        <h2>You Win!</h2>
                        <p>Well done!</p>
                    </>
                ) : (
                    <>
                        <h2>You lose!</h2>
                        <p>The word was {currentWord}</p>
                    </>
                )
            ) : null}
        </div>
    );
}
