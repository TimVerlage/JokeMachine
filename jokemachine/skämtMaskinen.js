import readline from 'node:readline/promises'; // Importerar readline för användarinmatning
import { programmingJokes } from './Jokes.js'; // Importerar skämt från en separat fil

// Skapar ett interface för att läsa användarinmatning.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Slumpar ett index.
function getRandomIndex() {
    return Math.floor(Math.random() * programmingJokes.length);
}

// Hämtar ett slumpmässigt skämt från listan.
function getRandomJoke() {
    const randomIndex = getRandomIndex();
    return programmingJokes[randomIndex];
}

// Skriver ut välkomstmeddelandet.
function printWelcomeMessage() {
    console.log(`
############################
Welcome to the joke factory!
Let me tell you something about programming:
`);
}

// Hämtar och skriver ut ett visst antal skämt.
function printJokes(numJokes) {
    let jokes = [];
    
    for (let i = 0; i < numJokes; i++) {
        let joke;
        
        // Försöker hitta ett unikt skämt som inte redan finns i listan.
        do {
            joke = getRandomJoke();
        } while (jokes.some(j => j.id === joke.id));
        
        jokes.push(joke);
    }

    // Skriver ut skämten
    jokes.forEach((joke, index) => {
        const jokeID = joke.id + 1;
        const jokeQuestion = joke.question;
        const jokeAnswer = joke.answer;

        console.log(`
Joke #${jokeID} > ${jokeQuestion} ${jokeAnswer} `);
    });
}

// Hanterar huvudflödet av programmet
async function showJokes() {
    let showMore = true;
    
    while (showMore) {
        printWelcomeMessage(); // Skriver ut välkomstmeddelandet.
        
        // Frågar användaren hur många skämt de vill höra.
        let input = await rl.question('How many jokes do you want? '); 
        input = Number(input);
        //if not a number försök igen.
        if (isNaN(input) || input <= 0) {
            console.log('Please write a valid number, try again...');
            continue;
        }

        printJokes(input); // Skriver ut det antal skämt användaren har begärt.

        // Frågar användaren om de vill höra fler skämt.
        const answer = await rl.question('Do you want another joke? (Y/N) ');
        showMore = answer.toLowerCase() === 'y'; // ta emot små bokstäver.
    }
    
    rl.close(); // Stänger readline interface.
}

showJokes(); // Startar programmet

