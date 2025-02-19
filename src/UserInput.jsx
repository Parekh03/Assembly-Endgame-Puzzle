export default function UserInput({correctGuessedLetters}) {
    
    const letterElements = correctGuessedLetters.map((char, index) => (
        <span key={index} className="dash">{char.toUpperCase()}</span>
    ));

    return (    
        <div id="user-input">
            {letterElements}
        </div>
    );
}
