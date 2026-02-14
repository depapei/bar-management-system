import { useProductList } from "@/lib/httpCall/Master";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useMemo } from "react";

interface Product {
  ProductID: string | number;
  ProductName: string;
  ProductType: string;
  Price: number;
  Stock: number;
  Unit: string;
  CreatedAt: string;
}

interface ProductResponse {
  data: Product[]; // atau products: Product[]
  // total?: number;
}

export const ProductTable = () => {
  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ProductName", headerName: "Nama Produk", width: 130 },
    { field: "ProductType", headerName: "Kategori", width: 130 },
    {
      field: "Price",
      headerName: "Harga",
      type: "number",
      width: 90,
      valueFormatter: (value) => {
        if (!value) return "Rp 0";
        return `Rp ${Number(value).toLocaleString("id-ID")}`;
      },
    },
    {
      field: "Stock",
      headerName: "Stok",
      description: "Sisa Stok",
      sortable: false,
      width: 160,
      valueGetter: (value, row) => `${row.Stock || ""} ${row.Unit || ""}`,
    },
    {
      field: "CreatedAt",
      headerName: "Dibuat pada",
      width: 130,
      valueFormatter: (value) => {
        if (!value) return "-";
        const date = new Date(value);
        return date.toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        });
      },
    },
  ];

  const { data, isLoading, refetch } = useProductList();
  const rows = useMemo(() => {
    if (!data) return [];

    // Cek apakah data adalah array atau object
    const products = Array.isArray(data)
      ? data
      : (data as ProductResponse).data; // atau .products

    if (!Array.isArray(products)) return [];

    return products.map((item: Product) => ({
      id: item.ProductID,
      ProductName: item.ProductName,
      ProductType: item.ProductType,
      Price: item.Price,
      Stock: item.Stock,
      Unit: item.Unit,
      CreatedAt: item.CreatedAt,
    }));
  }, [data]);

  useEffect(() => {
    if (!data && !isLoading) {
      refetch();
    }
  }, [data, isLoading, refetch]);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 25, 50, 100]}
        checkboxSelection
        loading={isLoading}
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
