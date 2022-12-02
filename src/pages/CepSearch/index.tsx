import './styles.css';

import ResultCard from 'components/ResultCard';
import React, {useState} from "react";
import axios from "axios";

const CepSearch = () => {

    type Address = {
        logradouro: string;
        localidade: string;
    };

    const [address, setAddress] = useState<Address>();

    type FormData = {
        cep: string
    };
    const [formData, setFormData] = useState<FormData>(
        {
            cep: ''
        }
    );

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        //console.log("Mudou para: " + event.target.value) //metodo para pegar um determinado valor

        //pega a variavel event, para pegar o target do nome e do value do componente que foi alterado
        const name = event.target.name;
        const value = event.target.value;

        //spredOperator para criar outro objeto com a mesma estrutura
        // e atualizando o value de acorco com o nome do atributo
        setFormData({...formData, [name]: value})

    }

    const handleSubimit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); //chamada para não recarregar a pagina depois de clicar no botão
        axios.get(`https://viacep.com.br/ws/${formData.cep}/json/`)
            .then(((response) =>{
                setAddress(response.data)
            })).catch((error) => {
                setAddress(undefined)
        })
    }

    return (
        <div className="cep-search-container">
            <h1 className="text-primary">Busca CEP</h1>
            <div className="container search-container">
                <form onSubmit={handleSubimit}>
                    <div className="form-container">
                        <input
                            name={"cep"}
                            value={formData.cep}
                            type="text"
                            className="search-input"
                            placeholder="CEP (somente números)"
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-primary search-button">
                            Buscar
                        </button>
                    </div>
                </form>

                {address && <>

                    <ResultCard title="Logradouro" description={address.logradouro}/>
                    <ResultCard title="Localidade" description={address.localidade}/>
                </>
                }


            </div>
        </div>
    );
};

export default CepSearch;
