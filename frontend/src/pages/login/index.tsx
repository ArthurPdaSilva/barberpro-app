import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import image from "../../../public/logo.svg";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/Auth";
import { canSSRGuest } from "@/utils/canSSRGuest";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin() {
    if (email.length > 3 || password.length > 3) await signIn(email, password);
  }

  return (
    <>
      <Head>
        <title>BarberPro - Faça login para acessar</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        {/* Flex-direction, p == padding, box-radius == rounded */}
        <Flex width={640} direction="column" p={14} rounded={8}>
          {/* Alinhar algum intem */}
          <Center p={4}>
            <Image
              src={image}
              alt="Logo Barber Pro"
              quality={100}
              width={240}
            />
          </Center>
          {/* MB == margin-bottom */}
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="email@email.com"
            type="email"
            mb={3}
            color="white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="*******"
            type="password"
            mb={6}
            color="white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {/* _hover: hover no css */}
          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text color="#fff" _hover={{ color: "#686868" }}>
                Ainda não possui uma conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
