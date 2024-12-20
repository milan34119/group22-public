import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: 16,
                    right: 16,
                    backgroundColor: 'white',
                    borderRadius: 1,
                    boxShadow: 3,
                    padding: 1,
                }}
            >
                <Select value={locale} onChange={handleLanguageChange}>
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="nl">NL</MenuItem>
                </Select>
            </Box>
        </>
    );
};

export default Language;
