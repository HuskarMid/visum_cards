'use client';

import { useData } from "../../lib/hooks/useData";
import { useParams } from "next/navigation";
import s from "./page.module.scss";

export default function PostPage() {
  const { id } = useParams();
  const { posts, isLoading, error } = useData();
  
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;

  const post = posts?.find((post) => post.id === Number(id));

  if (!post) return <div>Пост не найден</div>;

  return (
    <div className={s.main}>
      <div className={s.list__item}>
        <h1>{post.title}</h1>
        <p>{post.body}</p>
      </div>
    </div>
  );
} 