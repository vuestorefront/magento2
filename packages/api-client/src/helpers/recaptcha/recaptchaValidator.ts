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
    const { secretkey } = context.config.recaptcha;
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${secretkey}&response=${token}`;

    const result = await fetch(url);
    const response = await result.json();

    return response;
  } catch (error) {
    throw error.message || error;
  }
};
