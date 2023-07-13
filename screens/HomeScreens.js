import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, ShoppingCartIcon } from "react-native-heroicons/solid";
import { themeColors } from "../theme";
import { featuredFruits, categories } from '../constants';
import FruitCard from '../components/FruitCard';
import FruitCardSales from '../components/FruitCardSales';
import { useNavigation } from '@react-navigation/native';
export default function HomeScreen() {
    const [activeCategory, setActiveCategory] = useState('Oranges');
    const navigation = useNavigation();
    return (
        <SafeAreaView className='flex-1 bg-orange-50 mb-4'>
            <ScrollView showsVerticalScrollIndicator={false}>
            {/* Top view */}
            <View className='mx-5  flex-row justify-between items-center'>
                <Bars3CenterLeftIcon size="30" color="black" />
                    <TouchableOpacity
                         onPress={()=>navigation.navigate('Cart')}
                        className='p-2 rounded-xl bg-orange-100'>
                    <ShoppingCartIcon size='25' color='orange' />
                </TouchableOpacity>
            </View>

            {/* Categories */}

            <View className='mt-4'>
                <Text style={{ color: themeColors.text }} className='ml-5 text-2xl tracking-widest font-medium'>
                    Seasonal
                </Text>
                <Text style={{ color: themeColors.text }} className='ml-5 text-3xl tracking-widest font-semibold'>
                    Fruits and Vegetables
                </Text>

                <ScrollView horizontal className='mt-8 px-5' showsHorizontalScrollIndicator={false}>
                    {categories.map((category, index) => {
                        let isActive = category == activeCategory;
                        let textClass = `text-xl ${isActive ? 'font-bold' : ""}`;
                        return (<TouchableOpacity
                            key={index}
                            onPress={() => setActiveCategory(category)}
                            className='mr-8 relative '
                        >
                            <Text style={{ color: themeColors.text }} className={textClass}>{category}</Text>
                            {
                                isActive ?
                                    <Text className='font-extrabold text-orange-400 -mt-3 ml-2'>__ _</Text>
                                    :null
                            }
                        </TouchableOpacity>)
                    })}
                </ScrollView>
            </View>

            {/* Fruit carousel */}

            <View className='mt-8'>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                    {
                        featuredFruits?.map((fruit, index) => <FruitCard key={index} fruit={fruit}  />)
                    }
                </ScrollView>
            </View>

            {/* Hot Sales */}

            <View className='mt-8 pl-5 space-y-1'>
                <Text style={{ color: themeColors.text }} className='text-xl font-bold'>
                    Hot Sales
                </Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{overflow:'visible'}}>
                    {
                        [...featuredFruits].reverse().map((fruit, index) => <FruitCardSales fruit={fruit} key={index} />)
}
                </ScrollView>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}