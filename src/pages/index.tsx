import Wrapper from "../components/Wrapper";
import type { Asset } from "contentful";

let image: Asset;

const Home = () => {
  return (
    <>
      <Wrapper
        title="Subaan Qasim | Medical Student & Developer"
        description="Medical Student, full stack developer, and wannabe data scientist. Posting projects, thoughts and unadulterated streams of consciousness."
        image={image}
        type="website"
      >
        <h1 className=" text-neutral-200">
          <span className="text-orange-500">Subaan</span> Qasim
        </h1>
      </Wrapper>
    </>
  );
};

export default Home;

// getStaticProps for banner image
