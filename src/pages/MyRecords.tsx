import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/lib/store/useAuthStore';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    type ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    type SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { getMyGameHistory, type GameHistoryItem } from '@/lib/game';
import { Loader2, ClipboardList, ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';

import { Button } from "@/components/ui/button";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
    PaginationEllipsis,
} from "@/components/ui/pagination";

const ITEMS_PER_PAGE = 10;

export const MyRecords: React.FC = () => {
    const [data, setData] = useState<GameHistoryItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [sorting, setSorting] = React.useState<SortingState>([{ id: 'date', desc: true }]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const navigate = useNavigate();
    const { user } = useAuthStore();

    const columns = React.useMemo<ColumnDef<GameHistoryItem>[]>(() => [
        {
            id: "index",
            header: "No.",
            cell: ({ table, row }) => {
                const sortedIndex = table.getSortedRowModel().rows.findIndex(r => r.id === row.id);
                return <div className="text-zinc-500 font-medium ml-4">{(currentPage - 1) * ITEMS_PER_PAGE + sortedIndex + 1}</div>;
            },
        },
        {
            accessorKey: "record",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        기록 (초)
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            cell: ({ row }) => <div className="font-mono text-green-400 ml-4">{row.getValue("record")}</div>,
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        플레이 일시
                        {column.getIsSorted() === "asc" ? (
                            <ArrowUp className="ml-2 h-4 w-4" />
                        ) : column.getIsSorted() === "desc" ? (
                            <ArrowDown className="ml-2 h-4 w-4" />
                        ) : (
                            <ArrowUpDown className="ml-2 h-4 w-4" />
                        )}
                    </Button>
                )
            },
            cell: ({ row }) => {
                const dateStr = row.getValue("date") as string;
                // Ensure date string ends with Z if it doesn't have timezone info to be treated as UTC
                // But ISO format usually comes with T separator. 
                // If backend returns naive iso format (no Z), we append Z to force UTC interpretation.
                const normalizedDateStr = dateStr !== "-" && (dateStr.endsWith('Z') || dateStr.includes('+')) ? dateStr : `${dateStr}Z`;

                return (
                    <div className="text-zinc-400 ml-4">
                        {dateStr !== "-" ? new Date(normalizedDateStr).toLocaleString(undefined, {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                            hour: '2-digit',
                            minute: '2-digit'
                        }) : "-"}
                    </div>
                );
            },
        },
    ], [currentPage]);

    const fetchData = async (page: number, currentSorting: SortingState) => {
        setLoading(true);
        try {
            const skip = (page - 1) * ITEMS_PER_PAGE;

            // Default sorting
            let sortBy: 'date' | 'record' = 'date';
            let order: 'asc' | 'desc' = 'desc';

            if (currentSorting.length > 0) {
                const sortState = currentSorting[0];
                if (sortState.id === 'record') sortBy = 'record';
                else if (sortState.id === 'date') sortBy = 'date';

                order = sortState.desc ? 'desc' : 'asc';
            }

            const response = await getMyGameHistory(skip, ITEMS_PER_PAGE, sortBy, order);
            setData(response.items);
            setTotalItems(response.total);
        } catch (error) {
            console.error("Failed to fetch game history:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!user) {
            navigate('/signin?redirect=/my-records');
            return;
        }
        fetchData(currentPage, sorting);
    }, [currentPage, sorting, user, navigate]);

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        manualSorting: true,
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        state: {
            sorting,
        },
    });

    return (
        <div className="flex flex-col flex-1 text-white pt-20 px-4 max-w-4xl mx-auto w-full">
            <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                    <div className="bg-zinc-800 p-3 rounded-xl">
                        <ClipboardList className="w-6 h-6 text-zinc-300" />
                    </div>
                    <h1 className="text-2xl font-bold">나의 기록</h1>
                </div>
                <p className="text-zinc-500 text-sm mr-2">
                    총 <span className="text-white font-bold">{totalItems}</span>개의 기록
                </p>
            </div>

            <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 overflow-hidden mb-4">
                <Table>
                    <TableHeader className="bg-zinc-900">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id} className="border-zinc-800 hover:bg-transparent">
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id} className="text-zinc-400 font-bold">
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {loading ? (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    <div className="flex justify-center items-center">
                                        <Loader2 className="h-6 w-6 animate-spin text-zinc-500" />
                                    </div>
                                </TableCell>
                            </TableRow>
                        ) : table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                    className="border-zinc-800 hover:bg-zinc-800/50"
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="py-4">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center text-zinc-500">
                                    플레이 기록이 없습니다.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {!loading && totalItems > 0 && (
                <div className="mt-4 text-zinc-400">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage > 1) setCurrentPage(p => p - 1);
                                    }}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>

                            {(() => {
                                const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
                                const items = [];
                                const maxVisible = 5;

                                if (totalPages <= maxVisible) {
                                    for (let i = 1; i <= totalPages; i++) {
                                        items.push(
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(i);
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {i}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }
                                } else {
                                    // Always show page 1
                                    items.push(
                                        <PaginationItem key={1}>
                                            <PaginationLink
                                                href="#"
                                                isActive={currentPage === 1}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    setCurrentPage(1);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                1
                                            </PaginationLink>
                                        </PaginationItem>
                                    );

                                    if (currentPage > 3) {
                                        items.push(<PaginationItem key="ellipsis-start"><PaginationEllipsis /></PaginationItem>);
                                    }

                                    // Nearby pages
                                    const start = Math.max(2, currentPage - 1);
                                    const end = Math.min(totalPages - 1, currentPage + 1);

                                    for (let i = start; i <= end; i++) {
                                        if (i === 1 || i === totalPages) continue;
                                        items.push(
                                            <PaginationItem key={i}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === i}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(i);
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {i}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }

                                    if (currentPage < totalPages - 2) {
                                        items.push(<PaginationItem key="ellipsis-end"><PaginationEllipsis /></PaginationItem>);
                                    }

                                    // Always show last page
                                    if (totalPages > 1) {
                                        items.push(
                                            <PaginationItem key={totalPages}>
                                                <PaginationLink
                                                    href="#"
                                                    isActive={currentPage === totalPages}
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        setCurrentPage(totalPages);
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {totalPages}
                                                </PaginationLink>
                                            </PaginationItem>
                                        );
                                    }
                                }
                                return items;
                            })()}

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        if (currentPage < Math.ceil(totalItems / ITEMS_PER_PAGE)) setCurrentPage(p => p + 1);
                                    }}
                                    className={currentPage === Math.ceil(totalItems / ITEMS_PER_PAGE) ? "pointer-events-none opacity-50" : "cursor-pointer"}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}


        </div>
    );
};
