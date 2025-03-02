import {useEffect, useState} from "react";
import UploadPDF from "@/components/spa-flow/UploadPDF";
import {getFlashcards} from "@/services/getFlashCardsService";
import LoadingQuestions from "@/components/spa-flow/LoadingQuestions";
import FailedLoading from "@/components/spa-flow/FailedLoading";
import FlashcardsDisplay from "@/components/spa-flow/FlashcardsDisplay";
import FinishedSession from "@/components/spa-flow/FinishedSession";

function App() {

    const [step, setStep] = useState(0); // 0 is home, -1 is finished, 1-xyz is all the questions
    const [numQuestionsRequested, setNumQuestionsRequested] = useState(0);
    const [loading, setLoading] = useState(false); // is loading response from backend
    const [error, setError] = useState(null); // If you have an error :(
    const [flashcards, setFlashcards] = useState([]); // Empty array of objects

    // Go to finished stage if finished
    useEffect(() => {
        if (!loading && step >= flashcards.length && flashcards.length > 0) setStep(-1);
    }, [step])

    async function onFileUpload(file) {
        setLoading(true);
        setError(null);
        setFlashcards([]);
        try {
            const data = await getFlashcards(file, numQuestionsRequested);
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

    async function goToNextQuestion() {
        if (flashcards.length > step) setStep(prev => prev + 1);
        else setStep(-1);
    }

    // return cases!
    switch (step) {
        case -1:
            return <FinishedSession retry={goBackToHome}/>
        case 0:
            return (loading) ? <LoadingQuestions/> :
                <UploadPDF onFileUpload={onFileUpload} numQuestionsRequested={numQuestionsRequested}
                           setNumQuestionsRequested={setNumQuestionsRequested}/>;
        default:
            return (loading) ?
                <LoadingQuestions/>
                :
                (flashcards === [] || error) ?
                    <FailedLoading retry={goBackToHome} error={error}/>
                    :
                    <FlashcardsDisplay step={step} goToNextQuestion={goToNextQuestion} flashcards={flashcards}/>;
    }

}

export default App;
