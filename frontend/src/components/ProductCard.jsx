import React from 'react';

// Components
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Text,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import EditProductModal from './EditProductModal.jsx';

// Store
import useProductStore from '../store/product.js';

function ProductCard({ product }) {
  // Theme
  const textColor = useColorModeValue('gray.500', 'gray.200');
  const bgColor = useColorModeValue('white', 'gray.800');
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { deleteProduct } = useProductStore();

  const handleDeleteProduct = async (productId) => {
    const { success, message } = await deleteProduct(productId);

    if (!success) {
      toast({
        title: 'Error',
        description: message,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: 'Success',
        description: message,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box
      bg={bgColor}
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        <Heading as="h5" size="md" mb={2}>
          {product.name}
        </Heading>

        <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
          {product.price}
        </Text>

        <HStack spacing={2}>
          <IconButton icon={<EditIcon />} colorScheme="blue" onClick={onOpen} />
          <IconButton
            icon={<DeleteIcon />}
            colorScheme="red"
            onClick={() => handleDeleteProduct(product._id)}
          />
        </HStack>
      </Box>

      <EditProductModal product={product} isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default ProductCard;
