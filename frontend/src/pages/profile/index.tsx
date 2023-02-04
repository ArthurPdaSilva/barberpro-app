import Head from "next/head";
import { Flex, Text, Heading, Box, Input, Button } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";

import Link from "next/link";
import { canSSRAuth } from "@/utils/canSSRAuth";
import api, { setupApiClient } from "@/services/api";
import { AuthContext, UserProps } from "@/context/Auth";
import { useContext, useState } from "react";

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);
  const [name, setName] = useState(user && user.name);
  const [address, setAdress] = useState(user.address ?? "");

  async function handleProfile() {
    if (name.length === 0) {
      return;
    }
    try {
      await api.put("users", {
        name,
        address,
      });
      alert("Dados atualizados com sucesso!");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            w="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            pt={8}
            pb={8}
            background="barber.400"
            maxW="700px"
            w="100%"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da barbearia:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Nome da sua barbearia"
                size="lg"
                type="text"
                mb={3}
                color="white"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço:
              </Text>
              <Input
                w="100%"
                background="gray.900"
                placeholder="Endereço da barbearia"
                size="lg"
                type="text"
                mb={3}
                color="white"
                value={address}
                onChange={(e) => setAdress(e.target.value)}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Plano atual:
              </Text>

              <Flex
                direction="row"
                w="100%"
                mb={3}
                p={1}
                borderWidth={1}
                rounded={6}
                background="barber.900"
                alignItems="center"
                justifyContent="space-between"
              >
                <Text
                  p={2}
                  fontSize="lg"
                  color={premium ? "#FBA931" : "#4DFFB4"}
                  fontWeight="bold"
                >
                  Plano {premium ? "Premium" : "Grátis"}
                </Text>

                <Link href="/planos">
                  <Box
                    cursor="pointer"
                    p={1}
                    pl={2}
                    pr={2}
                    background="#00cd52"
                    rounded={4}
                    color="white"
                    fontWeight="bold"
                  >
                    Mudar plano
                  </Box>
                </Link>
              </Flex>

              <Button
                w="100%"
                mt={3}
                mb={4}
                bg="button.cta"
                size="lg"
                _hover={{ bg: "#ffb13e" }}
                onClick={handleProfile}
              >
                Salvar
              </Button>

              <Button
                w="100%"
                mb={6}
                bg="transparent"
                borderWidth={2}
                borderColor="red.500"
                color="red.500"
                size="lg"
                _hover={{ bg: "transparent" }}
                onClick={async () => await logoutUser()}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const response = await setupApiClient(ctx).get("me");
    return {
      props: {
        user: {
          id: response.data.id,
          name: response.data.name,
          email: response.data.email,
          address: response.data.address,
        },
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
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
