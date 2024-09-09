import axiosInstance from './axiosInstance.js';

export const signUp = async (signUpData) => {
  try {
    const response = await axiosInstance.post('/auth/signup', signUpData);
    console.log("Sign-up successful:", response);
  } catch (error) {
    console.error('Error during sign up:', error);
    throw error;
  }
};

export const signIn = async (signInData) => {
  try {
    const response = await axiosInstance.post('/auth/signin', signInData);
    const { token } = response.data;
    localStorage.setItem('token', token);
    return token;
  } catch (error) {
    console.error('Error during sign in:', error);
    throw error;
  }
};
