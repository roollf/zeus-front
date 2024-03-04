'use client';
import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogTrigger,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import CurrencyInput from 'react-currency-input-field';

const columns = [
  {
    accessorKey: 'marca',
    header: () => <div className='w-[150px]'>Ração</div>,
    cell: (info) => <div className='text-[#3D405B] w-[150px] font-semibold'>{info.getValue()}</div>,
  },
  {
    accessorKey: 'quantidade',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className='w-[100px]'>Quantidade</div>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const quantidade = parseFloat(row.getValue('quantidade'));
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'unit',
        unit: 'kilogram',
      }).format(quantidade);

      return <div className='text-center text-[#3D405B] w-[100px]'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'data',
    header: ({ column }) => {
      return (
        <Button
          variant='ghost'
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          <div className='w-[150px]'>Data da compra</div>
          <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
      );
    },
    cell: ({ row }) => {
      const dateString = row.getValue('data');
      const [year, month, day] = dateString.split('-');
      const data = new Date(year, month - 1, day);
      const formatted = data.toLocaleDateString('pt-BR');

      return <div className='text-center text-[#3D405B] w-[150px]'>{formatted}</div>;
    },
  },
  {
    accessorKey: 'valor',
    header: () => <div className='w-[100px] text-right'>Valor</div>,
    cell: ({ row }) => {
      const valor = parseFloat(row.getValue('valor'));
      const formatted = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(valor);

      return <div className='w-[100px] text-right text-[#3D405B]'>{formatted}</div>;
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const tableRow = row.original;
      const [handleSaveState, setHandleSaveState] = useState(false);

      const handleDelete = async () => {
        await axios.delete('http://localhost:3001/racao', { data: { id: tableRow._id } });
      };

      const formik = useFormik({
        initialValues: {
          marca: tableRow.marca,
          quantidade: tableRow.quantidade,
          valor: tableRow.valor,
          data: tableRow.data,
        },
        validationSchema: Yup.object({
          marca: Yup.string()
            .max(15, 'Digite 15 caracteres ou menos')
            .required('Campo obrigatório'),
          quantidade: Yup.number()
            .max(500, 'Digite um valor abaixo de 500 kg')
            .required('Campo obrigatório'),
          valor: Yup.number()
            .max(10000, 'Digite um valor abaixo de R$ 10.000,00')
            .required('Campo obrigatório'),
          data: Yup.date().required('Campo obrigatório'),
        }),
        onSubmit: (values) => {
          const updatedData = {
            marca: values.marca,
            quantidade: parseFloat(values.quantidade),
            data: values.data,
            valor: parseFloat(values.valor),
            id: tableRow._id,
          };

          if (
            formik.values.marca !== tableRow.marca ||
            formik.values.quantidade !== tableRow.quantidade ||
            formik.values.valor !== tableRow.valor ||
            formik.values.data !== tableRow.data
          ) {
            axios.patch('http://localhost:3001/racao', updatedData);
            setHandleSaveState(true);
          } else {
            setHandleSaveState(false);
          }
        },
      });

      return (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DialogTrigger>
          <DialogContent className='sm:max-w-[425px]'>
            <DialogHeader>
              <DialogTitle className='text-[#3D405B]'>Alterar informações da compra</DialogTitle>
              <DialogDescription>Faça alterações sobre os dados inseridos.</DialogDescription>
            </DialogHeader>
            <form onSubmit={formik.handleSubmit}>
              <div className='grid gap-4 py-4'>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='marca' className='text-right text-[#3D405B]'>
                    Marca
                  </Label>
                  <div className='col-span-3'>
                    <Input
                      className='col-span-3'
                      id='marca'
                      name='marca'
                      type='text'
                      placeholder='Digite aqui a marca da ração'
                      onChange={formik.handleChange('marca')}
                      onBlur={formik.handleBlur('marca')}
                      value={formik.values.marca}
                    />
                    {formik.errors.marca && formik.touched.marca ? (
                      <div className='text-xs text-red-600 font-light mt-2'>
                        {formik.errors.marca}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='quantidade' className='text-right text-[#3D405B]'>
                    Quantidade
                  </Label>
                  <div className='col-span-3'>
                    <CurrencyInput
                      className='col-span-3 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      id='quantidade'
                      placeholder='Digite aqui a quantidade de ração'
                      onValueChange={(value) => formik.setFieldValue('quantidade', value)}
                      onBlur={formik.handleBlur('quantidade')}
                      value={formik.values.quantidade}
                      suffix=' ᴋg'
                      groupSeparator=','
                      decimalSeparator='.'
                      maxLength={10}
                    />
                    {formik.errors.quantidade && formik.touched.quantidade ? (
                      <div className='text-xs text-red-600 font-light mt-2'>
                        {formik.errors.quantidade}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='username' className='text-right text-[#3D405B]'>
                    Valor
                  </Label>
                  <div className='col-span-3'>
                    <CurrencyInput
                      className='col-span-3 flex h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50'
                      id='valor'
                      placeholder='Digite aqui o valor da ração'
                      onValueChange={(value) => formik.setFieldValue('valor', value)}
                      onBlur={formik.handleBlur('valor')}
                      value={formik.values.valor}
                      prefix='R$ '
                      groupSeparator=','
                      decimalSeparator='.'
                      maxLength={10}
                    />
                    {formik.errors.valor && formik.touched.valor ? (
                      <div className='text-xs text-red-600 font-light mt-2'>
                        {formik.errors.valor}
                      </div>
                    ) : null}
                  </div>
                </div>
                <div className='grid grid-cols-4 items-center gap-4'>
                  <Label htmlFor='data' className='text-right text-[#3D405B]'>
                    Data
                  </Label>
                  <div className='col-span-3'>
                    <Input
                      className='col-span-3'
                      id='data'
                      name='data'
                      type='date'
                      onChange={formik.handleChange('data')}
                      onBlur={formik.handleBlur('data')}
                      value={formik.values.data}
                    />
                    {formik.errors.data && formik.touched.data ? (
                      <div className='text-xs text-red-600 font-light mt-2'>
                        {formik.errors.data}
                      </div>
                    ) : null}
                  </div>
                </div>
                <Input type='hidden' name='id' value={tableRow._id} />
              </div>
              <DialogFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type='submit' className='bg-[#DDBEA9] hover:bg-[#E2C6B4]/80'>
                      Salvar alterações
                    </Button>
                  </AlertDialogTrigger>
                  {!handleSaveState ? (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-[#3D405B]'>
                          Nenhuma alteração realizada
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Nenhuma alteração foi realizada, clique em continuar para retornar ao
                          formulário de edição.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction className='bg-[#DDBEA9] hover:bg-[#E2C6B4]/80'>
                          Retornar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  ) : (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle className='text-[#3D405B]'>
                          Alterações salvas com sucesso
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          As alterações foram realizadas e salvas, clique em continuar para retornar
                          a página.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogAction
                          className='bg-[#DDBEA9] hover:bg-[#E2C6B4]/80'
                          onClick={() => window.location.reload()}
                        >
                          Continuar
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button type='submit' className='bg-[#D99696] hover:bg-[#E8B4B4]/80'>
                      Excluir
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className='text-[#3D405B]'>
                        Você tem certeza?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        O produto será removido e o processo não pode ser revertido.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            type='submit'
                            className='bg-[#DDBEA9] hover:bg-[#E2C6B4]/80'
                            onClick={handleDelete}
                          >
                            Confirmar
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle className='text-[#3D405B]'>
                              Produto removido com sucesso
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              O produto foi removido, clique em continuar para retornar a página.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogAction
                              className='bg-[#DDBEA9] hover:bg-[#E2C6B4]/80'
                              onClick={() => window.location.reload()}
                            >
                              Continuar
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      );
    },
  },
];

export { columns };
