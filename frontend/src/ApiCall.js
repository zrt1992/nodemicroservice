import React, {useEffect} from 'react';
import axios from "axios";

const {useState} = React;
//export default function Lol() {
// export default () => {
const ApiCall = () => {
    const [countries, setData] = useState([""]);
    const fetchCountries = async () => {
        // console.log(countries);
        // console.log("asas");
        await axios.get('https://gorest.co.in/public/v2/users')
            .then((response) => {
                setData(response.data)
            })
            .catch((error) => {
                console.log(error)
            })
    }

    useEffect(() => {
        fetchCountries()
    }, []);
    const test = () => {
         // alert('asd')
    }

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={test}> this is the button</button>
                <ul>
                    {countries.length > 0 && countries.map((country, index) => {
                        return (
                            <li key={index}>
                               {country.name}
                            </li>
                        )
                    })}
                </ul>
            </header>
        </div>
    )
}
export default ApiCall;

