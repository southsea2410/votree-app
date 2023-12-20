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
