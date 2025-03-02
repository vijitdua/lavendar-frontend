import {Container} from "@mui/system";
import {Box, Slider, Typography} from "@mui/material";
import PdfDropBox from "@/components/input/PdfDropBox";

function UploadPDF({onFileUpload, numQuestionsRequested, setNumQuestionsRequested}) {
    const topMarginVH = 20; // Space below the margin where to start
    return (
        <Container maxWidth="md">

            {/* Box that centers everything in the middle of the screen */}
            <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginTop: `${topMarginVH}vh`,
                height: `${100 - topMarginVH}vh`
            }}>
                <Container maxWidth="sm">

                    {/* Box containing title and logo (aligned left and right)*/}
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        mb: '3rem',
                    }}>
                        <Box>
                            <Typography variant="h2" gutterBottom>
                                Lavender
                            </Typography>
                            <Typography variant="h6" sx={{color: "gray"}}>
                                Turn your notes into quizzes and test your knowledge!
                            </Typography>
                        </Box>
                        <Box
                            component="img"
                            sx={{
                                height: 100,
                                width: 100,
                            }}
                            alt="Lavender logo"
                            src="/lavender.png"
                        />
                    </Box>

                    {/* Slider for selecting the number of questions */}
                    <Box sx={{width: "100%", marginBottom: 2}}>
                        <Typography gutterBottom>
                            Number of Questions: {numQuestionsRequested}
                        </Typography>
                        <Slider
                            value={numQuestionsRequested}
                            onChange={(event, newValue) => setNumQuestionsRequested(newValue)}
                            min={5}
                            max={30}
                            step={1}
                            marks
                            valueLabelDisplay="auto"
                            sx={{color: "primary.main"}}
                        />
                    </Box>

                    <PdfDropBox onFileUpload={(file) => onFileUpload(file)}/>
                </Container>
            </Box>

        </Container>
    );
}

export default UploadPDF;