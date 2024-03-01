import React, { useContext, useEffect, useState } from "react";
import { IProduct, UserContext } from "../context";
import { ProductList, MainHeader } from "../components";

function History() {
  useContext(UserContext);
  const { cartItems } = useContext(UserContext);
  const [historyList, setHistoryList] = useState<IProduct[]>();

  useEffect(() => {
    setHistoryList(cartItems);
   } ,[cartItems]);

  return (
    <>
      <MainHeader label="Your cart" />
      <ProductList providedList={historyList} />
    </>
  );
}

export default History;
