import {Container} from "@mui/system";
import {Box, Typography} from "@mui/material";
import PdfDropBox from "@/components/input/PdfDropBox";

function UploadPDF({onFileUpload}) {
    const topMarginVH = 25; // Space below the margin where to start
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
                    }}>
                        <Typography variant="h2" gutterBottom>
                            Lavender
                        </Typography>
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

                    <PdfDropBox onFileUpload={(file) => onFileUpload(file)}/>
                </Container>
            </Box>

        </Container>
    );
}

export default UploadPDF;