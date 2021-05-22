import React, {
    createContext,
    useState,
    Dispatch,
    SetStateAction,
} from 'react';
import { formType } from 'services';

interface FormContextData {
    state: formType;
    setState: Dispatch<SetStateAction<formType>>;
}

const FormContext = createContext<FormContextData>({} as FormContextData);

export const FormProvider: React.FC = ({ children }) => {
    const [state, setState] = useState<formType>({} as formType);
    // const [loading, setLoading] = useState<boolean>(true);

    return (
        <FormContext.Provider
            value={{
                state,
                setState,
            }}
        >
            {children}
        </FormContext.Provider>
    );
};

export default FormContext;
