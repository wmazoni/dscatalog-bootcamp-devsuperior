import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { theme } from '../../styles';
import TabBar from '../../components/TabBar';
import Products from './Products';
import Categories from './Categories';
import Users from './Users';

const Dashboard: React.FC = () => {
    const [screen, setScreen] = useState("products")
    return (
        <View>
            <TabBar screen={screen} setScreen={setScreen} />
            {screen === "products" && <Products />}
            {screen === "categories" && <Categories />}
            {screen === "users" && <Users />}
        </View>
    )
}

export default Dashboard;