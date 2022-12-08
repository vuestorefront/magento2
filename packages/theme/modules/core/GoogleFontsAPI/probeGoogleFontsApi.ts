import axios from 'axios';

export const GOOGLE_FONT_API_URL = 'https://gwfh.mranftl.com/api/fonts';

/**
 * Check
 */
export const probeGoogleFontsApi = async () => {
  try {
    await axios.get(GOOGLE_FONT_API_URL);
    return true;
  } catch (err) {
    console.warn('GoogleFontsAPI is unavailable:', err);
  }

  return false;
};

export default probeGoogleFontsApi;
