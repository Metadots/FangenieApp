import { useQuery, useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { ErrorMessages } from '../constants/CustomMessages';
import { getRequest, postRequest } from '../api';

// Base URL for the API
const MODEL_NAME = "/auth";

// Function to sign up
export function useSignUp() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/register`, payload);
                if (
                    result.status === HttpStatusCode.Ok ||
                    result.status === HttpStatusCode.Created
                ) {
                    return result.data.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            }
    });
}

// Function to login
export function useLogin() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/login`, payload);

                if (result.status === HttpStatusCode.Ok) {
                    return result.data.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            }
    });
}

// Function to verify OTP
export function useVerifyOtp() {
    return useMutation({
        mutationFn: async (payload) => {
            try {
                const result = await postRequest(`${MODEL_NAME}/verify-otp`, payload);
                if (result.status === HttpStatusCode.Ok) {
                    return result.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            } catch (err) {
                throw new Error(err.response?.data?.message);
            }
        },
    });
}

// Function to resend OTP
export function useResendOtp() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/resend-otp`, payload);
                if (result.status === HttpStatusCode.Ok) {
                    return result.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            }
    });
}

// Function to reset password
export function useForgotPassword() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/forgot-password`, payload);
                if (result.status === HttpStatusCode.Ok) {
                    return result.data.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            }
    });
}

// Function to reset password
export function useResetPassword() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/reset-password`, payload);
                if (result.status === HttpStatusCode.Ok) {
                    return result.data.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            }
    });
}

// Function to get user context
export function useContext() {
    return useQuery({
        queryKey: ['context'],
        queryFn: async () => {
            const result = await getRequest(`${MODEL_NAME}/context`);
            if (result.status === HttpStatusCode.Ok) {
                return result.data.data;
            } else {
                throw new Error(ErrorMessages.generalMessage);
            }
        },
    });
}
