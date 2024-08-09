const InputOrderItems = ({ orderItems, setOrderItems }) => {
    const handleArrayChange = (type, index, field, value) => {
        const newArray = [...orderItems[type]];
        newArray[index][field] = value;
        setOrderItems(prevState => ({ ...prevState, [type]: newArray }));
    };

    const addItem = (type, newItem) => {
        setOrderItems(prevState => ({
            ...prevState,
            [type]: [...prevState[type], newItem],
        }));
    };

    const removeItem = (type, index) => {
        setOrderItems(prevState => ({
            ...prevState,
            [type]: prevState[type].filter((_, i) => i !== index),
        }));
    };

    const emptyErc20 = { tokenAddress: '', amount: 0 };
    // const emptyErc721 = { tokenAddress: '', tokenId: 0 };
    const emptyErc1155 = { tokenAddress: '', tokenId: 0, amount: 0 };

    return (
        <div>
            <button type="button" onClick={() => addItem('erc20', emptyErc20)}>Add ERC20</button>
            {/*<button type="button" onClick={() => addItem('erc721', emptyErc721)}>Add ERC721</button>*/}
            <button type="button" onClick={() => addItem('erc1155', emptyErc1155)}> Add ERC1155</button>


            <div className={"orderItems"}>

                {orderItems.erc20.map((item, index) => (
                    <div key={index}>
                        <Input label={"Token Address"} value={item.tokenAddress}
                               setValue={(value) => handleArrayChange('erc20', index, 'tokenAddress', value)}/>
                        <Input label={"Amount"} value={item.amount}
                               setValue={(value) => handleArrayChange('erc20', index, 'amount', value)}/>
                        <button type="button" onClick={() => removeItem('erc20', index)}>Remove</button>
                    </div>
                ))}

            </div>

            <div className={"orderItems"}>

                {orderItems.erc721.map((item, index) => (
                    <div key={index}>
                        <Input label={"Token Address"} value={item.tokenAddress}
                               setValue={(value) => handleArrayChange('erc721', index, 'tokenAddress', value)}/>
                        <Input label={"Token ID"} value={item.tokenId}
                               setValue={(value) => handleArrayChange('erc721', index, 'tokenId', value)}/>
                        <button type="button" onClick={() => removeItem('erc721', index)}>Remove</button>
                    </div>
                ))}

            </div>

            <div className={"orderItems"}>

                {orderItems.erc1155.map((item, index) => (
                    <div key={index}>
                        <Input label={"Token Address"} value={item.tokenAddress}
                               setValue={(value) => handleArrayChange('erc1155', index, 'tokenAddress', value)}/>
                        <Input label={"Token ID"} value={item.tokenId}
                               setValue={(value) => handleArrayChange('erc1155', index, 'tokenId', value)}/>
                        <Input label={"Amount"} value={item.amount}
                               setValue={(value) => handleArrayChange('erc1155', index, 'amount', value)}/>
                        <button type="button" onClick={() => removeItem('erc1155', index)}>Remove</button>
                    </div>
                ))}

            </div>
        </div>
    );
};


function Input({ label, value, setValue }) {
    return (
        <label>
            {label}
            <input type="text" value={value} onChange={(e) => setValue(e.target.value)}/>
        </label>
    )
}

export default InputOrderItems;
