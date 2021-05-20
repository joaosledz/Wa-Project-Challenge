import api from '../api';
import { formType } from '../models/form';

const formApi = {
    get: (amount: number) => api.get<formType>(`amount=${amount}`),
};

export default formApi;
