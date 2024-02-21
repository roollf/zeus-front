'use client';
import { useState } from "react";
import axios from "axios";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "@/components/ui/dialog"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const columns = [
    {
        accessorKey: 'marca',
        header: () => <div className="w-[150px]">Ração</div>,
        cell: info => <div className="w-[150px] font-semibold">{info.getValue()}</div>
    },
    {
        accessorKey: 'quantidade',
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="w-[100px]">Quantidade</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const quantidade = parseFloat(row.getValue("quantidade"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "unit",
                unit: "kilogram"
            }).format(quantidade)

            return <div className="text-center w-[100px]">{formatted}</div>
        }
    },
    {
        accessorKey: 'data',
        header: ({ column }) => {
            return (
                <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    <div className="w-[150px]">Data da compra</div>
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
        },
        cell: ({ row }) => {
            const dateString = row.getValue("data");
            const [year, month, day] = dateString.split("-");
            const data = new Date(year, month - 1, day);
            const formatted = data.toLocaleDateString("pt-BR");

            return <div className="text-center w-[150px]">{formatted}</div>
        }
    },
    {
        accessorKey: 'valor',
        header: () => <div className="w-[100px] text-right">Valor</div>,
        cell: ({ row }) => {
            const valor = parseFloat(row.getValue("valor"));
            const formatted = new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL"
            }).format(valor)

            return <div className="w-[100px] text-right">{formatted}</div>
        }
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const tableRow = row.original;
            const [novaMarca, setNovaMarca] = useState(tableRow.marca);
            const [novaQuantidade, setNovaQuantidade] = useState(tableRow.quantidade);
            const [novaData, setNovaData] = useState(tableRow.data);
            const [novoValor, setNovoValor] = useState(tableRow.valor);

            const handleSave = async () => {
                const updatedData = {
                    marca: novaMarca,
                    quantidade: novaQuantidade,
                    data: novaData,
                    valor: novoValor,
                    id: tableRow._id
                }

                await axios.patch('http://localhost:3001/racao', updatedData);
            }

            return (
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Alterar informações da compra</DialogTitle>
                            <DialogDescription>
                                Faça alterações sobre os dados inseridos.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="marca" className="text-right">
                                    Marca
                                </Label>
                                <Input
                                    id="marca"
                                    type="text"
                                    value={novaMarca}
                                    onChange={(e) => setNovaMarca(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="quantidade" className="text-right">
                                    Quantidade
                                </Label>
                                <Input
                                    id="quantidade"
                                    type="number"
                                    value={novaQuantidade}
                                    onChange={(e) => setNovaQuantidade(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="data" className="text-right">
                                    Data
                                </Label>
                                <Input
                                    id="data"
                                    type="date"
                                    value={novaData}
                                    onChange={(e) => setNovaData(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="username" className="text-right">
                                    Valor
                                </Label>
                                <Input
                                    id="valor"
                                    type="number"
                                    value={novoValor}
                                    onChange={(e) => setNovoValor(e.target.value)}
                                    className="col-span-3"
                                />
                            </div>
                            <Input
                                type="hidden"
                                name="id"
                                value={tableRow._id}
                            />
                        </div>
                        <DialogFooter>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="submit" onClick={handleSave}>Salvar alterações</Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Alterações salvas com sucesso</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            As alterações foram realizadas e salvas, clique em continuar para retornar a página.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogAction onClick={() => window.location.reload()}>Continuar</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            )
        }
    }
]

export { columns };