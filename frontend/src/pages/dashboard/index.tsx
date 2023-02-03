import { AuthContext } from "@/context/Auth";
import React, { useContext } from "react";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);
  return (
    <div>
      Dashboard <button onClick={logoutUser}>Sair</button>
    </div>
  );
}
