import React, { useState } from "react";
import OrderForm from "./OrderForm";
import Label from "./Label";
import "../styles/Dashboard.css";

function Dashboard() {
  const [formData, setFormData] = useState(null);

  return (
    <div className="dashboard">
      <h2>Delivery Dashboard</h2>
      {!formData ? (
        <OrderForm onConfirm={(data) => setFormData(data)} />
      ) : (
        <Label formData={formData} onEdit={() => setFormData(null)} />
      )}
    </div>
  );
}

export default Dashboard;
