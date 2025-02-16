import logoDark from "./logo-dark.svg";
import logoLight from "./logo-light.svg";
import {useEffect} from "react";
import {useNavigate} from "react-router-dom";

export function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate('/homepage');
  }, []);
  return (
    <div></div>
  );
}
