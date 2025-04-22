'use client';

import s from "./page.module.scss";
import { useData } from "../lib/hooks/useData";
import { useState } from "react";
import { Post } from "../lib/types/post";
import { useRouter } from "next/navigation";

const Create = () => {
    const {handleAddPost} = useData();
    const router = useRouter();
    const [newPost, setNewPost] = useState<Partial<Post>>({ title: '', body: '' });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const postWithId: Post = {
            id: Date.now(),
            userId: 1,
            title: newPost.title || '',
            body: newPost.body || ''
        };
        handleAddPost(postWithId);
        router.push('/');
    };

  return (<div className={s.main}>
            <form onSubmit={handleSubmit} className={s.form}>
          <input
            type="text"
            value={newPost.title}
            onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
            placeholder="Заголовок"
            required
          />
          <textarea
            value={newPost.body}
            onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}
            placeholder="Текст поста"
            required
          />
          <button type="submit" onClick={handleSubmit}>Добавить пост</button>
        </form>

  </div>);
};

export default Create;
