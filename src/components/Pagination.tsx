
interface PaginationProps {
    totalPages: number;
    currentPage: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
    const displayPages = 4; // Số lượng trang hiển thị

    const handlePageClick = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    const renderPageButtons = () => {
        const buttons = [];
        const startPage = Math.max(1, currentPage - Math.floor(displayPages / 2));
        const endPage = Math.min(totalPages, startPage + displayPages - 1);

        for (let page = startPage; page <= endPage; page++) {
            buttons.push(
                <button
                    key={page}
                    className={currentPage === page ? 'mr-2 ml-2 h-8 w-8 rounded-full leading-7 bg-primary p-0 ' : 'mr-2 ml-2 h-8 w-8 rounded-full leading-7 bg-orange-300 p-0'}
                    onClick={() => handlePageClick(page)}
                >
                    {page}
                </button>
            );
        }

        return buttons;
    };

    return (
        <div className="pagination">
            {currentPage > 1 && (
                <button className='rounded-l-3xl bg-primary w-16' onClick={() => handlePageClick(currentPage - 1)}>Previous</button>
            )}
            {renderPageButtons()}
            {currentPage < totalPages && (
                <button className='rounded-r-3xl bg-primary w-16' onClick={() => handlePageClick(currentPage + 1)}>Next</button>
            )}
        </div>
    );
}