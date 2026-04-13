import Link from "next/link";

const Pagination = ({ currentPage, totalPages }: { currentPage: number; totalPages: number }) => {
  const prevPage = currentPage - 1;
  const nextPage = currentPage + 1;

  const baseClasses = "px-3 py-1 rounded border border-border text-sm font-medium text-text-primary hover:bg-surface-muted transition-colors";
  const activeClasses = "bg-brand-500 text-white border-brand-500 hover:bg-brand-600";

  return (
    <div className="flex items-center justify-center gap-2 mt-6">

      {/* Previous */}
      {currentPage > 1 && (
        <Link href={`?page=${prevPage}`} className={baseClasses}>
          ← Prev
        </Link>
      )}

      {/* Page numbers */}
      {Array.from({ length: totalPages }, (_, i) => {
        const page = i + 1;
        return (
          <Link
            key={page}
            href={`?page=${page}`}
            className={`${baseClasses} ${page === currentPage ? activeClasses : ""}`}
          >
            {page}
          </Link>
        );
      })}

      {/* Next */}
      {currentPage < totalPages && (
        <Link href={`?page=${nextPage}`} className={baseClasses}>
          Next →
        </Link>
      )}

    </div>
  );
};

export default Pagination;