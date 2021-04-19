
const filterPages = (visiblePages: number[], totalPages: number) => {
    return visiblePages.filter(page => page <= totalPages);
};

export const getVisiblePages = (activePage: number, calculateTotalPages: number) => {
    if (calculateTotalPages < 5) {
        return filterPages([1, 2, 3, 4,], calculateTotalPages);
    } else {
        if (activePage % 5 >= 0 && activePage > 4 && activePage + 2 < calculateTotalPages) {
            return [1, activePage - 1, activePage, activePage + 1, calculateTotalPages];
        } else if (activePage % 5 >= 0 && activePage > 4 && activePage + 2 >= calculateTotalPages) {
            return [1, calculateTotalPages - 3, calculateTotalPages - 2, calculateTotalPages - 1, calculateTotalPages];
        } else {
            return [1, 2, 3, 4, 5, calculateTotalPages];
        }
    }
};