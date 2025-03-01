import {useState} from "react";
import UploadPDF from "@/components/landing/UploadPDF";
import {getFlashcards} from "@/services/getFlashCardsService";
import LoadingQuestions from "@/components/landing/LoadingQuestions";
import FailedLoading from "@/components/landing/FailedLoading";

function App() {

    // todo: add cute cat pics shuffling between while your flashcards are loading :3

    const [step, setStep] = useState(0); // 0 is home, 1-xyz is all the questions
    const [loading, setLoading] = useState(false); // is loading response from backend
    const [error, setError] = useState(null); // If you have an error :(
    const [flashcards, setFlashcards] = useState([]); // Empty array of objects


    async function onFileUpload(file) {
        setLoading(true);
        setError(null);
        setFlashcards([]);
        try {
            const data = await getFlashcards(file, 25);
            setFlashcards(data);
        } catch (error) {
            setFlashcards([]);
            setError(error?.message || "Unknown error occurred");
        }
        setStep(prev => prev + 1);
        setLoading(false);
    }

    async function goBackToHome() {
        setStep(0);
        setLoading(false);
        setError(false);
        setFlashcards([]);
    }

    // return cases!
    switch (step) {
        case 0:
            return (loading) ? <LoadingQuestions/> : <UploadPDF onFileUpload={onFileUpload}/>;
        default:
            return (loading) ?
                <LoadingQuestions/>
                :
                (flashcards === [] || error) ?
                    <FailedLoading retry={goBackToHome} error={error}/>
                    :
                    <>return the flashcards here based on which step we are at right now</>;
    }

}

export default App;
