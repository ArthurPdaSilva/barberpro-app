import { AuthContext } from "@/context/Auth";
import { canSSRAuth } from "@/utils/canSSRAuth";
import React, { useContext } from "react";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div>
      Dashboard <button onClick={logoutUser}>Sair</button>
    </div>
  );
}

// Executado no lado do servidor
export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});
