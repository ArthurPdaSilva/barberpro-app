import { Sidebar } from "@/components/sidebar";
import { AuthContext } from "@/context/Auth";
import { canSSRAuth } from "@/utils/canSSRAuth";
import { Flex, Text } from "@chakra-ui/react";
import Head from "next/head";
import React, { useContext } from "react";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex>
          <Text>Bem vindo</Text>
        </Flex>
      </Sidebar>
    </>
  );
}

// Executado no lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
