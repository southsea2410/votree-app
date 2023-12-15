import { useState, useEffect } from 'react';

export function useNavBarHeight() {
    const [navBarHeight, setNavBarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            const height = navbar.getBoundingClientRect().height;
            setNavBarHeight(height + 20);
        }
    }, []);

    return navBarHeight;
}
