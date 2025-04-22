'use client';

import s from "./page.module.scss";
import { useData } from "../../lib/hooks/useData";
import { useState, useEffect } from "react";
import { Post } from "../../lib/types/post";
import { useParams, useRouter } from "next/navigation";

export default function EditPost() {
  const { id } = useParams();
  const router = useRouter();
  const { posts, handleUpdatePost } = useData();
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const currentPost = posts?.find((p) => p.id === Number(id));
    if (currentPost) {
      setPost(currentPost);
    }
  }, [posts, id]);

  if (!post) return <div>Пост не найден</div>;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdatePost(post);
    router.push('/');
  };

  return (
    <div className={s.main}>
      <form onSubmit={handleSubmit} className={s.form}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          placeholder="Заголовок"
          required
        />
        <textarea
          value={post.body}
          onChange={(e) => setPost({ ...post, body: e.target.value })}
          placeholder="Текст поста"
          required
        />
        <button type="submit">Обновить пост</button>
      </form>
    </div>
  );
} 