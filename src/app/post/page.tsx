"use client";

import PostAdForm from "@/components/post/PostAdForm";

export default function PostAdPage() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-8">
      <h1 className="mb-6 text-2xl font-bold">Post an Ad</h1>
      <PostAdForm />
    </div>
  );
}
