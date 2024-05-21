"use server";

import { AxiosError } from 'axios';
import axios from 'axios';
import { cookies } from 'next/headers';

const getUserFromDB = async (email: string, password: string) => {
  const url = process.env.AUTH_URL + '/sign-in';

  try {
    const res = await axios.post(url, {
      email,
      password
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export default async function signIn(formData: FormData) {
  try {
    let user = null;
  
    user = await getUserFromDB(formData.get('email') as string, formData.get('password') as string);

    if (user) {
      cookies().set('jid', user.accessToken, {
        httpOnly: true,
        secure: true
      });

      return user;
    }
  } catch (error) {
    let errorMsg = 'Something error when sign in';

    if (error instanceof AxiosError && error.response?.status === 400) {
      errorMsg = 'Email and password fields are required !!!';
    } else if (error instanceof AxiosError && error.response?.status === 401) {
      errorMsg = 'Password not correct';
    } else if (error instanceof AxiosError && error.response?.status === 404) {
      errorMsg = 'Email not exist';
    }

    return {
      error: errorMsg
    };
  } 
}