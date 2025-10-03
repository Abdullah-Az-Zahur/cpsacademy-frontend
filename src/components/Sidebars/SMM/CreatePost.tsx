"use client"
import { useAuth } from "@/lib/auth";
import { createPost, uploadImage } from "@/lib/strapi";
import React, { useState } from "react";

function CreatePost({
  openCreateInitially = false,
}: {
  openCreateInitially?: boolean;
}) {
  const { user } = useAuth();
  const jwt =
    user?.jwt ??
    (typeof window !== "undefined" ? localStorage.getItem("jwt") : null);

  const [open, setOpen] = useState(openCreateInitially);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      let mediaId: number | undefined;

      if (imageFile) {
        const uploaded = await uploadImage(imageFile, jwt ?? undefined);
        mediaId = uploaded?.id;
      }

      // build simple block structure (paragraphs)
      const contentBlocks = buildContentFromText(text);

      const created = await createPost(
        { title, contentBlocks, mediaId },
        jwt ?? undefined
      );

      setMessage("Post created successfully!");
      setTitle("");
      setText("");
      setImageFile(null);
      setOpen(false);
      console.log("Created post:", created);
    } catch (err: any) {
      console.error(err);
      setMessage(err?.message ?? "Failed to create post");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex-1 p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Social Media Manager</h1>
        <div className="flex gap-2">
          <button
            onClick={() => setOpen(true)}
            className="rounded bg-blue-600 text-white px-4 py-2"
          >
            New Post
          </button>
        </div>
      </div>

      {/* Modal */}
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-2xl bg-white p-6 rounded shadow">
            <h2 className="text-xl font-semibold mb-4">Create New Post</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="mt-1 block w-full border p-2"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Content</label>
                <textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="mt-1 block w-full border p-2 h-40"
                  placeholder="Write your post here. Use double-newline for paragraphs."
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] ?? null)}
                />
                {imageFile && (
                  <div className="mt-2 text-sm">Selected: {imageFile.name}</div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded bg-green-600 text-white px-4 py-2"
                >
                  {loading ? "Posting..." : "Post"}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="rounded border px-4 py-2"
                >
                  Cancel
                </button>
              </div>

              {message && <div className="mt-2 text-sm">{message}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Placeholder for SMM main content */}
      <section className="mt-6">
        <p>
          Use the button above (or the sidebar Create Post option) to make
          posts.
        </p>
      </section>
    </div>
  );
}

export default CreatePost;

/** small helper to build paragraph blocks from textarea text */
function buildContentFromText(text: string) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphs.map((p) => ({
    type: "paragraph",
    children: [{ type: "text", text: p }],
  }));
}
