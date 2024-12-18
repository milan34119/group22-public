import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'react-i18next';

const Language: React.FC = () => {
    const router = useRouter();
    const { locale, pathname, asPath, query } = router;

    const handleLanguageChange = (event: { target: { value: string } }) => {
        const newLocale = event.target.value;
        const { pathname, asPath, query } = router;
        router.push({ pathname, query }, asPath, { locale: newLocale });
    };
    return (
        <>
        <div className="ml-6">
            <label htmlFor="language" className="text-white">
                Language {" "}
            </label>

            <select
                id="language"
                className="ml-2 p-1"
                value={locale}
                onChange={handleLanguageChange}
            >
                <option value="en">Dutch</option>
                <option value="es">English</option>
            </select>
        </div>
        </>
    );
};

export default Language;
