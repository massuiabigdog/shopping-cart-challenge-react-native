import React, { useState, useContext } from "react";
import { FlatList, TouchableOpacity, ScrollView } from "react-native";
import { Modal, Box, Button, Text, Badge, VStack, HStack, Divider, Avatar } from "native-base";

import { IProduct, UserContext } from "../context";
import { createRateStars } from "../utils";

const ProductList = (props: {
  providedList: IProduct[] | undefined;
}) => {
  const { handleFavorites } = useContext(UserContext);
  const [modalProduct, setModalProduct] = useState(false as any);

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
          <ProductCard selectProduct={(product: IProduct) => setModalProduct(product)} product={item} />
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
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={() => {
              }}>
                Cancel
              </Button>
              <Button onPress={() => {
              }}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>}
    </>
  );
};

export default ProductList;


const ProductCard = ({ product, selectProduct }: { product: IProduct, selectProduct?: (item: IProduct) => void }) => {
  const { title, image, price, category, rating, description } = product;

  const isFromModal = !!selectProduct;

  const mainContent = <>
    <HStack justifyContent="space-between">
      <Avatar size='2xl' bg="green.500" source={{
        uri: image
      }} />
      <Box ml="2" style={{ flex: 1, }}>
        <Text color='gray.800' fontSize='md'>{title}</Text>
        <HStack m='auto'>
          <Text mt={4} color="gray.500">$</Text>
          <Text color="red.400" fontWeight='bold' fontSize='3xl'>{price?.toFixed(2)}</Text>
        </HStack>
        <Badge w='auto' mb='2' colorScheme="success">{category}</Badge>
        <HStack mt='1' >
          <Text color="gray.500">Rating: </Text>
          <Text fontSize='lg' mt='-1' fontWeight='bold' color="amber.500">{rating?.rate}</Text>
          <Text color="gray.400">/5 </Text>
          <Text color="gray.500">({rating?.count} reviews)</Text>
        </HStack>
        <HStack mt='1' >{createRateStars(rating?.rate)}</HStack>
      </Box>
    </HStack>
    <Text fontSize='xs' mt='2'>{description}</Text>
    <Divider mt='3' /></>
  return (
    <>
      <Box borderX="1px" bg='white' m='4' mt='2' mb='2' shadow='2' borderRadius="lg">
        <VStack space={2} p="5">
          <TouchableOpacity onPress={() => selectProduct(product)}>
            {mainContent}
          </TouchableOpacity>
          <HStack space={2} m='auto' mt="5" >
            <Button variant='outline' colorScheme="red" onPress={() => console.log('Remove from cart')}>
              Remove from Cart
            </Button>
            <Button colorScheme='purple' fontWeight='bold' onPress={() => console.log('Add to cart')}>
              <Text fontWeight='bold' color='white' >Add to Cart</Text>
            </Button>
          </HStack>
        </VStack>
      </Box>
    </>
  );
}