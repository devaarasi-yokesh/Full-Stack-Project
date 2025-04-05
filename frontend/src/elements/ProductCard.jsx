import { useProductStore } from '/src/store/product';
import { useColorModeValue } from '/src/components/ui/color-mode';
import { Box, Button, Heading, HStack, Image, Text, useDisclosure, VStack, Input } from '@chakra-ui/react'
import {Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton } from '@chakra-ui/modal';

import { Toaster,toaster } from '/src/components/ui/toaster';
import React from 'react'
import { useState } from 'react';

import { FaRegEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

const ProductCard = ({product}) => {

const [updatedProduct, setUpdatedProduct] = useState(product);

const textColor = useColorModeValue("gray.600","gray.200");
const bg = useColorModeValue("white","gray.800");


const {updateProduct, deleteProduct} = useProductStore();
const {open, onOpen, onClose} = useDisclosure();

//Update button in modal
const handleUpdateProduct = async (pid,updatedProduct) => {
  const {success, message} = await updateProduct(pid,updatedProduct);
  onClose();
  if(!success){
    toaster.create(
      {
        title: "Error",
        description: message,
      }
    );
  } else{
    toaster.create(
      {
        title: "Success",
        description: "Product updated successfully",
      }
    )
  }
}

//Delete button in Product
const handleDeleteProduct = async (pid) => {
const { success, message} = await deleteProduct(pid);
if(!success){
  toaster.create(
    {
      title: "Error",
      description: message,
    }
  );
} else{
  toaster.create(
    {
      title: "Success",
      description: message,
    }
  )
}
}


  return (
    <Box
    shadow='lg' rounded='lg' overflow='hidden' transition='all 0.3s' _hover = {{ transform: "translateY(-5px)", shadow:"xl"}} bg={bg} m={6}>
        <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
            <Heading as='h3' size='md' mb={2} textTransform={"uppercase"}>
                {product.name}
            </Heading>

            <Text fontWeight={"bold"} fontSize='xl' color={textColor} mb={4}>
                ${product.price}
            </Text>
            <Toaster />
            <HStack spacing={4}>
               <Button bg={'blue.400'} onClick={()=> { console.log("button clicked"); onOpen()}}> <FaRegEdit size={20}/> </Button> 
               <Button bg={'red.400'} onClick={() => handleDeleteProduct(product._id)}>  <MdDeleteForever size={20}/> </Button>   
            </HStack>
        </Box>
        
        <Modal isOpen={open} onClose={onClose}  motionPreset="slideInBottom" variant={"unstyled"}>
          <ModalOverlay />

          <ModalContent size={"md"} h="20%" w="30%" mt="10%" ml="30%" bg={"gray"} p="2%">
            <ModalHeader mb={4}>Update Product</ModalHeader>
            <ModalBody mt={9}>
              <VStack >
                              <Input  
                              placeholder='Product Name' 
                              name='name' 
                              value={updatedProduct.name}  
                              onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}/>
                  
                              <Input
                               placeholder='Price'
                               price='price'
                               type='number'
                               value={updatedProduct.price} onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                              />

                              <Input
                               placeholder='Image URL'
                               image ='image'
                               value={updatedProduct.image}
                               onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                              />
              </VStack>
            </ModalBody>

            <ModalFooter mt={12}>
              <Button colorScheme='blue' mr={3} onClick={()=> handleUpdateProduct(product._id, updatedProduct)}>
                Update
              </Button>
              <Button variant='ghost' onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

    </Box>
  )
}

export default ProductCard;
