import { useProductList } from "@/lib/httpCall/Master";
import { Paper } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useMemo } from "react";

export const ProductTable = () => {
  const { data, isLoading } = useProductList();

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "ProductName", headerName: "Nama Produk", width: 130 },
    { field: "ProductType", headerName: "Kategori", width: 130 },
    {
      field: "Price",
      headerName: "Harga",
      type: "number",
      width: 90,
    },
    {
      field: "Stock",
      headerName: "Stok",
      description: "Sisa Stok",
      sortable: false,
      width: 160,
      valueGetter: (value, row) =>
        `${row.firstName || ""} ${row.lastName || ""}`,
    },
  ];

  const rows = useMemo(() => {
    if (data && data.length > 0) {
      const mappedData = data.map((data: any, index: React.Key) => {
        return {
          id: data.id,
          ProductName: data.ProductName,
          ProductType: data.ProductCategory,
          Price: data.Price,
          Stock: data.Stock,
        };
      });

      console.log(mappedData);
      return mappedData;
    }

    return [];
  }, [data]);

  const paginationModel = { page: 0, pageSize: 5 };

  return (
    <Paper sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
};
