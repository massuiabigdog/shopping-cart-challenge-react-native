import React, { useState, useContext, ReactNode } from "react";
import { FlatList, TouchableOpacity, ScrollView, Image } from "react-native";
import { Modal, Box, Button, Text, Badge, VStack, HStack, Divider, Avatar } from "native-base";

import { IProduct, UserContext } from "../context";
import { createRateStars } from "../utils";

const ProductList = (props: {
  providedList: IProduct[] | undefined;
}) => {
  const { handleCartItems, cartItems } = useContext(UserContext);
  const [modalProduct, setModalProduct] = useState(false as any);

  const actionsButtons = (product: IProduct) => {

    if (cartItems?.some((item) => item.id === product.id)) {
      const quantityInCart = cartItems.find((item) => item.id === product.id)?.quantityInCart;
      return (
        <>
          <Button colorScheme='red' fontWeight='bold' onPress={() => handleCartItems(product, false)}>
            <Text fontWeight='bold' color='white' >
              {quantityInCart === 1 ? 'Remove from Cart' : `- 1`}
            </Text>
          </Button>
          <Button colorScheme='purple' fontWeight='bold' onPress={() => handleCartItems(product, true)}>
            <Text fontWeight='bold' color='white' >
              {`+ 1`}
            </Text>
          </Button>
        </>
      );
    } else {
      return (
        <Button colorScheme='purple' fontWeight='bold' onPress={() => handleCartItems(product, true)}>
          <Text fontWeight='bold' color='white' >Add to Cart</Text>
        </Button>
      );
    }
  }

  return (
    <>
      {props.providedList?.length === 0 && (
        <Box height="100%">
          <Text textAlign="center" margin="auto">
            No Products here yet!
          </Text>
        </Box>
      )}
      <FlatList
        data={props.providedList}
        renderItem={({ item }) => (
          <ProductCard selectProduct={(product: IProduct) => setModalProduct(product)} product={item}>{actionsButtons(item)}</ProductCard>
        )}
        keyExtractor={(item, index) => `${item.title}_${index}`}
        onEndReachedThreshold={0.1}
      />

      {!!modalProduct && <Modal
        closeOnOverlayClick
        onClose={() => setModalProduct(false)}
        isOpen
        size="lg"
      >
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>{modalProduct.title}</Modal.Header>
          <Modal.Body>
            <ScrollView style={{ flex: 1 }}>
              <ProductCard product={modalProduct} />
            </ScrollView>
          </Modal.Body>
          <Modal.Footer>
            
                  {cartItems?.some((item) => item.id === modalProduct.id) && (
                    <>
                      <HStack m='auto' mt='3' >
                        <Text color="gray.500">Quantity: </Text>
                        <Text fontSize='lg' mt='-1' fontWeight='bold' color="amber.500">
                          {cartItems?.find((item) => item.id === modalProduct.id)?.quantityInCart}
                        </Text>
                      </HStack>
                    </> )}
            
            <Button.Group space={2}>
              {actionsButtons(modalProduct)}
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>}
    </>
  );
};

export default ProductList;

// In real world this compononent would be in a dedicated file.
const ProductCard = ({ product, selectProduct, children }: { product: IProduct, children?: ReactNode, selectProduct?: (item: IProduct) => void }) => {
  const { title, image, price, category, rating, description } = product;
  const { cartItems } = useContext(UserContext);

  const isFromModal = !!!selectProduct;
  const mainContent = <>
    {isFromModal && <Box m='auto'>
      <Image source={{ uri: image }} height={200} width={200} style={{ margin: 'auto', justifyContent: 'space-around' }} />
    </Box>
    }
    <HStack justifyContent="space-between">
      {
        !isFromModal && <Avatar shadow='sm' size='2xl' bg="green.500" source={{
          uri: image
        }} />
      }
      <Box ml="2" style={{ flex: 1, }}>
        <Text color='gray.800' fontSize={isFromModal ? 'lg' : 'md'} style={isFromModal ? { textAlign: 'center', fontWeight: 'bold', marginTop: 10 } : {}}>{title}</Text>
        <HStack m='auto'>
          <Text mt={4} color="gray.500">$</Text>
          <Text color="red.400" fontWeight='bold' fontSize='3xl'>{price?.toFixed(2)}</Text>
        </HStack>
        <Divider mt='1' mb='1' />
        <HStack mt='1' >{createRateStars(rating?.rate)}</HStack>
        <HStack mt='1' >
          <Text color="gray.500">Rating: </Text>
          <Text fontSize='lg' mt='-1' fontWeight='bold' color="amber.500">{rating?.rate}</Text>
          <Text color="gray.400">/5 </Text>
          <Text color="gray.500">({rating?.count} reviews)</Text>
        </HStack>
        <Badge w='auto' mb='2' colorScheme="success">{category}</Badge>

      </Box>

    </HStack>
    <Text fontSize={isFromModal ? 'md' : 'xs'} mt='2'>{description}</Text>
    {cartItems?.some((item) => item.id === product.id) && (
      <>
        <Divider mt='3' />
        <HStack m='auto' mt='3' >
          <Text color="gray.500">Quantity: </Text>
          <Text fontSize='lg' mt='-1' fontWeight='bold' color="amber.500">
            {cartItems?.find((item) => item.id === product.id)?.quantityInCart}
          </Text>
        </HStack>
      </>
    )}
  </>

  if (isFromModal) return mainContent;
  return (
    <>
      <Box borderX="1px" bg='white' m='4' mt='2' mb='2' shadow='2' borderRadius="lg">
        <VStack space={2} p="5">
          <TouchableOpacity onPress={() => (selectProduct as unknown as (item: IProduct) => void)(product)}>
            {mainContent}
            <Divider mt='3' />
          </TouchableOpacity>
          <HStack space={2} m='auto' mt="5" >
            {children}
          </HStack>
        </VStack>
      </Box>
    </>
  );
}