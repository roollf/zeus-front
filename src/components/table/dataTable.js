'use client';
import { useState, useEffect } from 'react';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getPaginationRowModel,
  getSortedRowModel,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '../ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

export default function DataTable({ columns, data }) {
  const [sorting, setSorting] = useState([]);
  const [filtroMes, setFiltroMes] = useState(null);
  const [dadosFiltrados, setDadosFiltrados] = useState(null);

  useEffect(() => {
    if (filtroMes) {
      const filtrandoDados = data.filter((item) => {
        const date = new Date(item.data);
        const mesAno = date.toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
        const mesAnoUpper = mesAno.charAt(0).toUpperCase() + mesAno.slice(1);
        return mesAnoUpper === filtroMes;
      });
      setDadosFiltrados(filtrandoDados);
    } else {
      setDadosFiltrados(data);
    }
  }, [filtroMes, data]);

  const table = useReactTable({
    data: dadosFiltrados ? dadosFiltrados : data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize: 5,
      },
    },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
  });

  if (!dadosFiltrados) {
    return (
      <div className='flex flex-col space-y-3 p-1'>
        <Skeleton className='h-[121px] w-[842px] rounded-xl' />
        <div className='flex flex-row-reverse space-x-4 space-x-reverse p-1'>
          <Skeleton className='h-[40px] w-[73px]' />
          <Skeleton className='h-[40px] w-[73px]' />
          <Skeleton className='h-[40px] w-[73px]' />
        </div>
      </div>
    );
  }

  const filtrarPorMes = (mes) => {
    setFiltroMes(mes);
  };

  const mesesDisponiveis = [
    ...new Set(
      data.map((item) => {
        const date = new Date(item.data);
        const month = date.toLocaleString('pt-BR', { month: 'long', timeZone: 'UTC' });
        return month.charAt(0).toUpperCase() + month.slice(1);
      }),
    ),
  ];

  const calcularTotal = () => {
    const total = dadosFiltrados.reduce(
      (accumulator, currentValue) => accumulator + parseFloat(currentValue.valor),
      0,
    );

    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(total);
  };

  return (
    <div className='p-2'>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className={`w-${header.width}`}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4} className='text-[#3D405B]'>
              Total
            </TableCell>
            <TableCell className='w-[150px] text-right text-[#3D405B]'>{calcularTotal()}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <div className='flex items-center justify-end space-x-2 py-4'>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline'>Filtrar</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className='w-56'>
            <DropdownMenuLabel>Meses</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className='font-medium' onClick={() => setDadosFiltrados(data)}>
              Exibir todos
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {mesesDisponiveis.map((mes, index) => (
                <DropdownMenuItem
                  className='font-light'
                  key={index}
                  onClick={() => filtrarPorMes(mes)}
                >
                  {mes}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Anterior
        </Button>
        <Button
          variant='outline'
          size='sm'
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Próxima
        </Button>
      </div>
    </div>
  );
}
