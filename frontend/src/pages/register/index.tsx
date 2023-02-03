import Head from "next/head";
import { Button, Center, Flex, Input, Text } from "@chakra-ui/react";
import Image from "next/image";
import image from "../../../public/logo.svg";
import Link from "next/link";
import { useContext, useState } from "react";
import { AuthContext } from "@/context/Auth";

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister() {
    if (email.length > 3 || password.length > 3 || name.length > 3)
      await signUp(name, email, password);
  }

  return (
    <>
      <Head>
        <title>BarberPro - Cria a sua conta</title>
      </Head>
      <Flex
        backgroundColor="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              src={image}
              alt="Logo Barber Pro"
              quality={100}
              width={240}
            />
          </Center>
          <Input
            background="barber.400"
            variant="filled"
            size="lg"
            placeholder="Nome da Barbearia"
            type="text"
            mb={3}
            color="white"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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
            onClick={handleRegister}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text color="#fff" _hover={{ color: "#686868" }}>
                Já possui uma conta? <strong>Faça login</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}
