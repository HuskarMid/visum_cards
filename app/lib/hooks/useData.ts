import { useGetPostsQuery } from '../store/api/postsApi';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setPosts, addPost, updatePost, deletePost } from '../store/postsSlice';
import { Post } from '../types/post';
import { useEffect } from 'react';

export const useData = () => {
  const dispatch = useDispatch();
  const { data: apiPosts, isLoading, error } = useGetPostsQuery(10);
  const posts = useSelector((state: RootState) => state.posts.posts);

  useEffect(() => {
    if (apiPosts && posts.length === 0) {
      dispatch(setPosts(apiPosts));
    }
  }, [apiPosts, dispatch, posts.length]);

  const handleAddPost = (post: Post) => {
    dispatch(addPost(post));
  };

  const handleUpdatePost = (post: Post) => {
    dispatch(updatePost(post));
  };

  const handleDeletePost = (id: number) => {
    dispatch(deletePost(id));
  };

  return {
    posts,
    isLoading,
    error,
    handleAddPost,
    handleUpdatePost,
    handleDeletePost,
  };
}; 