import { clsx } from "clsx";

export default function Keyboard({ correctGuessedLetters, setCorrectGuessedLetters, wrongGuessedLetters, setWrongGuessedLetters, currentWord, gameOver }) {
    const rows = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

    const handleKeyPress = (key) => {
        // Ignore if the key is already pressed or the game is over
        if (gameOver || correctGuessedLetters.includes(key) || wrongGuessedLetters.includes(key)) return;

        if (currentWord.includes(key)) {
            // Update correct guessed letters at the correct index
            setCorrectGuessedLetters((prevCorrectGuessedLetters) => {
                const updatedGuessedWord = [...prevCorrectGuessedLetters];

                currentWord.forEach((letter, index) => {
                    if (letter === key) {
                        updatedGuessedWord[index] = key;
                    }
                });

                return updatedGuessedWord;
            });
        } else {
            // Update wrong guessed letters
            setWrongGuessedLetters((prevWrong) => [...prevWrong, key]);
        }
    };

    const keyboardElements = rows.map((row, rowIndex) => (
        <div key={rowIndex} className="keyboard-row">
            {row.split("").map((key) => {
                const isGuessed = correctGuessedLetters.includes(key) || wrongGuessedLetters.includes(key);
                const isCorrect = currentWord.includes(key) && correctGuessedLetters.includes(key);
                const isWrong = !currentWord.includes(key) && wrongGuessedLetters.includes(key);

                return (
                    <button
                        id={`key-${key}`} // Unique ID for each button
                        key={key}
                        type="button"
                        className={clsx("key-button", {
                            correctButton: isCorrect, // Dynamically applies correct class
                            wrongButton: isWrong, // Dynamically applies wrong class
                        })}
                        onClick={() => handleKeyPress(key)}
                        disabled={isGuessed} // Disable already guessed keys
                    >
                        {key}
                    </button>
                );
            })}
        </div>
    ));

    return <div className="keyboard-container">{keyboardElements}</div>;
}
