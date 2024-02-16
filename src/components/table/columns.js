const columns = [
    {
        accessorKey: 'marca',
        header: () => 'Marca',
        cell: info => info.getValue()
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

            return <div className="text-right font-medium">{formatted}</div>
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

            return <div className="text-right font-medium">{formatted}</div>
        }
    }
]

export { columns };