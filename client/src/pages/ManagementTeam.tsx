import React from "react";
import HoverCard from "../components/HoverCard";
import dummypic from "../assets/jpg/dummypic.jpg";

const hoverCardProps = [
  {
    imageSrc: dummypic,
    headertext: "Mrs Comfort Ogundiya",
    content: "HEAD TEACHER (LAGOS BRANCH)",
    linkText: "",
    linkUrl: "/academic-excellence",
  },
  {
    imageSrc: dummypic,
    headertext: "Mr Nicholas Okafor",
    content: "HEAD TEACHER (OWERRI BRANCH)",
    linkText: "",
    linkUrl: "/academic-excellence",
  },
  {
    imageSrc: dummypic,
    headertext: "Mr Jaachimike Okafor",
    content: "HEAD TEACHER (ABUJA BRANCH)",
    linkText: "",
    linkUrl: "/academic-excellence",
  },
];

const ManagementTeam = () => {
  return (
    <div className="content-container ">
      <h2 className="text-3xl md:text-4xl text-littleRockBlue-500 font-bold mb-8 underline underline-offset-4">
        Our Management Team
      </h2>
      <div className="grid grid-col-1 sm:grid-cols-2 xl:grid-cols-3  gap-6 ">
        {hoverCardProps.map((card, index) => (
          <HoverCard
            key={index}
            imageSrc={card.imageSrc}
            headerText={card.headertext}
            content={card.content}
            linkText={card.linkText}
            linkUrl={card.linkUrl}
          />
        ))}
      </div>
    </div>
  );
};

export default ManagementTeam;
