import { Box, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../utils";

export const UserContext = React.createContext({} as IProductsContext);

export interface IProduct {
  category: string;
  description: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  title: string;
}

export interface IProductsContext {
  cartItems: IProduct[];
  getAllProducts(): void;
  handleFavorites(favoriteItem: any): void;
  loading: boolean;
}

export function UserProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  const handleItemsFromStorage = async () => {
    const cartList = await AsyncStorage.getItem(
      localStorageKeys.cartWord
    );

    if (cartList) setCartItems(JSON.parse(cartList));
  };

  useEffect(() => {
    handleItemsFromStorage();
  }, []);

  const [loading, setLoading] = useState(false);

  const triggerToast = (message: string, isFail?: boolean) =>
    toast.show({
      render: () => {
        return (
          <Box
            zIndex={2}
            bg={`${isFail ? "red" : "green"}.500`}
            px="2"
            py="1"
            rounded="sm"
            mb={5}
          >
            {message}
          </Box>
        );
      },
    });

  const userContextValue: IProductsContext = {
    cartItems,
    loading,

    getAllProducts: async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://fakestoreapi.com/products`
        );
        setLoading(false);
        if (!response.ok) {
          throw new Error("Something wrong. Please try later.");
        }
        const data = await response.json();
        console.log("data", data);
        return data;
      } catch (error: any) {
        triggerToast(error.message, true);
      }
    },
    handleFavorites: async (favoriteItem: any) => {
      try {

   

        triggerToast("Product added to your cart!");
      } catch (error) {
        console.log("error saving word", error as string);
        throw new Error("An error occurred while saving word");
      }
    },

  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
}
