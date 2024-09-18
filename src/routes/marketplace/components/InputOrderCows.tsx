export interface OrderCow {
    cowId: number;
    amount: number;
}


export default function InputOrderCows({ orderCows, setOrderCows }: {orderCows: OrderCow[], setOrderCows: any}) {
    const handleArrayChange = (index, field, value) => {
        const newArray = [...orderCows];
        newArray[index][field] = value;
        setOrderCows(newArray);
    };

    const addItem = () => {
        setOrderCows(prevState => ([...prevState, { tokenId: 0, amount: 0 }]));
    };

    const removeItem = (index) => {
        setOrderCows(prevState => (prevState.filter((_, i) => i !== index)));
    };


    return (
        <div>
            <button type="button" onClick={() => addItem()}> Add Cow</button>

            <div className={"orderItems"}>

                {orderCows.map((item, index) => (
                    <div key={index}>
                        <Input label={"Cow ID"} value={item.cowId}
                               setValue={(value) => handleArrayChange(index, 'tokenId', value)}/>
                        <Input label={"Amount"} value={item.amount}
                               setValue={(value) => handleArrayChange( index, 'amount', value)}/>
                        <button type="button" onClick={() => removeItem(index)}>Remove</button>
                    </div>
                ))}

            </div>
        </div>
    );
}


function Input({ label, value, setValue }) {
    return (
        <label>
            {label}
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        </label>
    )
}

