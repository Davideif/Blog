import Link from "next/link";

const Pagination = ({ currentPage, totalPages }) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      {/* Previous */}
      {currentPage > 1 && (
        <Link
          href={`?page=${prevPage}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Prev
        </Link>
      )}

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;

        return (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`px-3 py-1 rounded border ${
              page === currentPage
                ? "bg-blue-600 text-white"
                : "hover:bg-gray-100"
            }`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages && (
        <Link
          href={`?page=${nextPage}`}
          className="px-3 py-1 border rounded hover:bg-gray-100"
        >
          Next
        </Link>
      )}

    </div>
  );
};

export default Pagination;