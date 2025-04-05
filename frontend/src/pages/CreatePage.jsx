import { useProductStore } from '/src/store/product';
import { useColorModeValue } from '/src/components/ui/color-mode';
import { Button, Container, Input, VStack,Heading,Box,useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react'
import { Toaster,toaster } from '/src/components/ui/toaster';
import {Modal, ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton } from '@chakra-ui/modal';

const CreatePage = () => {
const [newProduct, setNewProduct] = useState({
  name: "",
  price: "",
  image: "",
});

const {open, onOpen, onClose} = useDisclosure();
const {createProduct} = useProductStore();

const handleAddProduct = async () => {
  const {success,message} = await createProduct(newProduct);
  if(!success){
    toaster.create({
      title: "Error",
      description: message,
      status: "error"
    })
  } else{
    toaster.create({
      title: "Success",
      description: message,
      action: {
        label: "OK",
        onClick: () => console.log("Undo"),
      },
    })
  }
  console.log("Success:", success, "Message:", message);
  setNewProduct({  name: "",
    price: "",
    image: "",
  })
};

  return (
    <div>
     <Container maxW={"container.sm"}>
      <VStack spacing={8}>
        <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
          Create New Product
        </Heading>
        <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
          <VStack spacing={4}>
            <Input 
            placeholder='Product Name'
            name='name'
            value={newProduct.name}
            onChange={(e)=> setNewProduct({...newProduct, name: e.target.value})}
            m={5} borderColor={useColorModeValue("gray.200","gray.500")}
            />

            <Input
             placeholder='Price'
             price='price'
             type='number'
             value={newProduct.price}
             onChange={(e)=> setNewProduct({...newProduct, price: e.target.value})}
             m={5} borderColor={useColorModeValue("gray.200","gray.500")}
            />
            <Input
             placeholder='Image URL'
             image ='image'
             value={newProduct.image}
             onChange={(e)=> setNewProduct({...newProduct, image: e.target.value})}
             m={5} borderColor={useColorModeValue("gray.200","gray.500")}
            />
            <Button onClick={handleAddProduct} w={"full"}>Add Product</Button>
            <Toaster/>
          </VStack>
        </Box>
      </VStack>
      </Container> 
      <Button onClick={onOpen}>ok</Button>
      <Modal isOpen={open} onClose={onClose} w="300px" m={8} >
                <ModalOverlay w="30%"  borderColor={"gray.200"} />
      
                <ModalContent w="30%"  bg={useColorModeValue("gray.200","gray.500")}  borderColor={"gray.200"}>
                  <ModalHeader>Update Product</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                    <VStack spacing={4}>
                        <Input 
                                    placeholder='Product Name'
                                    name='name'
                                    />
                        
                                    <Input
                                     placeholder='Price'
                                     price='price'
                                     type='number'
                                    />
      
                                    <Input
                                     placeholder='Image URL'
                                     image ='image'
                                    />
                    </VStack>
                  </ModalBody>
      
                  <ModalFooter>
                    <Button colorScheme='blue' mr={3}>
                      Update
                    </Button>
                    <Button variant='ghost' onClick={onClose}>
                      Cancel
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
    </div>
  )
}

export default CreatePage
