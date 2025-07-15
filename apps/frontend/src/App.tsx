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

function App() {

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
