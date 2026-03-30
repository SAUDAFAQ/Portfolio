import type { MouseEvent } from "react";
import { smoother } from "../components/Navbar";

export function scrollToSection(
  selector: string,
  e?: MouseEvent<HTMLElement>
) {
  e?.preventDefault();
  if (window.innerWidth > 1024 && smoother) {
    smoother.scrollTo(selector, true, "top top");
  } else {
    document.querySelector(selector)?.scrollIntoView({ behavior: "smooth" });
  }
}
