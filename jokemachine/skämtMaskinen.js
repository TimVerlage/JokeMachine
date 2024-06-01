import readline from 'node:readline'; // Importerar readline för användarinmatning
import { programmingJokes } from './Jokes.js'; // Importerar skämt från en separat fil

// Skapar ett interface för att läsa användarinmatning från terminalen
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Slumpar ett index inom räckvidden av skämtlistan
function getRandomIndex() {
    return Math.floor(Math.random() * programmingJokes.length);
}

// Hämtar ett slumpmässigt skämt från listan
function getRandomJoke() {
    const randomIndex = getRandomIndex();
    return programmingJokes[randomIndex];
}

// Skriver ut välkomstmeddelandet
function printWelcomeMessage() {
    console.log(`
############################
Welcome to the joke factory!
Let me tell you something about programming:
`);
}

// Hämtar och skriver ut ett visst antal skämt
function printJokes(numJokes) {
    let jokes = [];
    
    for (let i = 0; i < numJokes; i++) {
        let joke;
        
        // Försöker hitta ett unikt skämt som inte redan finns i listan
        do {
            joke = getRandomJoke();
        } while (jokes.some(j => j.id === joke.id));
        
        jokes.push(joke);
    }

    // Skriver ut varje skämt
    jokes.forEach((joke, index) => {
        const jokeID = joke.id + 1;
        const jokeQuestion = joke.question;
        const jokeAnswer = joke.answer;

        console.log(`
Joke #${jokeID}
> ${jokeQuestion} ${jokeAnswer}
`);
    });
}

// Frågar användaren hur många skämt de vill höra
function askForNumberOfJokes() {
    rl.question('How many jokes do you want? ', (input) => {
        input = Number(input);
        
        if (isNaN(input) || input <= 0) {
            console.log('Please write a valid number, try again...');
            askForNumberOfJokes();
        } else {
            printJokes(input);
            askIfWantMoreJokes();
        }
    });
}

// Frågar användaren om de vill höra fler skämt
function askIfWantMoreJokes() {
    rl.question('Do you want another joke? (Y/N) ', (answer) => {
        if (answer.toLowerCase() === 'y') {
            printWelcomeMessage();
            askForNumberOfJokes();
        } else {
            rl.close();
        }
    });
}

// Startar programmet
printWelcomeMessage();
askForNumberOfJokes();

