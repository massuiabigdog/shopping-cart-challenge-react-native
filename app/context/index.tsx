import { Box, useToast } from "native-base";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { localStorageKeys } from "../utils";

export const UserContext = React.createContext({} as IProductsContext);

export interface IProduct {
  category: string;
  description?: string;
  image: string;
  id: number;
  price: number;
  rating?: {
    rate: number;
    count: number;
  };
  title: string;
  quantityInCart?: number;
}

export interface IProductsContext {
  cartItems: IProduct[];
  getAllProducts(): void;
  handleCartItems(favoriteItem: any, isAdding?: boolean): void;
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
        return data;
      } catch (error: any) {
        triggerToast(error.message, true);
      }
    },
    handleCartItems: async (favoriteItem: any, isAdding?: boolean) => {
      try {
        if (isAdding) {
          const existingItem = cartItems.find(item => item.id === favoriteItem.id);
          if (existingItem) {
            const updatedCartItems = cartItems.map(item => {
              if (item.id === favoriteItem.id) {
                return {
                  ...item,
                  quantityInCart: item.quantityInCart ? item.quantityInCart + 1 : 1
                };
              }
              return item;
            });
            setCartItems(updatedCartItems);
            await AsyncStorage.setItem(
              localStorageKeys.cartWord,
              JSON.stringify(updatedCartItems)
            );
          } else {
            const newCartItem = {
              ...favoriteItem,
              quantityInCart: 1
            };
            const newCartItems = [...cartItems, newCartItem];
            setCartItems(newCartItems);
            await AsyncStorage.setItem(
              localStorageKeys.cartWord,
              JSON.stringify(newCartItems)
            );
          }
        } else {
          const existingItem = cartItems.find(item => item.id === favoriteItem.id);
          if (existingItem) {
            if (existingItem.quantityInCart && existingItem.quantityInCart > 1) {
              const updatedCartItems = cartItems.map(item => {
                if (item.id === favoriteItem.id) {
                  return {
                    ...item,
                    quantityInCart: item.quantityInCart - 1
                  };
                }
                return item;
              });
              setCartItems(updatedCartItems);
              await AsyncStorage.setItem(
                localStorageKeys.cartWord,
                JSON.stringify(updatedCartItems)
              );
            } else {
              const newCartItems = cartItems.filter(item => item.id !== favoriteItem.id);
              setCartItems(newCartItems);
              await AsyncStorage.setItem(
                localStorageKeys.cartWord,
                JSON.stringify(newCartItems)
              );
            }
          }
        }
      } catch (error) {
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
