import { useToast as chakraUseToast } from '@chakra-ui/react';


export const useToast = () => {
    const chakraToast = chakraUseToast();

    const showToast = ({ title, description, status }) => {
        chakraToast({
            title,
            description,
            status,
            duration: 3000,
            isClosable: true,
        });
    };

    return showToast;
};
