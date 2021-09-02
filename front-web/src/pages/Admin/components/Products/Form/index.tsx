import { makePrivateRequest } from 'core/utils/request';
import BaseForm from 'pages/Admin/components/BaseForm';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles.scss';

type FormState = {
    name: string;
    price: string;
    imageUrl: string;
    description: string;
}

const Form = () => {
    const { register, handleSubmit } = useForm<FormState>();

    const onSubmit = (data: FormState) => {
        makePrivateRequest({ url: '/products', method: 'POST', data });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <BaseForm title="cadastrar um produto" >
                <div className="row">
                    <div className="col-6">
                        <input
                            {...register('name', { required: "Campo obrigatório" })}
                            name="name"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Nome do Produto"
                        />
                        <input
                            {...register('price', { required: "Campo obrigatório" })}
                            name="price"
                            type="number"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Preço"
                        />
                        <input
                            {...register('imageUrl', { required: "Campo obrigatório" })}
                            name="imageUrl"
                            type="text"
                            className="form-control margin-bottom-30 input-base"
                            placeholder="Imagem do Produto"
                        />
                    </div>
                    <div className="col-6">
                        <textarea
                            {...register('description', { required: "Campo obrigatório" })}
                            name="description"
                            className="form-control input-base"
                            placeholder="Descrição"
                            cols={30}
                            rows={10}
                        />
                    </div>
                </div>
            </BaseForm>
        </form>
    )
}

export default Form;