'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Button } from './ui/button';
import { RiArrowLeftSLine, RiArrowRightSLine } from 'react-icons/ri';

interface PaginationProps {
  pageCount: number;
  className?: string;
}

export default function Pagination({ pageCount, className }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentPage = Number(searchParams.get('page')) || 1;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > pageCount) return;
    router.push(createPageURL(page));
  };

  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav aria-label="Pagination" className={`flex justify-center items-center gap-4 mt-12 ${className}`}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
      >
        <RiArrowLeftSLine className="h-5 w-5" />
      </Button>

      <span className="text-sm font-medium">
        Page {currentPage} of {pageCount}
      </span>

      <Button
        variant="outline"
        size="icon"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage >= pageCount}
        aria-label="Go to next page"
      >
        <RiArrowRightSLine className="h-5 w-5" />
      </Button>
    </nav>
  );
}