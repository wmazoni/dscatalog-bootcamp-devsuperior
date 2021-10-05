import React from 'react'

import { View, Text, ImageSourcePropType, TouchableOpacity, Image } from 'react-native'
import { useNavigation } from '@react-navigation/core'
import { text, theme } from '../styles'

interface ProductProps {
    id: Number;
    name: String;
    imgUrl: ImageSourcePropType;
    price: Number;
}

const ProductCard: React.FC<ProductProps> = ({id, name, imgUrl, price}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity style={theme.ProductCard} onPress={() => navigation.navigate("ProductDetails", {id})}>
            <Image source={{uri: imgUrl}} style={theme.productImg} />
            <View style={theme.productDescription}>
                <Text style={text.productName}>{name}</Text>
                <View style={text.priceContainer}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productPrice}>{price}</Text>
                </View>
            </View>

        </TouchableOpacity>
    )
}

export default ProductCard