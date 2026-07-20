import { useState } from "react";
import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";
import ProjectPage from "./ProjectPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import { getNextProject, getProjectBySlug } from "./data/projects";
import { useRouter } from "./router";
import type { CategoryFilter } from "./ProjectsPage";

export default function App() {
  const { route, navigate } = useRouter();

  const goHome = () => navigate({ name: "home" });
  const goAbout = () => navigate({ name: "about" });
  const goProjects = (filter?: CategoryFilter) => navigate({ name: "projects", filter });
  const goContact = () => navigate({ name: "contact" });
  // Project cards/links everywhere pass a slug rather than a full object.
  const goProjectBySlug = (slug: string) => {
    const project = getProjectBySlug(slug);
    if (project) navigate({ name: "project", project });
  };

  const navProps = {
    onInteriorClick: () => goProjects("Interior"),
    onVisualMerchandisingClick: () => goProjects("VisualMerchandising"),
    onAboutClick: goAbout,
    onContactClick: goContact,
  };

  if (route.name === "about") {
    return (
      <AboutPage
        onSelectProject={goProjectBySlug}
        onViewAllProjects={() => goProjects()}
        onLogoClick={goHome}
        {...navProps}
      />
    );
  }

  if (route.name === "contact") {
    return (
      <ContactPage
        onProjectsClick={() => goProjects()}
        onLogoClick={goHome}
        {...navProps}
      />
    );
  }

  if (route.name === "projects") {
    return (
      <ProjectsPage
        onSelectProject={goProjectBySlug}
        onLogoClick={goHome}
        initialFilter={route.filter}
        {...navProps}
      />
    );
  }

  if (route.name === "project") {
    const project = route.project;
    return (
      <ProjectPage
        project={project}
        nextProject={getNextProject(project.id)}
        onBack={goHome}
        onSelectProject={goProjectBySlug}
        onViewAllProjects={() => goProjects()}
        {...navProps}
      />
    );
  }

  return (
    <HomePage
      onSelectProject={goProjectBySlug}
      onViewAllProjects={() => goProjects()}
      {...navProps}
    />
  );
}
