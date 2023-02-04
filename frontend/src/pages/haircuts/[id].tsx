import Head from "next/head";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
  Stack,
  Switch,
} from "@chakra-ui/react";

import { Sidebar } from "../../components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import Link from "next/link";
import api, { setupApiClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { ParsedUrlQuery } from "querystring";
import { ChangeEvent, useState } from "react";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription: SubscriptionProps | null;
}

// Essa rota é dinâmica, muda constantemente a depender do id
export default function EditHaircut({
  subscription,
  haircut,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState(haircut.name);
  const [price, setPrice] = useState(haircut.price);
  const [status, setStatus] = useState(haircut.status);
  const [disable, setDisable] = useState(
    haircut.status ? "disabled" : "enabled"
  );

  function handleDisable(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisable("enabled");
      setStatus(false);
    } else {
      setDisable("disabled");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name.length === 0 || price === "") return;
    await api.put("/haircut", {
      name,
      price: Number(price),
      status,
      haircut_id: haircut.id,
    });

    alert("Corte atualizado com sucesso!");
  }

  return (
    <>
      <Head>
        <title>Editando modelo de corte - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            direction={isMobile ? "column" : "row"}
            w="100%"
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                mr={3}
                p={4}
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="blackAlpha.600"
                color="white"
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>

            <Heading fontSize={isMobile ? "22px" : "3xl"} color="white">
              Editar corte
            </Heading>
          </Flex>

          <Flex
            mt={4}
            maxW="700px"
            pt={8}
            pb={8}
            w="100%"
            bg="barber.400"
            direction="column"
            align="center"
            justify="center"
          >
            <Heading fontSize={isMobile ? "22px" : "3xl"} mb={4} color="white">
              Editar corte
            </Heading>

            <Flex w="85%" direction="column">
              <Input
                placeholder="Nome do corte"
                bg="gray.900"
                mb={3}
                size="lg"
                type="text"
                w="100%"
                color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={subscription?.status !== "active"}
              />

              <Input
                placeholder="Valor do seu corte ex 45.90"
                bg="gray.900"
                mb={3}
                size="lg"
                type="number"
                w="100%"
                color="white"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                disabled={subscription?.status !== "active"}
              />

              <Stack mb={6} align="center" direction="row">
                <Text fontWeight="bold" color={status ? "white" : "red.400"}>
                  Desativar corte
                </Text>
                <Switch
                  size="lg"
                  colorScheme="red"
                  value={disable}
                  onChange={handleDisable}
                  isChecked={disable === "disabled" ? false : true}
                />
              </Stack>

              {subscription?.status !== "active" ? (
                <Flex direction="row" align="center" justify="center">
                  <Link href="/planos">
                    <Text
                      cursor="pointer"
                      fontWeight="bold"
                      mr={1}
                      color="#31fb6a"
                    >
                      Seja premium
                    </Text>
                  </Link>
                  <Text color="white">e tenha todos acessos liberados.</Text>
                </Flex>
              ) : (
                <Button
                  mb={6}
                  w="100%"
                  bg="button.cta"
                  color="gray.900"
                  type="button"
                  _hover={{ bg: "#FFB13e" }}
                  disabled={true}
                  onClick={handleUpdate}
                >
                  Salvar
                </Button>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params as ParsedUrlQuery;

  try {
    const apiClient = setupApiClient(ctx);

    const check = await apiClient.get("/haircut/check");
    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    console.log(check.data?.subscriptions);

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
