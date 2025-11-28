import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { createPost } from '../../../api/posts';
import './postform.css'

type Props={
    handleClose: () => void;
}

const Postform = ({handleClose}:Props) => {
    const queryclient = useQueryClient();

    const { register, handleSubmit, reset } = useForm<PostForm>({
        defaultValues: {
            title: '',
            body: ''
        }
    })

    interface PostForm {
        title: string;
        body: string;
    }

    const { mutate} = useMutation({
        mutationFn: createPost,
        onSuccess: () => {
            console.log("Post created successfully");
            queryclient.invalidateQueries({ queryKey: ['posts'] });
        }
    })

    const onSubmit = (data: PostForm) => {
        mutate(data);
        console.log("Form submitted:", data);
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="postform">
            <h2>Add New Post</h2>
            <button className="close-button" onClick={handleClose}>X</button>
            <label htmlFor="title">Title</label>
            <input
                id="title"
                {...register('title')}
                type="text"
                placeholder="Enter post title"
            />

            <label htmlFor="body">Body</label>
            <textarea
                id="body"
                {...register('body')}
                placeholder="Enter post content"
                rows={4}
            />

            <button type="submit">
                Submit
            </button>
        </form>
    )
}

export default Postform