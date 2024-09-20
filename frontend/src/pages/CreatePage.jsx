import React, { useState } from 'react';

// Component
import {
  Box,
  Button,
  Container,
  Heading,
  Input,
  useColorModeValue,
  useToast,
  VStack,
} from '@chakra-ui/react';

// Store
import useProductStore from '../store/product.js';

function CreatePage() {
  const { createProduct } = useProductStore();
  const toast = useToast();

  // State
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    image: '',
  });

  // Actions
  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
      });
    }
  };

  return (
    <Container maxW="container.sm">
      <VStack spacing={0}>
        <Heading as="h1" size="2xl" textAlign="center" mt={6} mb={4}>
          Create New Product
        </Heading>

        <Box
          w="full"
          bg={useColorModeValue('white', 'gray.800')}
          p={6}
          rounded="lg"
          shadow="md"
        >
          <VStack spacing={4}>
            <Input
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />

            <Input
              placeholder="Price"
              name="price"
              type="number"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />

            <Input
              placeholder="Image URL"
              name="image"
              value={newProduct.image}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />

            <Button colorScheme="blue" onClick={handleAddProduct} w="full">
              Add Product
            </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  );
}

export default CreatePage;
