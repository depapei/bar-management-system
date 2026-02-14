import React from "react";

const OrderPage = () => {
  return (
    <React.Fragment>
      <div>Order</div>
      <div className="flex flex-col gap-8">
        <div className="border border-red-600">Order Terbaru</div>
        <div className="border border-red-600">Tambah data baru</div>
      </div>
    </React.Fragment>
  );
};

export default OrderPage;
