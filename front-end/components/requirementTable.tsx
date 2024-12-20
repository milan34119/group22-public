import { Box, Container, Stack, Typography } from "@mui/material"
import Grid from "@mui/material/Grid2"

const RequirementTable: React.FC = () => {
    return (
        <>
        <Container component="main" sx={{width:800}}>
        <Grid container spacing={1} sx={{p:3}}>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>role: Admin</Typography>
                </Stack>
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>username: casper123</Typography>
                </Stack>
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>password: password123</Typography>
                </Stack>
            
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>role: User</Typography>
                </Stack>
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>username: Milan</Typography>
                </Stack>
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>password: 1234567</Typography>
                </Stack>
            
            </Grid>
            <Grid size={4}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography>role: Guest</Typography>
                </Stack>
            </Grid>
            <Grid size={8}>
                <Stack direction={"row"} justifyContent={"center"}>
                    <Typography> USE THE CONTINUE AS GUEST BUTTON</Typography>
                </Stack>
            
            </Grid>
        </Grid>
        </Container>
        </>
    )}

export default RequirementTable