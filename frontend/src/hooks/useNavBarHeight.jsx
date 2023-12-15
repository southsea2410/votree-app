export function useNavBarHeight() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const height = navbar.getBoundingClientRect().height;
        return height + 20;
    }
}
