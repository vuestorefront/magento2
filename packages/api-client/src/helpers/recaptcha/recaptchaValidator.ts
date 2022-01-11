import axios from 'axios';
import { Context } from '../../types/context';

interface RecaptchaApiResponse {
  success: boolean,
  challenge_ts: string,
  hostname: string,
  'error-codes'?: [any],
  score?: number
}

export default async (
  context: Context,
  token: string,
): Promise<RecaptchaApiResponse> => {
  try {
    const result = await axios({
      method: 'post',
      url: 'https://www.google.com/recaptcha/api/siteverify',
      params: {
        secret: context.config.recaptcha.secretkey,
        response: token,
      },
    });

    if (context.config.recaptcha.version === 3
      && typeof result.data.score !== 'undefined'
      && result.data.score < context.config.recaptcha.score
    ) {
      result.data.success = false;
    }

    return result.data;
  } catch (error) {
    throw error.message || error;
  }
};
