import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Home() {
  return (
    <>
      <Head>
        <title>BarberPro - Seu sistema completo</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text color="white" fontSize={30}>
          Página Home
        </Text>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
