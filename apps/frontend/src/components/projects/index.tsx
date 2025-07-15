import { useState } from "react";
import { AiOutlineMobile } from "react-icons/ai";
import { TbWorld } from "react-icons/tb";
// import { getDataFromAPI } from 'services/handler/handlerAPI';
// import lodash from 'lodash';
import { useLocation, useNavigate } from "react-router";
// import { useRouter } from '';
import { Section } from "../section";
import type { Project } from "~repo-shared";
import { useGetProjects } from "../../services/projects";

export function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedTab, setSelectedTab] = useState<"mobile" | "website">(
    location.state?.platform ?? "mobile"
  );

  const { data: dataList } = useGetProjects(selectedTab);

  const onNavigate = (data: Project) => {
    navigate("/projects/detail", { state: { data } });
  };

  return (
    <div>
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col space-y-5">
            <h1 className="text-center font-bold text-4xl">Projects</h1>

            {/* Tab Selector */}
            <div className="w-3/4 self-center rounded shadow-[0_7px_29px_0_rgba(100,100,111,0.2)]">
              <div className="flex flex-row items-center relative justify-around">
                {/* Mobile Tab */}
                <div
                  className={`
                    flex-1 flex flex-row items-center justify-center 
                    rounded-tl rounded-bl cursor-pointer h-10 font-semibold
                    ${selectedTab === "mobile" ? "bg-blue-900/30 text-black" : "bg-gray-200"}
                  `}
                  onClick={() => setSelectedTab("mobile")}
                >
                  <AiOutlineMobile
                    className={
                      selectedTab === "mobile" ? "text-black" : "text-gray-500"
                    }
                  />
                  <span
                    className={`hidden md:flex ml-2 ${selectedTab === "mobile" ? "text-black" : "text-gray-500"}`}
                  >
                    Mobile Application
                  </span>
                </div>

                {/* Divider */}
                <div className="w-px h-7 bg-blue-200"></div>

                {/* Web Tab */}
                <div
                  className={`
                    flex-1 flex flex-row items-center justify-center 
                    rounded-tr rounded-br cursor-pointer h-10
                    ${selectedTab === "website" ? "bg-blue-900/30 text-black" : "bg-gray-200"}
                  `}
                  onClick={() => setSelectedTab("website")}
                >
                  <TbWorld
                    className={
                      selectedTab === "website" ? "text-black" : "text-gray-500"
                    }
                  />
                  <span
                    className={`hidden md:flex ml-2 ${selectedTab === "website" ? "text-black" : "text-gray-500"}`}
                  >
                    Web Application
                  </span>
                </div>
              </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {dataList?.map((o: Project) => (
                <div
                  key={o.id}
                  className="px-2.5 py-5"
                  onClick={() => onNavigate(o)}
                >
                  <div className="flex flex-col space-y-3 rounded-lg bg-[#1e3f66] cursor-pointer hover:shadow-[0_2px_8px_0_rgba(0,0,0,0.8)] transition-shadow">
                    <div className="w-full h-[100px]">
                      <img
                        src={o.display}
                        alt="image"
                        className="object-cover object-center w-full h-full overflow-hidden rounded-t-lg"
                      />
                    </div>
                    <div className="pt-1 pb-2.5 px-2.5">
                      <div className="flex flex-col space-y-2">
                        <div className="flex flex-row items-center justify-between">
                          <div className="flex-1">
                            <p className="text-white font-semibold truncate">
                              {o.project_name}
                            </p>
                          </div>
                          {o.platform === "mobile" ? (
                            <AiOutlineMobile className="text-white" />
                          ) : (
                            <TbWorld className="text-white" />
                          )}
                        </div>
                        <div className="w-full h-px bg-white"></div>
                        <div className="flex flex-row justify-between items-center">
                          <p className="text-white text-xs text-center">
                            {o.year}
                          </p>
                          <div
                            onClick={() => onNavigate(o)}
                            className="text-white border border-white rounded-full py-1 px-5 text-xs text-center hover:bg-white hover:text-black transition-colors"
                          >
                            Detail
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}
