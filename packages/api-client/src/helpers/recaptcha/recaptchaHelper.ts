import axios from 'axios';

interface RecaptchaApiResponse {
  success: boolean,
  challenge_ts: string,
  hostname: string,
  'error-codes'?: [any]
}

export default async (
  secretkey: string,
  token: string,
): Promise<RecaptchaApiResponse> => {
  try {
    const result = await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params: {
        secret: secretkey,
        response: token,
      },
    });
    return result.data;
  } catch (error) {
    throw error.message || error;
  }
};
