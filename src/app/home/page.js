'use client';
import axios from 'axios';
import { useState, useEffect } from 'react';
import * as React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { AddForm } from '@/components/form';
import { columns } from '@/components/table/columns';
import DataTable from '@/components/table/dataTable';

export default function HomeApp() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:3001/racao')
      .then((response) => {
        const sortedData = response.data.sort((a, b) => {
          return new Date(b.data) - new Date(a.data);
        });
        setData(sortedData);
      })
      .catch((error) => console.error('Erro ao buscar dados:', error));
  }, []);

  return (
    <main className='bg-[#9FB3C8] flex min-h-screen flex-col items-center justify-center p-24 gap-24'>
      <div>
        <Card className='w-[350px]'>
          <CardHeader>
            <CardTitle className='text-[#3D405B] font-extrabold'>ração.</CardTitle>
            <CardDescription>insira aqui os dados da sua compra</CardDescription>
          </CardHeader>
          <CardContent>
            <AddForm />
          </CardContent>
        </Card>
      </div>
      <div className='bg-white rounded-lg border'>
        <DataTable columns={columns} data={data} />
      </div>
    </main>
  );
}
