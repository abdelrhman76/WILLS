import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SearchBar from "@/components/SearchBar";
import FeaturedCategories from "@/components/FeaturedCategories";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero/>
      <SearchBar/>
      <section id="projects">
  <FeaturedCategories />
</section>

    </main>
  );
}