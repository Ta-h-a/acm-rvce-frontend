'use client'

import * as React from "react";
import { ProjectHeader } from "@/components/projects/project-header";
import { ProjectFilter } from "@/components/projects/project-filter";
import { ProjectList } from "@/components/projects/project-list";
import type { ProjectsQueryResult } from "@/sanity.types";

export default function ProjectPageClient({ projects }: { projects: ProjectsQueryResult }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    projects.forEach(project => {
      if (project.tags) {
        project.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = React.useMemo(() => {
    return projects.filter(project => {
      const matchesSearch =
        searchTerm === "" ||
        (project.title && project.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.description && project.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesTag =
        selectedTag === null ||
        (project.tags && project.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [projects, searchTerm, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <ProjectHeader
        title="Projects"
        description=""
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <ProjectFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />

      <ProjectList projects={filteredProjects} />
    </div>
  );
}
