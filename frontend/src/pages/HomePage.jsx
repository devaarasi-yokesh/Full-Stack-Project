import { useProductStore } from '/src/store/product'
import { Container, VStack, Text, SimpleGrid } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ProductCard from '/src/elements/ProductCard'

const HomePage = () => {
  const {fetchProducts,products} = useProductStore();

useEffect(() =>{
  fetchProducts();
},[fetchProducts]);
console.log(products)

  return (
    
     <Container maxW='container.xl' py={12}>
        <VStack spacing={8}>
          <Text textAlign={"center"} bgGradient={"linear(to-r, cyan.400, blue.500)"} bgclip={"text"} fontSize="2xl" fontWeight={"bold"}>
            Current Products
          </Text>

          <SimpleGrid columns={{base:1,  md:2, lg:3}} spacing={10} w={"full"} m={4}>
            {products.map((product) => {
             return <ProductCard key={product._id} product={product} />
            })}
          </SimpleGrid>
            {products.length === 0 && <Text fontSize="xl" fontWeight={"bold"} textAlign={"center"} color='gray.500'>
            No products found!&nbsp;&nbsp;
            <Link to={"/create"}>
            <Text as="span" color='blue.500' _hover={{ textDecoration: "underline"}}>
              Create a product
            </Text>
            </Link>
          </Text >}
          
        </VStack>
     </Container>
   
  )
}

export default HomePage
