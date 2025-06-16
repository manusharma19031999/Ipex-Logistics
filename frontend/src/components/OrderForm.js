import React, { useState } from "react";
import "../styles/OrderForm.css";

function OrderForm({ onConfirm }) {
  const [form, setForm] = useState({
    senderName: "",
    senderAddress: "",
    receiverName: "",
    receiverAddress: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onConfirm(form);
  };

  return (
    <form onSubmit={handleSubmit} className="order-form">
      <h3>Create Delivery Order</h3>

      <input
        name="senderName"
        placeholder="Sender Name"
        value={form.senderName}
        onChange={handleChange}
      />
      <input
        name="senderAddress"
        placeholder="Sender Address"
        value={form.senderAddress}
        onChange={handleChange}
      />
      <input
        name="receiverName"
        placeholder="Receiver Name"
        value={form.receiverName}
        onChange={handleChange}
      />
      <input
        name="receiverAddress"
        placeholder="Receiver Address"
        value={form.receiverAddress}
        onChange={handleChange}
      />

      <button type="submit">Confirm</button>
    </form>
  );
}

export default OrderForm;
