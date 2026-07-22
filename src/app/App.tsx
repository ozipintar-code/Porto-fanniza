import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import HomePage from "./HomePage";
import ProjectsPage from "./ProjectsPage";
import ProjectPage from "./ProjectPage";
import AboutPage from "./AboutPage";
import ContactPage from "./ContactPage";
import { getNextProject, getProjectBySlug } from "./data/projects";
import { useRouter } from "./router";
import type { CategoryFilter } from "./ProjectsPage";
import { DARK, CREAM } from "./theme";

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

  let content;
  if (route.name === "about") {
    content = <AboutPage onSelectProject={goProjectBySlug} onViewAllProjects={() => goProjects()} onLogoClick={goHome} {...navProps} />;
  } else if (route.name === "contact") {
    content = <ContactPage onProjectsClick={() => goProjects()} onLogoClick={goHome} {...navProps} />;
  } else if (route.name === "projects") {
    content = <ProjectsPage onSelectProject={goProjectBySlug} onLogoClick={goHome} initialFilter={route.filter} {...navProps} />;
  } else if (route.name === "project") {
    content = <ProjectPage project={route.project} nextProject={getNextProject(route.project.id)} onBack={goHome} onSelectProject={goProjectBySlug} onViewAllProjects={() => goProjects()} {...navProps} />;
  } else {
    content = <HomePage onSelectProject={goProjectBySlug} onViewAllProjects={() => goProjects()} {...navProps} />;
  }

  const pageKey = route.name === "project" ? `project-${route.project.id}` : route.name;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pageKey}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ backgroundColor: CREAM, minHeight: "100vh" }}
      >
        {content}
      </motion.div>
    </AnimatePresence>
  );
}
