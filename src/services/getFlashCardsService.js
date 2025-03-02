import axios from "axios";
import {env} from "@/configs/env";

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
export async function getFlashcards(file, number) {
    try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("questionCount", number);

        const response = await axios.post(`${env.backendUrl}/pdf`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        if (!response.data.success || response.data.error) {
            throw new Error(response.data.error || "Failed to fetch flashcards.");
        }

        return response.data.questions;

    } catch (error) {
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
