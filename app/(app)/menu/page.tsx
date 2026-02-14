import React from "react";

const MenuPage = () => {
  return (
    <React.Fragment>
      <div>List Menu</div>
      <div className="flex flex-col gap-8">
        <div className="border border-red-600">Menu favorit</div>
        <div className="border border-red-600">List Category </div>
        <div className="border border-red-600">Tambah data baru</div>
      </div>
    </React.Fragment>
  );
};

export default MenuPage;
