import React from "react";
import axios from "axios";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useFormik } from "formik";
import * as Yup from 'yup';

export default function SignupForm() {
    const formik = useFormik({
        initialValues: {
            marca: '',
            quantidade: '',
            valor: '',
            data: ''
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
            data: Yup.date()
                .required('Campo obrigatório')
        }),
        onSubmit: (values) => {
            axios.post('http://localhost:3001/racao', values)
        },
    });

    return (
        <div className="grid w-full items-center gap-4">
            <form onSubmit={formik.handleSubmit}>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="marca" className="text-lg font-medium">Ração</Label>
                    <Input
                        id="marca"
                        name="marca"
                        type="text"
                        placeholder="Digite aqui a marca da ração"
                        {...formik.getFieldProps('marca')}
                    />
                    {formik.errors.marca && formik.touched.marca ? <div className="text-xs text-red-600 font-light mt-2">{formik.errors.marca}</div> : null}
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="quantidade" className="text-lg font-medium">Quantidade</Label>
                    <Input
                        id="quantidade"
                        name="quantidade"
                        type="number"
                        placeholder="Digite aqui a quantidade de ração"
                        {...formik.getFieldProps('quantidade')}
                    />
                    {formik.errors.quantidade && formik.touched.quantidade ? <div className="text-xs text-red-600 font-light mt-2">{formik.errors.quantidade}</div> : null}
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="valor" className="text-lg font-medium">Valor</Label>
                    <Input
                        id="valor"
                        name="valor"
                        type="number"
                        placeholder="Digite aqui o valor da ração"
                        {...formik.getFieldProps('valor')}
                    />
                    {formik.errors.valor && formik.touched.valor ? <div className="text-xs text-red-600 font-light mt-2">{formik.errors.valor}</div> : null}
                    <div className="mb-2"></div>
                </div>
                <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="data" className="text-lg font-medium">Data</Label>
                    <Input
                        id="data"
                        name="data"
                        type="date"
                        {...formik.getFieldProps('data')}
                    />
                    {formik.errors.data && formik.touched.data ? <div className="text-xs text-red-600 font-light mt-2">{formik.errors.data}</div> : null}
                    <div className="mb-2"></div>
                </div>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button type="submit" className="mt-5">Inserir</Button>
                    </AlertDialogTrigger>
                    {
                        Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length > 0 ?
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Dados inseridos com sucesso</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Seus dados foram inseridos, clique em continuar para retornar a página.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction onClick={() => window.location.reload()}>Continuar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                            :
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    <AlertDialogTitle>Não foi possível inserir os dados</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Você esqueceu ou inseriu algum dado incorreto, por favor retorne ao formulário e o preencha corretamente.
                                    </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                    <AlertDialogAction>Retornar</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                    }
                </AlertDialog>
            </form>
        </div>
    )
}