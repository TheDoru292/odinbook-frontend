import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/authSlice";

export default function SignOut() {
  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.removeItem("token");

    dispatch(logout());

    router.push("/login");
  }, []);

  return <></>;
}
