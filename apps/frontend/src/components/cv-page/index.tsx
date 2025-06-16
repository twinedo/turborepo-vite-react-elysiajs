
import { FcDownload } from "react-icons/fc";
// import { downloadHandler } from "services/handler/handlerAPI";
import { generateRandomLightColor } from "../../utils/color";
import { Section } from "../section";
import { Timeline } from "../timeline";
import { Stacks } from "../stacks";
import { Education } from "../education";
import { Certification } from "../certification";

export function CVPage() {
  const onDownloadClick = () => {
    // downloadHandler()
    //   .then((res) => {
    //     window.open(res);
    //   })
    //   .catch((error) => alert(JSON.stringify(error)));
  };

  return (
    <div className="bg-white">
      <Section>
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl lg:text-[48px]">
              Curriculum Vitae
            </h1>
            <button 
              onClick={onDownloadClick}
              className="
                border border-gray-300
                rounded-md
                px-4 py-2
                flex items-center
                hover:bg-gray-50
                transition-colors
              "
            >
              <span className="mr-2.5">Download</span>
              <FcDownload />
            </button>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-7">
          <div className="flex flex-col space-y-5">
            <div className="flex flex-row items-center space-x-4" id="experiences">
              <p className="font-bold text-base tracking-[0.3em]">
                EXPERIENCES
              </p>
              <div className="h-[3px] w-[45px] bg-black" />
            </div>

            <div className="relative space-y-5">
              <Timeline
                dateText="Mar 2024 - Sep 2024"
                bgCard={generateRandomLightColor()}
              >
                <p className="font-bold">INSPIRO - Mobile Developer</p>
                <p>
                  - Engineered modules in the Pruforce Pulse app using Agile methodologies, optimizing performance and scalability in a manner
                  consistent with modern React component design.
                  <br />- Diagnosed and resolved issues in both existing and new modules while maintaining accurate version control with Git.
                  <br />- Collaborated with vendors to extend functionality using React Native, demonstrating skills transferable to React applications in
                  full-stack development.
                  <br />- Delivered robust, high-quality code for iOS and Android platforms with a focus on performance optimization and adherence to mobile
                  best practices.
                </p>
              </Timeline>

              {/* Repeat Timeline for other experiences */}
              <Timeline
                dateText="Jan 2022 - May 2023"
                bgCard={generateRandomLightColor()}
              >
                <p className="font-bold">DIGITSENSE LTD - Mobile Developer</p>
                <p>
                  - Constructed the Myrlabs app using React Native to ensure cross-platform functionality and responsive design, complementing web
                  development practices in React.
                  <br />- Conducted thorough client requirement analyses and provided actionable recommendations, aligning with Agile methodologies for
                  iterative development.
                  <br />- Supported team efforts in developing web applications by applying mobile development insights to enhance UI responsiveness and
                  user experience.
                  <br />- Performed comprehensive testing and documentation to ensure application reliability, incorporating unit testing practices with tools
                  like Jest and Vitest.
                </p>
              </Timeline>

              {/* Add remaining Timeline components similarly */}
              
            </div>
          </div>
        </div>
      </Section>

      <Education />
      <Certification />
      <Stacks />
    </div>
  );
}