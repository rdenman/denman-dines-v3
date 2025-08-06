"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams } from "next/navigation";

interface SmartPaginationProps {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  itemsPerPage: number;
  baseUrl?: string;
}

function generatePaginationItems(
  currentPage: number,
  totalPages: number
): Array<{
  type: "page" | "ellipsis";
  value: number;
  key: string;
}> {
  const items: Array<{
    type: "page" | "ellipsis";
    value: number;
    key: string;
  }> = [];

  // Always show first page
  items.push({
    type: "page",
    value: 1,
    key: "page-1",
  });

  // Calculate the range of pages to show around current page
  const startPage = Math.max(2, currentPage - 1);
  const endPage = Math.min(totalPages - 1, currentPage + 1);

  // Add ellipsis after first page if there's a gap
  if (startPage > 2) {
    items.push({
      type: "ellipsis",
      value: startPage - 1,
      key: "ellipsis-start",
    });
  }

  // Add pages around current page
  for (let pageNum = startPage; pageNum <= endPage; pageNum++) {
    if (pageNum > 1 && pageNum < totalPages) {
      items.push({
        type: "page",
        value: pageNum,
        key: `page-${pageNum}`,
      });
    }
  }

  // Add ellipsis before last page if there's a gap
  if (endPage < totalPages - 1) {
    items.push({
      type: "ellipsis",
      value: endPage + 1,
      key: "ellipsis-end",
    });
  }

  // Always show last page (if there is more than one page)
  if (totalPages > 1) {
    items.push({
      type: "page",
      value: totalPages,
      key: `page-${totalPages}`,
    });
  }

  return items;
}

export function SmartPagination({
  currentPage,
  totalPages,
  totalCount,
  itemsPerPage,
  baseUrl = "/",
}: SmartPaginationProps) {
  const searchParams = useSearchParams();

  if (totalCount <= itemsPerPage) {
    return null;
  }

  const paginationItems = generatePaginationItems(currentPage, totalPages);

  // Helper function to generate URLs with preserved query parameters
  const generatePageUrl = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    return `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="mt-8">
      <Pagination>
        <PaginationContent>
          {currentPage > 1 && (
            <PaginationItem>
              <PaginationPrevious href={generatePageUrl(currentPage - 1)} />
            </PaginationItem>
          )}

          {paginationItems.map((item) => (
            <PaginationItem key={item.key}>
              {item.type === "page" ? (
                <PaginationLink
                  href={generatePageUrl(item.value)}
                  isActive={item.value === currentPage}
                >
                  {item.value}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          {currentPage < totalPages && (
            <PaginationItem>
              <PaginationNext href={generatePageUrl(currentPage + 1)} />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
}
