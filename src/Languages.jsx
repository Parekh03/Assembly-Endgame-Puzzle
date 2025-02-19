import { languages } from "./languages.js"
export default function Languages({wrongGuessedLetters}) {
    const language = languages.map((ele, index) => {
        
        const isLanguageLost = index < wrongGuessedLetters.length
        const styles = {
            backgroundColor: ele.backgroundColor,
            color: ele.color
        }

        return (
            <span 
                style={styles} 
                key={ele.name} 
                className= {`language ${isLanguageLost ? "lost-language" : ""}`}
            
            >{ele.name}
            
            </span>
        )
    })
    return (
        <div id="languages-div">
            {language}
        </div>
    )
}