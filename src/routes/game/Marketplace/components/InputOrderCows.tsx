import Button from "react-bootstrap/Button";
import { Form, InputGroup } from "react-bootstrap";

export interface OrderCow {
  cowId: number;
  amount: number;
}


export default function InputOrderCows({ orderCows, setOrderCows }: { orderCows: OrderCow[], setOrderCows: any }) {
  const handleArrayChange = (index, field, value) => {
    const newArray = [...orderCows];
    newArray[index][field] = value;
    setOrderCows(newArray);
  };

  const addItem = () => {
    setOrderCows(prevState => ([...prevState, { cowId: 0, amount: 0 }]));
  };

  const removeItem = (index) => {
    setOrderCows(prevState => (prevState.filter((_, i) => i !== index)));
  };


  return (
    <div>
      <Button variant="success" onClick={() => addItem()}> + Cow</Button>

      <div className={"orderItems"}>

        {orderCows.map((item, index) => (
          <div key={index}>
            <InputGroup className="mb-3">

              <InputGroup.Text>Cow Type</InputGroup.Text>
              <Form.Control value={item.cowId} onChange={(e) => handleArrayChange(index, 'cowId', +e.target.value)}/>

              <InputGroup.Text>Amount</InputGroup.Text>
              <Form.Control value={item.amount} onChange={(e) => handleArrayChange(index, 'amount', +e.target.value)}/>

              <Button variant={"danger"} onClick={() => removeItem(index)}>- Cow</Button>
            </InputGroup>

          </div>
        ))}

      </div>
    </div>
  );
}
