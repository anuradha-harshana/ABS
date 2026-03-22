"use client"

import { AuthProps } from "../types/user";
import { signOut } from "../lib/auth/auth-service";
import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar/Navbar";
import CustomerRegistrationForm from "../components/Forms/CustomerRegistrationForm";

const Dashboard = ({ user }: AuthProps) => {

  return (
    <div>
      <Navbar />
      <CustomerRegistrationForm />
    </div>
  );
};

export default Dashboard;
