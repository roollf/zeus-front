'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardFooter,
    CardTitle,
    CardDescription,
    CardContent
} from "@/components/ui/card";
import {
    Table,
    TableHeader,
    TableBody,
    TableFooter,
    TableHead,
    TableRow,
    TableCell,
    TableCaption,
} from "@/components/ui/table";
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    flexRender,
    getCoreRowModel,
    useReactTable,
} from '@tanstack/react-table'

export default function HomeApp() {
    const [data, setData] = useState([]);
    const [marca, setMarca] = useState("");
    const [quantidade, setQuantidade] = useState("");
    const [valor, setValor] = useState("");

    function handleSubmit(e) {
        e.preventDefault();

        const data = {
            marca: marca,
            quantidade: quantidade,
            valor: valor
        };

        axios.post('http://localhost:3001/racao', data).then(
            () => {
                setMarca("");
                setQuantidade("");
                setValor("");
            }
        )
    }

    useEffect(() => {
        axios.get('http://localhost:3001/racao').then(
            (response) => setData(response.data)
        )
    }, [marca, quantidade, valor])

    const columns = [
        {
            accessorKey: 'marca',
            header: () => <div className="w-[100px]">Ração</div>,
            cell: info => <div className="font-semibold">{info.getValue()}</div>
        },
        {
            accessorKey: 'quantidade',
            header: () => 'Quantidade',
            cell: ({ row }) => {
                const quantidade = parseFloat(row.getValue("quantidade"));
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "unit",
                    unit: "kilogram"
                }).format(quantidade)

                return <div>{formatted}</div>
            }
        },
        {
            accessorKey: 'valor',
            header: () => <div className="text-right">Valor</div>,
            cell: ({ row }) => {
                const valor = parseFloat(row.getValue("valor"));
                const formatted = new Intl.NumberFormat("pt-BR", {
                    style: "currency",
                    currency: "BRL"
                }).format(valor)

                return <div className="text-right">{formatted}</div>
            }
        }
    ]

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <main className="bg-zinc-950 flex min-h-screen flex-col items-center justify-center p-24 gap-24">
            <div>
                <Card className="w-[350px]">
                    <CardHeader>
                        <CardTitle>Testando</CardTitle>
                        <CardDescription>testando novamente</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit}>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="ração">Ração</Label>
                                    <Input id="ração" value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Coloque aqui a marca da ração" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="quantidade">Quantidade</Label>
                                    <Input id="quantidade" value={quantidade} onChange={(e) => setQuantidade(e.target.value)} placeholder="Coloque aqui a quantidade de ração" />
                                </div>
                                <div className="flex flex-col space-y-1.5 mb-5">
                                    <Label htmlFor="valor">Valor</Label>
                                    <Input id="valor" value={valor} onChange={(e) => setValor(e.target.value)} placeholder="Coloque aqui o valor da ração" />
                                </div>
                            </div>
                            <CardFooter className="flex justify-between p-3">
                                <Button variant="outline">Cancelar</Button>
                                <Button type="submit">Confirmar</Button>
                            </CardFooter>
                        </form>
                    </CardContent>
                </Card>
            </div>
            <div>
                <Table className="bg-white">
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => (
                                    <TableHead key={header.id}>
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
                        {table.getRowModel().rows.map(row => (
                            <TableRow key={row.id}>
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id}>
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={2} className="font-semibold">Total</TableCell>
                            <TableCell className="text-right">R$ 150,00</TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>
        </main>
    );
}