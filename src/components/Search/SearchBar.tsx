"use client";
import { Search } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";

interface SearchBarProps {
  placeholder?: string;
  onSearch: (query: string) => void;
}

const SearchBar = ({ placeholder = "Search...", onSearch }: SearchBarProps) => {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query.trim());
  };

  return (
    <form
      action=""
      onSubmit={handleSubmit}
      className="flex w-full max-w-md items-center gap-2 rounded-2xl border border-border bg-background px-3 py-2 shadow-sm transition focus-within:ring-2 focus-within:ring-primary"
    >
      <Search />
      <input
        type="text"
        placeholder={placeholder}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 border-none shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
      />
      {query && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => setQuery("")}
          className="text-muted-foreground hover:text-foreground"
        >
          X
        </Button>
      )}
    </form>
  );
};

export default SearchBar;
