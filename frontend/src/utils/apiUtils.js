export const fetchUserInfo = async (id = '') => {
    try {
        const data = await fetch('/api/v1/userInfo/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });

        // Update Redux
        const arr = await data.json();
        const info = arr.userInfo;
        if (arr.userInfo) {
            const profile = {
                _id: info._id || '',
                role: info.role.toLowerCase() || '',
                avatar: info.avatar || '',
                fullName: info.fullName || '',
                dateOfBirth: info.dateOfBirth || '',
                gender: info.gender || '',
                phoneNumber: info.phoneNumber || '',
                email: info.email || '',
                address: info.address || '',
                interest: info.interest || ''
            };

            let store = {};
            if (profile.role === 'seller') {
                store = {
                    storeEmail: info.sellerDetails.storeEmail || '',
                    storeLocation: info.sellerDetails.storeLocation || '',
                    storeName: info.sellerDetails.storeName || '',
                    storePhoneNumber: info.sellerDetails.storePhoneNumber || ''
                };
            }

            return { profile, store };
        }

        return {};
    } catch (error) {
        console.error('Error fetching user information:', error);
        return false;
    }
};

export const fetchUserProducts = async (id = '') => {
    try {
        const data = await fetch('/api/v1/sellers/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        });
        
        // Update Redux
        const arr = await data.json();
        console.log(arr);
        const info = arr.data?.products;
        if (info) {
            const productsData = info;

            return { productsData };
        }

        return {};
    } catch (error) {
        console.error('Error fetching user information:', error);
        return {};
    }
};


export const fetchProductInfo = async (id = '') => {
    try {
        const data = await fetch('/api/v1/sellers/products/' + id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            // credentials: 'include'
        });

        // Update Redux
        const arr = await data.json();
        const info = arr?.data?.product;
        if (info) {
            const product = {
                name: info.name || '',
                price: info.price || '',
                discountPrice: info.discountPrice || '',
                quantity: info.quantity || '',
                description: info.description || '',
                active: info.active || '',
                type: info.type || '',
                suitEnvironment: info.suitEnvironment || '',
                suitClimate: info.suitClimate || ''
            };

            return { product };
        }

        return {};
    } catch (error) {
        // console.error('Error fetching product information:', error);
        return false;
    }
};
