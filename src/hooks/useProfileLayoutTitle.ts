import { useContext, useEffect } from 'react';
import { SidePartContext } from '../layouts/SidePartLayout';

const UseProfileLayoutTitle = (newTitle: string) => {
    const { setTitle } = useContext(SidePartContext);
    useEffect(() => {
        setTitle(newTitle);
    });
};

export default UseProfileLayoutTitle;
