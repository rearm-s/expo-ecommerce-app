import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect } from 'react';
import { router, Stack, useLocalSearchParams } from "expo-router";
import axios from "axios";
import { ProductType } from "@/types/type";
import ImageSlider from "@/components/ImageSlider";
import { Ionicons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { useHeaderHeight } from "@react-navigation/elements";

type Props = {};

const ProductDetails = (props: Props) => {
  const { id, productType } = useLocalSearchParams();

  const [product, setProduct] = React.useState<ProductType>();


  const getProductDetails = async () => {
    const URL = `http://10.0.2.2:8000/${productType === "sale" ? "saleProducts" : "products"}/${id}`;
    const response = await axios(URL);

    setProduct(response.data)
  }

  useEffect(() => {
    getProductDetails()
  }, [])

  const headerHeight = useHeaderHeight();


  return (
    <>
      <Stack.Screen options={{
        title: 'Product Details', headerTransparent: true, headerLeft: () => (
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.black} />
          </TouchableOpacity>),
        headerRight: () => (
          <TouchableOpacity>
            <Ionicons name="cart-outline" size={24} color={Colors.black} />
          </TouchableOpacity>
        ),
      }}
      />
      <ScrollView style={{ marginTop: headerHeight, marginBottom: 90 }}>
        {product && (
          <>
            <ImageSlider imageList={product.images} />
            <View style={styles.container}>
              <View style={styles.ratingWrapper}>
                <View style={styles.ratingWrapper}>
                  <Ionicons name="star" size={18} color="#D4AF37" />
                  <Text style={styles.rating}>4.7 <Text>(136)</Text></Text>
                </View>
                <TouchableOpacity>
                  <Ionicons name="heart-outline" size={20} color={Colors.black} />
                </TouchableOpacity>
              </View>

              <Text style={styles.title}>{product.title}</Text>

              <View style={styles.priceWrapper}>
                <Text style={styles.price}>${product.price}</Text>
                <View style={styles.priceDiscount}><Text style={styles.priceDiscountTxt}>6% Off</Text></View>
                <Text style={styles.oldPrice}>${product.price + 2}</Text>
              </View>

              <Text style={styles.description}>{product.description}</Text>

              <View style={styles.productVariationWrapper}>
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Color</Text>
                  <View style={styles.productVariationValueWrapper}>
                    <View style={{ borderColor: Colors.primary, borderWidth: 1, borderRadius: 100, padding: 2 }}>
                      <View style={[styles.productVariationColorValue, { backgroundColor: '#D4AF37' }]}></View>
                    </View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#333' }]}></View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#8bc34f' }]}></View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#2196f3' }]}></View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#f44336' }]}></View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#9c27b0' }]}></View>
                    <View style={[styles.productVariationColorValue, { backgroundColor: '#9c27b0' }]}></View>
                  </View>
                </View>
                <View style={styles.productVariationType}>
                  <Text style={styles.productVariationTitle}>Size</Text>
                  <View style={styles.productVariationValueWrapper}>
                    <View style={[styles.productVariationSizeValue, { borderColor: Colors.primary }]}>
                      <Text style={[styles.productVariationSizeValueText, {
                        color: Colors.primary,
                        fontWeight: 'bold'
                      }]}>S</Text>
                    </View>
                    <View style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>M</Text>
                    </View>
                    <View style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>L</Text>
                    </View>
                    <View style={styles.productVariationSizeValue}>
                      <Text style={styles.productVariationSizeValueText}>XL</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <TouchableOpacity style={[styles.button, {
          backgroundColor: Colors.white,
          borderColor: Colors.primary,
          borderWidth: 1
        }]}>
          <Ionicons name="cart-outline" size={20} color={Colors.primary} />
          <Text style={[styles.buttonText, { color: Colors.primary }]}>Add to Cart</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  ratingWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: "space-between",
    marginBottom: 5,
  },
  rating: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '400',
    color: Colors.gray,
  },
  title: {
    fontSize: 20,
    fontWeight: '400',
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 32,
  },
  priceWrapper: {
    flexDirection: "row",
    alignItems: 'center',
    marginTop: 10,
    gap: 5,
  },
  price: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.black,
  },
  priceDiscount: {
    backgroundColor: Colors.extraLightGray,
    padding: 5,
    borderRadius: 5,
  },
  priceDiscountTxt: {
    fontSize: 14,
    fontWeight: '400',
    color: Colors.primary,
  },
  oldPrice: {
    fontSize: 14,
    fontWeight: '400',
    textDecorationLine: 'line-through',
    color: Colors.gray,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
    color: Colors.black,
    letterSpacing: 0.6,
    lineHeight: 24,
  },
  productVariationWrapper: {
    flexDirection: 'row',
    marginTop: 10,
    flexWrap: 'wrap'
  },
  productVariationType: {
    width: '50%',
    gap: 5,
    marginBottom: 10,
  },
  productVariationTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.black,
  },
  productVariationValueWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    flexWrap: 'wrap',
  },
  productVariationColorValue: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: Colors.extraLightGray,
  },
  productVariationSizeValue: {
    width: 50,
    height: 30,
    borderRadius: 5,
    backgroundColor: Colors.extraLightGray,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightGray,

    borderWidth: 1,
  },
  productVariationSizeValueText: {
    fontSize: 12,
    fontWeight: '500',
    color: Colors.black,
  },
  buttonWrapper: {
    position: 'absolute',
    height: 90,
    padding: 20,
    bottom: 0,
    width: '100%',
    backgroundColor: Colors.white,
    flexDirection: 'row',
    gap: 10,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    gap: 5,
    elevation: 5,
    shadowColor: Colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
});
