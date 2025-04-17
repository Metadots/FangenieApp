import { Platform } from 'react-native';

const devUrls = {
    api_url:
        Platform.OS === 'ios'
            ? 'http://localhost:8000/api/v1'
            : 'http://10.0.2.2:8000/api/v1',
    file_url:
        Platform.OS === 'ios' ? 'http://localhost:8000' : 'http://10.0.2.2:8000',
};

const prodUrls = {};

const environment = devUrls;

export const environmentUrls = {
    ...environment,
};