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
    await delay(5000); // todo: remove, only to simulate loading for now
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