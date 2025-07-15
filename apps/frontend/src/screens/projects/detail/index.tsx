import { useLocation } from "react-router";
import { Header, ProjectDetail } from "../../../components";
import type { Project } from "~repo-shared";
import { useGetProjectImages } from "../../../services/projects";
import { useMemo } from "react";

interface IProps {
  data: Project;
  imageData: Array<string>;
}

export default function Detail() {
  const { state } = useLocation();
  const { data } = state as IProps;

  const {data: dataImages} = useGetProjectImages(data.bucket)

  const images = useMemo(() => dataImages?.flatMap(item => `${import.meta.env.VITE_BASE_URL}/project-images${item.url}`), [dataImages])

  return (
    <>
      <Header />
      <ProjectDetail data={data} imageData={images ?? []} />
    </>
  );
}
