export function getPageNumbers(totalPages: number, safePage: number): (number | 'ellipsis')[] {
    //
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

    const pages: (number | 'ellipsis')[] = [1];

    if (safePage > 3) pages.push('ellipsis');

    const startPage = Math.max(2, safePage - 1);
    const endPage = Math.min(totalPages - 1, safePage + 1);

    for (let i = startPage; i <= endPage; i++) pages.push(i);

    if (safePage < totalPages - 2) pages.push('ellipsis');
    pages.push(totalPages);

    return pages;
}
