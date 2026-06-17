import { Routes, Route } from "react-router-dom";
import Layout from "~/components/Layout";
import Introduction from "~/pages/Introduction";
import Experience from "~/pages/Experience";
import Expertise from "~/pages/Expertise";
import Education from "~/pages/Education";
import FeaturedWork from "~/pages/FeaturedWork";
import Community from "~/pages/Community";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Introduction />} />
        <Route path="experience" element={<Experience />} />
        <Route path="expertise" element={<Expertise />} />
        <Route path="education" element={<Education />} />
        <Route path="featured-work" element={<FeaturedWork />} />
        <Route path="community" element={<Community />} />
      </Route>
    </Routes>
  );
}

export default App;
