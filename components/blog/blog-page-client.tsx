'use client'

import * as React from "react";
import { BlogHeader } from "@/components/blog/blog-header";
import { BlogFilter } from "@/components/blog/blog-filter";
import { BlogList } from "@/components/blog/blog-list";
import type { PostsQueryResult } from "@/sanity.types";

export default function BlogPageClient({ posts }: { posts: PostsQueryResult }) {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);

  const allTags = React.useMemo(() => {
    const tags = new Set<string>();
    posts.forEach(post => {
      if (post.tags) {
        post.tags.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags);
  }, [posts]);

  const filteredPosts = React.useMemo(() => {
    return posts.filter(post => {
      const matchesSearch =
        searchTerm === "" ||
        (post.title && post.title.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.description && post.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (post.tags && post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));

      const matchesTag =
        selectedTag === null ||
        (post.tags && post.tags.includes(selectedTag));

      return matchesSearch && matchesTag;
    });
  }, [posts, searchTerm, selectedTag]);

  return (
    <div className="container mx-auto px-4 py-12 sm:px-6 lg:px-8">
      <BlogHeader
        title="Blogs"
        description=""
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <BlogFilter
        tags={allTags}
        selectedTag={selectedTag}
        onSelectTag={setSelectedTag}
      />

      <BlogList posts={filteredPosts} />
    </div>
  );
}
