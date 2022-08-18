import { atom } from "jotai";
import Cookies from "js-cookie";

export const logged = atom(Cookies.get("token"));
