import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { Card } from '@/components/ui/card';

// Mock Data Generation
const generateMockData = () => {
    const data = [];
    for (let i = 1; i <= 30; i++) {
        // Generate random seconds between 5.00 and 59.99
        const totalSeconds = 5 + Math.random() * 55;
        const seconds = Math.floor(totalSeconds);
        const centiseconds = Math.floor((totalSeconds % 1) * 100);

        const timeString = `${seconds.toString().padStart(2, '0')}.${centiseconds.toString().padStart(2, '0')}`;

        data.push({
            id: i,
            name: `User ${i}`,
            record: timeString,
            date: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toLocaleDateString()
        });
    }
    // Sort by record (mocking "best time" - simpler string sort for now, ideally should be numeric)
    return data.sort((a, b) => a.record.localeCompare(b.record));
};

const MOCK_DATA = generateMockData();
const ITEMS_PER_PAGE = 10;

export const Ranking: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(MOCK_DATA.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentData = MOCK_DATA.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 pt-20 md:pt-24">
            <Card className="bg-zinc-900/80 border-zinc-800 p-6 backdrop-blur-sm max-w-2xl w-full">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">실시간 랭킹</h1>
                    <p className="text-zinc-400">명예의 전당에 오른 플레이어들입니다.</p>
                </div>

                <div className="rounded-md border border-zinc-800 mb-6">
                    <Table>
                        <TableHeader>
                            <TableRow className="border-zinc-800 hover:bg-zinc-900/50">
                                <TableHead className="text-zinc-400 w-[100px]">순위</TableHead>
                                <TableHead className="text-zinc-400">이름</TableHead>
                                <TableHead className="text-zinc-400 text-right">기록</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {currentData.map((item, index) => (
                                <TableRow key={item.id} className="border-zinc-800 hover:bg-zinc-800/50">
                                    <TableCell className="font-medium text-white">
                                        {startIndex + index + 1}
                                    </TableCell>
                                    <TableCell className="text-zinc-300">{item.name}</TableCell>
                                    <TableCell className="text-right font-mono text-green-400">
                                        {item.record}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }}
                                className={currentPage === 1 ? "pointer-events-none opacity-50 text-zinc-500" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                            />
                        </PaginationItem>

                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => { e.preventDefault(); handlePageChange(page); }}
                                    className={page === currentPage ? "bg-zinc-800 text-white border-zinc-700" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }}
                                className={currentPage === totalPages ? "pointer-events-none opacity-50 text-zinc-500" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </Card>
        </div>
    );
};
