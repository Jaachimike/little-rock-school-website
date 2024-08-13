import React from "react";
import HoverCard from "./HoverCard";
import dummypic from "../assets/jpg/dummypic.jpg";

const hoverCardProps = [
  {
    imageSrc: dummypic,
    headertext: "Academic Excellence",
    content:
      "Our highly qualified, caring teachers combine subject expertise with attention to each individual. In small classes students from a variety of backgrounds, experiences and viewpoints find common ground in shared values. Learners at all ages encounter thoughtfully prepared and ever-evolving curriculum.",
    linkText: "Learn More",
    linkUrl: "/academic-excellence",
  },
  {
    imageSrc: dummypic,
    headertext: "Well-Rounded Experience",
    content:
      "We provide myriad opportunities for students to develop their gifts outside of the classroom. Students not only become great scholars; they also become artists, athletes and citizens of the world.",
    linkText: "Learn More",
    linkUrl: "/academic-excellence",
  },
  {
    imageSrc: dummypic,
    headertext: "Academic Excellence",
    content:
      "A global focus throughout our curriculum helps young people understand their role as citizens of an interdependent global community. Students graduate from Blake prepared to make our world better.",
    linkText: "Learn More",
    linkUrl: "/academic-excellence",
  },
];

const QualitiesSection = () => {
  return (
    <div className="content-container">
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

export default QualitiesSection;
