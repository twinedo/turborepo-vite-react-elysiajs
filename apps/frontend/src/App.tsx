import { useEffect, useState } from "react";
import type { ProfileProps } from "~repo-shared";
import {
  Footer,
  Header,
  Hero,
  HomeExperience,
  HomeProjects,
  Socmed,
  Stacks,
} from "./components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

type ModuleWithProfile = {
  username: string;
} & ProfileProps;

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.text())
      .then((response) => console.log(response));
  }, []);

  return (
    <div className="w-full overflow-x-hidden">
      <Header />
      <Hero />
      <Socmed />
      <HomeProjects />
      <HomeExperience />
      <Stacks />
      <Footer />
    </div>
  );
}

export default App;
