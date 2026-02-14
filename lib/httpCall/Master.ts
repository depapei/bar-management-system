import { useMutation, useQuery } from "@tanstack/react-query";
import API from "./Instance";
import { URL } from "./url";

const useAddProduct = () => {
  return useMutation({
    mutationFn: (payload) => {
      return API.post(URL.MENU, payload);
    },
  });
};

const fetchProduct = async () => {
  const { data } = await API.get(URL.MENU);
  return data;
};

export const useProductList = () => {
  return useQuery({
    queryFn: async () => {
      return await fetchProduct();
    },
    enabled: true,
    retry: 1,
    queryKey: ["ProductList"],
  });
};

export default useAddProduct;
