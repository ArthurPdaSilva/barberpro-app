import { ChangeEvent, useState } from "react";

import Head from "next/head";
import { Sidebar } from "../../components/sidebar";
import {
  Flex,
  Text,
  Heading,
  Button,
  Stack,
  Switch,
  useMediaQuery,
} from "@chakra-ui/react";

import Link from "next/link";

import { IoMdPricetag } from "react-icons/io";
import { canSSRAuth } from "../../utils/canSSRAuth";
import api, { setupApiClient } from "@/services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(
    haircuts || []
  );
  const [disable, setDisable] = useState("enabled");

  async function handleDisable(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisable("enabled");
      const response = await api.get("haircuts", {
        params: {
          status: true,
        },
      });
      setHaircutList(response.data);
    } else {
      setDisable("disabled");
      const response = await api.get("haircuts", {
        params: {
          status: false,
        },
      });
      setHaircutList(response.data);
    }
  }

  return (
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
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
            mb={0}
          >
            <Heading
              fontSize={isMobile ? "28px" : "3xl"}
              mt={4}
              mb={4}
              mr={4}
              color="orange.900"
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button bg="blackAlpha.600" color="white">
                Cadastrar novo
              </Button>
            </Link>

            <Stack ml="auto" align="center" direction="row">
              <Text fontWeight="bold" color="white">
                ATIVOS
              </Text>
              <Switch
                colorScheme="green"
                size="lg"
                value={disable}
                onChange={handleDisable}
                isChecked={disable === "disabled" ? false : true}
              />
            </Stack>
          </Flex>

          {haircutList.map((haircut) => (
            <Link
              key={haircut.id}
              href={`/haircuts/${haircut.id}`}
              style={{ width: "100%" }}
            >
              <Flex
                cursor="pointer"
                w="100%"
                p={4}
                bg="barber.400"
                direction={isMobile ? "column" : "row"}
                align={isMobile ? "flex-start" : "center"}
                rounded="4"
                mb={2}
                justifyContent="space-between"
              >
                <Flex
                  mb={isMobile ? 2 : 0}
                  direction="row"
                  alignItems="center"
                  justifyContent="center"
                >
                  <IoMdPricetag size={28} color="#fba931" />
                  <Text fontWeight="bold" ml={4} noOfLines={2} color="white">
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  Preço: R${" "}
                  {haircut.price.toLocaleString("pt-br", {
                    minimumFractionDigits: 2,
                  })}
                </Text>
              </Flex>
            </Link>
          ))}
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
