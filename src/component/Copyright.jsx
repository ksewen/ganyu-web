'use client';
import { useLocalStorage } from '@/hook/useLocalStorage';
import {
  Box,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

const languages = [
  {
    code: 'en-US',
    name: 'English',
  },
  // {
  //   code: 'de',
  //   name: 'Detusch',
  // },
  // {
  //   code: 'zh-cn',
  //   name: '简体中文',
  // },
];

const copyrightText =
  '©' + new Date().getFullYear() + ' ' + 'Ganyu' + '. All rights reserved.';

const Copyright = () => {
  const [language, setLanguage] = useLocalStorage(
    process.env.DEFAULT_LANGUAGE_KEY,
    'en-US'
  );
  const handleChange = (event) => {
    setLanguage(event.target.value);
  };

  return (
    <Box component="footer">
      <Grid container spacing={2}>
        <Grid item xs={10}>
          <Box sx={{ mt: 3 }}>{copyrightText}</Box>
        </Grid>
        <Grid item xs={2}>
          <FormControl sx={{ minWidth: 120 }} size="small">
            <InputLabel id="footer-select-label">Language</InputLabel>
            {language && (
              <Select
                id="footer-select"
                value={language}
                label="language"
                onChange={handleChange}
              >
                {languages.map((language) => (
                  <MenuItem key={language.name} value={language.code}>
                    {language.name}
                  </MenuItem>
                ))}
              </Select>
            )}
          </FormControl>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Copyright;
