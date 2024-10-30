import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function LocationSettings({ data }) {
  return (
    <div class="main-container">
      <Navbar location={data} authenticated={window.sessionStorage.getItem("authorizationLevel")} />
      <h1>{data.name} Home</h1>
      <Footer location={data} />
    </div>
  );
}
