import axios from 'axios';
import probeGoogleFontsApi from '~/modules/core/GoogleFontsAPI/probeGoogleFontsApi';

jest.mock('axios');
const consoleWarnMock = jest.spyOn(console, 'warn').mockImplementation();

describe('[probeGoogleFontsApi]', () => {
  it('if service is available returns true', async () => {
    (axios.get as jest.Mock).mockImplementation(() => Promise.resolve({ data: 'some_data' }));

    const result = await probeGoogleFontsApi();

    expect(result).toEqual(true);
  });

  it('if service is unavailable returns false', async () => {
    const err = new Error('error');
    (axios.get as jest.Mock).mockImplementation(() => Promise.reject(err));

    const result = await probeGoogleFontsApi();

    expect(result).toEqual(false);
    expect(consoleWarnMock).toBeCalledTimes(1);
    expect(consoleWarnMock).toBeCalledWith('GoogleFontsAPI is unavailable:', err);
  });
});
