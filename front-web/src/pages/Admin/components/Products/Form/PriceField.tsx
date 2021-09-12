import React from 'react';
import { Control, Controller } from 'react-hook-form';
import CurrencyInput from 'react-currency-input-field';
import { FormState } from '.';

type Props = {
    control: Control<FormState>
}

const PriceField = ({ control }: Props) => (
    <Controller
        name="price"
        rules={{required: "Campo obrigatório"}}
        control={control}
        defaultValue=""
        render={({field}) => (
            <CurrencyInput
                placeholder="Preço"
                className="form-control input-base"
                value={field.value}
                intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                onValueChange={field.onChange}
            />
        )}
    />
);

export default PriceField;