import axios from "axios";

// todo: remove, only to simulate loading for now
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));


/**
 * Fetches a specified number of flashcards from the backend.
 *
 * @param {string} file - The endpoint or file path to retrieve the flashcards from.
 * @param {number} number - The number of flashcards to fetch.
 * @returns {Promise<Array<{
 *   question: string,
 *   optionA: string,
 *   optionB: string,
 *   optionC: string,
 *   optionD: string,
 *   correctAnswer: "A" | "B" | "C" | "D",
 *   hintOne: string,
 *   hintTwo: string
 * }>>} - A promise resolving to an array of flashcard objects.
 * @throws {Error} - Throws an error if fetching fails.
 */
export async function getFlashcards(file, number){
    await delay(10000); // todo: remove, only to simulate loading for now

    return fakeData; // todo: remove, only use it for now for testing

    try{
        const response = await axios.get(`https://temporary-server-holding-string`, {
                file,
                number
            }
        );
        return response.data;
    }catch(error){
        console.log(`Error occurred getting flashcards`);
        console.log(error);
        if (error.response) {
            const status = error.response.status;
            if (status === 400) throw new Error('Invalid input. Ensure you uploaded a file');
            else if (status === 500) throw new Error('An internal server error occurred.');
            else throw new Error('An unknown error occurred.');
        } else if (error.request) {
            throw new Error('No response from the server. Please check your network connection.');
        } else {
            throw new Error(`Task failed due to unknown reason: ${error.message}`);
        }
    }
}

const fakeData = [
    {
        "question": "What is the capital of France?",
        "optionA": "Paris",
        "optionB": "London",
        "optionC": "Berlin",
        "optionD": "Madrid",
        "correctAnswer": "A",
        "hintOne": "It's known as the City of Light.",
        "hintTwo": "The Eiffel Tower is located here."
    },
    {
        "question": "Which planet is known as the Red Planet?",
        "optionA": "Earth",
        "optionB": "Mars",
        "optionC": "Jupiter",
        "optionD": "Venus",
        "correctAnswer": "B",
        "hintOne": "It's the fourth planet from the Sun.",
        "hintTwo": "It has the largest volcano in the Solar System, Olympus Mons."
    },
    {
        "question": "Who wrote 'To Kill a Mockingbird'?",
        "optionA": "Harper Lee",
        "optionB": "Mark Twain",
        "optionC": "Jane Austen",
        "optionD": "J.K. Rowling",
        "correctAnswer": "A",
        "hintOne": "The author was from Alabama.",
        "hintTwo": "The book explores racial injustice in the American South."
    },
    {
        "question": "Which element has the chemical symbol 'O'?",
        "optionA": "Gold",
        "optionB": "Oxygen",
        "optionC": "Osmium",
        "optionD": "Opal",
        "correctAnswer": "B",
        "hintOne": "It is essential for human respiration.",
        "hintTwo": "It makes up about 21% of Earth's atmosphere."
    },
    {
        "question": "What is the largest ocean on Earth?",
        "optionA": "Atlantic Ocean",
        "optionB": "Indian Ocean",
        "optionC": "Arctic Ocean",
        "optionD": "Pacific Ocean",
        "correctAnswer": "D",
        "hintOne": "It covers more than 30% of the Earth's surface.",
        "hintTwo": "It is home to the Mariana Trench."
    },
    {
        "question": "Who developed the theory of relativity?",
        "optionA": "Isaac Newton",
        "optionB": "Albert Einstein",
        "optionC": "Galileo Galilei",
        "optionD": "Nikola Tesla",
        "correctAnswer": "B",
        "hintOne": "The famous equation E=mc² comes from this theory.",
        "hintTwo": "The scientist was born in Germany."
    },
    {
        "question": "Which country is famous for inventing sushi?",
        "optionA": "China",
        "optionB": "Korea",
        "optionC": "Japan",
        "optionD": "Thailand",
        "correctAnswer": "C",
        "hintOne": "It is an island nation in East Asia.",
        "hintTwo": "Its capital is Tokyo."
    },
    {
        "question": "What is the powerhouse of the cell?",
        "optionA": "Nucleus",
        "optionB": "Mitochondria",
        "optionC": "Ribosome",
        "optionD": "Golgi apparatus",
        "correctAnswer": "B",
        "hintOne": "It produces ATP.",
        "hintTwo": "It has its own DNA separate from the nucleus."
    },
    {
        "question": "How many continents are there on Earth?",
        "optionA": "Five",
        "optionB": "Six",
        "optionC": "Seven",
        "optionD": "Eight",
        "correctAnswer": "C",
        "hintOne": "The largest one is Asia.",
        "hintTwo": "Antarctica is one of them."
    },
    {
        "question": "What is the freezing point of water in Celsius?",
        "optionA": "0°C",
        "optionB": "32°C",
        "optionC": "100°C",
        "optionD": "-10°C",
        "correctAnswer": "A",
        "hintOne": "It is the same as 273.15K.",
        "hintTwo": "Ice forms at this temperature."
    }
];