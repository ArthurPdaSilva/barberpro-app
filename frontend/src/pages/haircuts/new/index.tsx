import Head from "next/head";
import { Sidebar } from "../../../components/sidebar";

import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  Input,
} from "@chakra-ui/react";

import Link from "next/link";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "@/utils/canSSRAuth";
import api, { setupApiClient } from "@/services/api";
import { useState } from "react";
import Router from "next/router";

interface HaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({ subscription, count }: HaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  async function handleRegister() {
    if (name.length === 0 || price.length === 0) return;
    try {
      console.log(name, price);
      await api.post("/haircut", { name, price: Number(price) });
      Router.push("/haircuts");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
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
            align={isMobile ? "flex-start" : "center"}
            mb={isMobile ? 4 : 0}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                display="flex"
                alignItems="center"
                justifyItems="center"
                mr={4}
                bg="blackAlpha.600"
                color="white"
              >
                <FiChevronLeft size={24} color="#FFF" />
                Voltar
              </Button>
            </Link>
            <Heading
              color="orange.900"
              mt={4}
              mb={4}
              mr={4}
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            bg="barber.400"
            w="100%"
            align="center"
            justify="center"
            pt={8}
            pb={8}
            direction="column"
          >
            <Heading mb={4} fontSize={isMobile ? "22px" : "3xl"} color="white">
              Cadastrar modelo
            </Heading>

            <Input
              placeholder="Nome do corte"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={3}
              color="white"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!subscription && count >= 3}
            />

            <Input
              placeholder="Valor do corte ex: 59.90"
              size="lg"
              type="text"
              w="85%"
              bg="gray.900"
              mb={4}
              color="white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              disabled={!subscription && count >= 3}
            />

            {(!subscription && count >= 3) || (
              <Button
                w="85%"
                size="lg"
                color="gray.900"
                mb={6}
                bg="button.cta"
                _hover={{ bg: "#FFb13e" }}
                onClick={handleRegister}
                disabled={!subscription && count >= 3}
              >
                Cadastrar
              </Button>
            )}

            {!subscription && count >= 3 && (
              <Flex direction="row" align="center" justifyContent="center">
                <Text color="white">Você atingiu seu limite de cortes!</Text>
                <Link href="/planos">
                  <Text
                    color="#31fb6a"
                    fontWeight="bold"
                    cursor="pointer"
                    ml={1}
                  >
                    Seja premium
                  </Text>
                </Link>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const response = await setupApiClient(ctx).get("/haircut/check");
    const count = await setupApiClient(ctx).get("/haircut/count");
    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
