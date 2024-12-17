import { Stack, Box, Typography, Paper, Container, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { User } from "@types";
import { Dispatch, SetStateAction, useState } from "react";

type Props = {
    user: User
    setDisplayWhat: Dispatch<SetStateAction<string>>
};
const ProfileInfoBox: React.FC<Props> = ({ user, setDisplayWhat }: Props) => {
    return (
        <>
        <Container sx={{p:3}}>
        <Paper elevation={3} sx={{ width: '100%', p: 3 }}>
            <Stack spacing={2}>
                <Box>
                    <Typography variant="h6">Username</Typography>
                    <Typography>{user.username}</Typography>
                </Box>
                <Box>
                    <Typography variant="h6">Email</Typography>
                    <Typography>{user.email}</Typography>
                </Box>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Show</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="show"
                        onChange={(e) => {
                            setDisplayWhat(e.target.value as string);}}
                    >
                        <MenuItem value={""}>None</MenuItem>
                        <MenuItem value={"posts"}>Posts</MenuItem>
                        <MenuItem value={"planners"}>Planners</MenuItem>
                    </Select>
                </FormControl>
            </Stack>
        </Paper>
        </Container>
        </>
    )
};

export default ProfileInfoBox;