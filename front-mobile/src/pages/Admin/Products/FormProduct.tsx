import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
} from "react-native";
import arrow from "../../../assets/leftArrow.png";

const FormProduct = () => {
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([
    {
      id: 3,
      name: "Computadores",
    },
    {
      id: 2,
      name: "Periféricos",
    },
    {
      id: 1,
      name: "Notebooks",
    },
    {
      id: 4,
      name: "Celulares",
    },
    {
      id: 5,
      name: "Hardware",
    },
  ]);
  const [showCategories, setShowCategories] = useState(false);
  const [product, setProduct] = useState({
    name: null,
    description: null,
    price: null,
    categories: null,
  });
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View>
          <Modal
            visible={showCategories}
            animationType="fade"
            transparent={true}
            presentationStyle="overFullScreen"
          >
            <View>
              <ScrollView>
                {categories.map((cat) => (
                  <TouchableOpacity key={cat.id}>
                    <Text>{cat.name}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>
          <TouchableOpacity>
            <Image source={arrow} />
            <Text>Voltar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default FormProduct;
