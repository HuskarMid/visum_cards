'use client';

import s from "./page.module.scss";
import { useData } from "./lib/hooks/useData";
import { Post } from "./lib/types/post";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Home() {
  const { posts, isLoading, error, handleDeletePost } = useData();
  const router = useRouter();
  if (isLoading) return <div>Загрузка...</div>;
  if (error) return <div>Ошибка при загрузке данных</div>;

  return (
      <div className={s.main}>
        <div className={s.list}>
          {posts?.map((post: Post) => (
            <div key={post.id} className={s.list__item}>
              <Link className={s.link} href={`/post/${post.id}`}>
                <h2>{post.title}</h2>
                <p>{post.body}</p>
              </Link>
              <div className={s.actions}>
                <button onClick={() => router.push(`/edit/${post.id}`)}>Редактировать</button>
                <button onClick={() => handleDeletePost(post.id)}>Удалить</button>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
