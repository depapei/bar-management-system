"use client";
import ProductForm from "@/components/Form/ProdukForm";
import { ProductTable } from "@/components/Table/ProductTable";
import React from "react";

const MenuPage = () => {
  return (
    <React.Fragment>
      <div>List Menu</div>
      <div className="flex flex-col gap-8">
        <div className="p-8">Menu favorit</div>
        <div className="p-8">
          <ProductTable />
        </div>
        <div className="p-8">
          <ProductForm />
        </div>
      </div>
    </React.Fragment>
  );
};

export default MenuPage;
