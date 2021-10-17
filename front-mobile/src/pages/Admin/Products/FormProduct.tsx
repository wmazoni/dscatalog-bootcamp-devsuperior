import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Modal,
  TextInput,
  ActivityIndicator,
  Alert,
} from "react-native";
import arrow from "../../../assets/leftArrow.png";
import { getCategories } from "../../../services";
import { text, theme } from "../../../styles";

interface FormProductProps {
  setScreen: Function;
}

const FormProduct: React.FC<FormProductProps> = (props) => {
  const { setScreen } = props;
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  const [categories, setCategories] = useState([]);
  const [showCategories, setShowCategories] = useState(false);
  const [product, setProduct] = useState({
    name: "",
    description: "",
    imgUrl: "",
    price: 0,
    categories: [],
  });

  function handleSave() {
    !edit && newProduct();
  }

  async function newProduct() {
    setLoading(true);
    const cat = replaceCategory();
    const data = {
      ...product,
      categories: [
        {
          id: cat,
        },
      ],
    };
    console.warn(data);
  }

  function replaceCategory() {
    const cat = categories.find(
      (category) => category.name === product.categories
    );
    return cat.id;
  }

  async function loadCategories() {
    setLoading(true);
    const res = await getCategories();
    setCategories(res.data.content);
    setLoading(false);
  }

  useEffect(() => {
    loadCategories();
  }, []);
  return (
    <View style={theme.formContainer}>
      {loading ? (
        <ActivityIndicator size="large" />
      ) : (
        <View style={theme.formCard}>
          <ScrollView>
            <Modal
              visible={showCategories}
              animationType="fade"
              transparent={true}
              presentationStyle="overFullScreen"
            >
              <View style={theme.modalContainer}>
                <ScrollView contentContainerStyle={theme.modalContent}>
                  {categories.map((cat) => (
                    <TouchableOpacity
                      style={theme.modalItem}
                      key={cat.id}
                      onPress={() => {
                        setProduct({ ...product, categories: cat.name });
                        setShowCategories(!showCategories);
                      }}
                    >
                      <Text>{cat.name}</Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </Modal>
            <TouchableOpacity
              onPress={() => setScreen("products")}
              style={theme.goBackContainer}
            >
              <Image source={arrow} />
              <Text style={text.goBackText}>Voltar</Text>
            </TouchableOpacity>
            <TextInput placeholder="Nome do produto" style={theme.formInput} />
            <TouchableOpacity
              onPress={() => setShowCategories(!showCategories)}
              style={theme.selectInput}
              value={product.name}
              onChangeText={(e) => setProduct({ ...product, name: e })}
            >
              <Text>
                {product.categories.length === 0
                  ? "Escolha uma categoria"
                  : product.categories}
              </Text>
            </TouchableOpacity>
            <TextInput
              placeholder="Preço"
              style={theme.formInput}
              value={product.price}
              onChangeText={(e) =>
                setProduct({ ...product, price: parseInt(e) })
              }
            />
            <TouchableOpacity activeOpacity={0.8} style={theme.uploadBtn}>
              <Text style={text.uploadText}>Carregar imagem</Text>
            </TouchableOpacity>
            <Text style={text.fileSize}>
              As imagens devem ser JPG ou PNG e não devem ultrapassar 5 mb.
            </Text>
            <TextInput
              multiline
              placeholder="Descrição"
              style={theme.textArea}
              value={product.description}
              onChangeText={(e) => setProduct({ ...product, description: e })}
            />
            <View style={theme.buttonContainer}>
              <TouchableOpacity
                style={theme.deleteBtn}
                onPress={() => {
                  Alert.alert(
                    "Deseja cancelar?",
                    "Os dados inseridos não serão salvos",
                    [
                      {
                        text: "Voltar",
                        style: "cancel",
                      },
                      {
                        text: "Confirmar",
                        onPress: () => setScreen("products"),
                        style: "default",
                      },
                    ]
                  );
                }}
              >
                <Text style={text.deleteText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={theme.saveBtn}
                onPress={() => handleSave()}
              >
                <Text style={text.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default FormProduct;
