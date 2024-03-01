import React, { useContext, useEffect, useState } from "react";
import { Text, Spinner } from "native-base";
import { UserContext } from "../context";
import { ProductList, MainHeader } from "../components";


function Home() {
  const { loading, getAllProducts } = useContext(UserContext);

  const [errorAPI] = useState(null);
  const [list, setList] = useState<any>();
  useEffect(() => {
    handleSearch();
  }, []);

  const handleSearch = async () => {
    const response = await getAllProducts();
    setList(response);
  };
  return (
    <>
      <MainHeader label="Online Store" />
      {loading ? (
        <Spinner margin="auto" />
      ) : (
        <>
          {errorAPI ? (
            <Text>Error fetching data. Please try again later.</Text>
          ) : (
            <ProductList providedList={list} />
          )}
        </>
      )}
    </>
  );
}

export default Home;
