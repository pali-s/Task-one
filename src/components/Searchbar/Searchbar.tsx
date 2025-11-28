import React from 'react'

interface Post {
    id: number;
    title: string;
    body: string;
}

interface SearchbarProps {
    posts: Post[];
    onFilter: (filteredPosts: Post[]) => void;
}

const Searchbar: React.FC<SearchbarProps> = ({ posts, onFilter }) => {
    const [value, setValue] = React.useState("");

    const handlekeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            console.log("Search submitted:", value);
            const filteredPosts = posts.filter(post => post.title.toLowerCase().includes(value.toLowerCase()) || post.body.toLowerCase().includes(value.toLowerCase()));
            console.log("Filtered Posts:", filteredPosts);
            onFilter(filteredPosts);
        }
    }
    return (
        <div className='search-container'>
            <input className='search-input' type='text' placeholder='Search...' value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handlekeydown} />
        </div>
    )
}

export default Searchbar;