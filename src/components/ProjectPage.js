import React from 'react';
import './ProjectPage.css';
import { Link } from 'react-router-dom';
function ProjectListItem({ title, description, imageUrl, projectUrl, id }) {
  return (
    <div className="project-list-item">
      <div className="image-container">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="project-content">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

function ProjectPage() {
  const projects = [
    {
      title: 'Hand Gesture Recognition',
      description: 'This project is focused on building a model for recognizing hand gestures using computer vision. The goal is to use this model for robot interaction. I used transfer learning and different pre-trained models to build the model. Data was collected using the onboard camera from Neato and the webcam from a laptop, and different techniques for image preprocessing were explored.',
      imageUrl: "https://raw.githubusercontent.com/AlexisWu-01/compRobo22_computer_vision/main/demo/handpose_demo.png",
      projectUrl: `/projects/computer-vision/${encodeURIComponent('Computer Vision Project')}/${encodeURIComponent('https://raw.githubusercontent.com/AlexisWu-01/compRobo22_computer_vision/master/README.md')}`,
      id: 'compRobo22_computer_vision',
    },

    {
      title: 'Art Bot',
      description: "ArtBot is a collaborative project that aims to create an interactive drawing robot. The system uses computer vision to convert images to stepper motor movements, and an Arduino firmware to interpret the G-code commands and control the physical system. A Python library is also developed to convert SVG images to G-code. Overall, ArtBot combines hardware and software components to create a unique and creative drawing experience.",
      imageUrl: "https://raw.githubusercontent.com/AlexisWu-01/artBot_website/main/images/bg.jpg",
      projectUrl: `https://artBot.projects.alexiswu.tech`,
      id: 'art-bot',
    },

    {
      title: 'More to Come',
      description: "This website is still under construction, please check my GitHub Page",
      imageUrl: "https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
      projectUrl: `https://github.com/AlexisWu-01?tab=repositories`,
      id: 'github',
    },


    // Other projects...
  ];

  return (
    <div className="project-page">
      <h1>Welcome to my projects!</h1>
      <div className="project-list">
        {projects.map((project, index) => {
          if (project.id === 'art-bot' | project.id=='github') {
            return (
              <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <ProjectListItem
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                />
              </a>
            );
          } else {
            return (
              <Link
                to={{
                  pathname: project.projectUrl,
                }}
                key={index}
              >
                <ProjectListItem
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                />
              </Link>
            );
          }
        })}
      </div>
    </div>
  );
}


export default ProjectPage;
