import React, { useState } from 'react';
import Postform from '../../components/Postform/Postform';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deletePost, fetchPosts, updatePostById } from '../../api/posts';

const TanstackSec: React.FC = () => {
    const queryClient = useQueryClient();

    const [editingPostId, setEditingPostId] = useState<number | null>(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedBody, setEditedBody] = useState("");


    const [openPosts, setOpenPosts] = useState<{ [id: number]: boolean }>({});

    const { isLoading, isError, data: posts, error } = useQuery({
        queryKey: ['posts'],
        queryFn: fetchPosts
    });

    //DELETE MUTATION
    const { mutate: deletePostMutate } = useMutation({
        mutationFn: deletePost,

        onSuccess: (deletedId) => {
            queryClient.setQueryData(["posts"], (oldPosts: any[]) =>
                oldPosts.filter((post) => post.id !== deletedId)
            );
        },
    });

    const handleDelete = (id: number) => {
        deletePostMutate(id);
    }


    //EDIT MUTATION
    const{mutate:editPostMutate}=useMutation<any,
    unknown,{id:number;postData:{title:string;body:string}}>({
        mutationFn:updatePostById,
        onSuccess: (updatedPost) => {
            queryClient.setQueryData(['posts'], (oldPosts: any[]) =>
                oldPosts.map((post) =>
                    post.id === updatedPost.id ? updatedPost : post
                )
            );
        }
    })

    const handleEdit=(id:number,newData:{title:string,body:string})=>{
        editPostMutate({id,postData:newData});
    }

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error: {(error as Error).message}</div>
    }


    const togglePost = (id: number) => {
        setOpenPosts(prev => ({
            ...prev,
            [id]: !prev[id]
        }))
    }

    return (<><h1>Practice Page</h1>
        <Postform />
        <h2 style={{textAlign:'center'}}>Find Your Post Here:</h2>
        {posts.map((post: any) => (
            <div key={post.id}>
                <h3 onClick={() => togglePost(post.id)}>{post.title}</h3>

                {editingPostId === post.id ? (
                    <>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                            placeholder="Title"
                        />
                        <input
                            type="text"
                            value={editedBody}
                            onChange={(e) => setEditedBody(e.target.value)}
                            placeholder="Body"
                        />
                        <button
                            onClick={() => {
                                handleEdit(post.id, { title: editedTitle, body: editedBody });
                                setEditingPostId(null); // close editing
                            }}
                        >
                            Save
                        </button>
                        <button onClick={() => setEditingPostId(null)}>Cancel</button>
                    </>
                ) : (
                    openPosts[post.id] && (
                        <>
                            <p>{post.body}</p>
                            <button
                                onClick={() => {
                                    setEditingPostId(post.id);
                                    setEditedTitle(post.title);
                                    setEditedBody(post.body);
                                }}
                            >
                                Edit
                            </button>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </>
                    )
                )}
            </div>
        ))}

    </>)
}

export default TanstackSec;