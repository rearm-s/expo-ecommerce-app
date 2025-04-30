import React, { useEffect, useState } from 'react'
import { ActivityIndicator, Image, ScrollView, View } from 'react-native'
import axios from "axios";
import { CategoryType, ProductType } from "@/types/type";
import { Stack } from 'expo-router';
import Header from "@/components/Header";
import ProductList from "@/components/ProductList";
import Categories from "@/components/Categories";
import FlashSale from "@/components/FlashSale";

type Props = {}

const HomeScreen = (props: Props) => {
  const [products, setProducts] = useState<ProductType[]>([]);
  const [saleProducts, setSaleProducts] = useState<ProductType[]>([]);
  const [categories, setCategories] = useState<CategoryType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);


  const getProducts = async () => {
    const URL = `http://10.0.2.2:8000/products`;
    const response = await axios.get(URL);

    setProducts(response.data);
    setIsLoading(false);
  }

  const getCategories = async () => {
    const URL = `http://10.0.2.2:8000/categories`;
    const response = await axios.get(URL);

    setCategories(response.data);
    setIsLoading(false);
  }

  const getSaleProducts = async () => {
    const URL = `http://10.0.2.2:8000/saleProducts`;
    const response = await axios.get(URL);

    setSaleProducts(response.data);
    setIsLoading(false);
  }

  useEffect(() => {
    getProducts();
    getCategories();
    getSaleProducts();
  }, [])


  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={'large'} />
      </View>
    )
  }
  return (
    <>
      <Stack.Screen options={{ headerShown: true, header: () => <Header /> }} />
      <ScrollView>
        <Categories categories={categories} />
        <FlashSale products={saleProducts} />
        <View style={{ marginHorizontal: 20, marginBottom: 10, }}>
          <Image source={require('@/assets/images/sale-banner.jpg')}
            style={{ width: '100%', height: 150, borderRadius: 15 }} />
        </View>
        <ProductList products={products} flatList={false} />
      </ScrollView>
    </>
  )
}

export default HomeScreen
