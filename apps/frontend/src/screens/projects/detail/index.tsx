import { useLocation } from "react-router";
import { Header, ProjectDetail } from "../../../components";
import type { IProject } from "~repo-shared";

interface IProps {
  data: IProject;
  imageData: Array<string>;
}

export default function Detail() {
  const { state } = useLocation();
  const { data, imageData } = state as IProps;

  return (
    <>
      <Header />
      <ProjectDetail data={data} imageData={imageData} />
    </>
  );
}
