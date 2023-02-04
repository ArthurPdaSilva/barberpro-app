import { useState, ChangeEvent } from "react";
import Head from "next/head";
import { Sidebar } from "../../components/sidebar";

import { Flex, Heading, Button, Input, Select } from "@chakra-ui/react";
import api, { setupApiClient } from "@/services/api";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { useRouter } from "next/router";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);
  const router = useRouter();

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem as HaircutProps);
  }

  async function handleRegister() {
    if (customer === "") return;
    try {
      await api.post("/schedule", {
        customer: customer,
        haircut_id: haircutSelected?.id,
      });

      router.push("/dashboard");
      alert("Cadastro com sucesso");
    } catch (err) {
      console.log(err);
      alert("Erro ao registrar!");
    }
  }

  return (
    <>
      <Head>
        <title>BarberPro - Novo agendamento</title>
      </Head>
      <Sidebar>
        <Flex direction="column" align="flex-start" justify="flex-start">
          <Flex direction="row" w="100%" align="center" justify="flex-start">
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="white">
              Novo corte
            </Heading>
          </Flex>

          <Flex
            maxW="700px"
            pt={8}
            pb={8}
            width="100%"
            direction="column"
            align="center"
            justify="center"
            bg="barber.400"
          >
            <Input
              placeholder="Nome do cliente"
              w="85%"
              mb={3}
              size="lg"
              type="text"
              bg="barber.900"
              color="white"
              value={customer}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />

            <Select
              bg="barber.900"
              color="orange.900"
              mb={6}
              size="lg"
              w="85%"
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              {haircuts?.map((item) => (
                <option key={item?.id} value={item?.id}>
                  {item?.name}
                </option>
              ))}
            </Select>

            <Button
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#FFb13e" }}
              onClick={handleRegister}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const response = await setupApiClient(ctx).get("/haircuts", {
      params: {
        status: true,
      },
    });

    console.log(response.data);

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
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
