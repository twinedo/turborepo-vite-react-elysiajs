import { Header } from "../../components";

export default function CV() {
  return (
    <div>
      <Header />
      <div className="container mx-auto max-w-[1280px] mt-16">
        <h1 className="text-3xl font-bold mb-4">Curriculum Vitae</h1>
        <p className="text-gray-700">
          This is the CV page. You can add your CV details here.
        </p>
      </div>
    </div>
  );
}
