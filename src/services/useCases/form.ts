import api from '../api';
import { formType } from '../models/form';

const formApi = {
    // eslint-disable-next-line
    get: (amount: number) => api.get<formType>(`api.php?amount=${amount}`),
};

export default formApi;
