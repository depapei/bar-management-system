import prismaInstance from "./prismaClient";

const AddNewMenu = async (data: any) => {
  try {
    const newMenu = prismaInstance.masterProduk.create({
      data: data,
      omit: {
        ProductID: true,
      },
    });
    return newMenu;
  } catch (error) {
    return null;
  }
};

export const GetAllMenu = async () => {
  try {
    const allMenu = prismaInstance.masterProduk.findMany({});
    return allMenu;
  } catch (error) {
    return null;
  }
};

export default AddNewMenu;
