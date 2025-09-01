import { FC } from "react";
import "./styleForPagination.css"

interface IPaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: FC<IPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <div className="Pagination">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
                Previous
            </button>

            <h4>Page {currentPage} of {totalPages}</h4>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
        </div>
    );
};


export default Pagination;