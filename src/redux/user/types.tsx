export type User = {
    id: string;
    name: string;
  };
  
  export type UserState = {
    user: User | null;
    isLoading: boolean;
    error: string | null;
  };
  
export const LOGIN_REQUEST = 'user/loginRequest';
export const LOGIN_SUCCESS = 'user/loginSuccess';
export const LOGIN_FAILURE = 'user/loginFailure';
  