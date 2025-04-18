import { useQuery, useMutation } from '@tanstack/react-query';
import { HttpStatusCode } from 'axios';
import { ErrorMessages } from '../constants/CustomMessages';
import { getRequest, postRequest } from '../api';

// Base URL for the API
const MODEL_NAME = "/settings";

export function useUpdatePassword() {
    return useMutation({
        mutationFn:
            async (payload) => {
                const result = await postRequest(`${MODEL_NAME}/change-password`, payload);
                if (
                    result.status === HttpStatusCode.Ok ||
                    result.status === HttpStatusCode.Created
                ) {
                    return result.data.data;
                } else {
                    throw new Error(ErrorMessages.generalMessage);
                }
            },
    });
};