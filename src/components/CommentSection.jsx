import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, Trash2, Send } from "lucide-react"
import useCommentStore from "../store/commentStore"
import useAuthStore from "../store/authStore"
import { formatDistanceToNow } from "date-fns"
import toast from "react-hot-toast"

const CommentSection = ({ cityId }) => {
    const [commentText, setCommentText] = useState("")
    const { getComments, addComment, deleteComment, toggleLike } = useCommentStore()
    const { user } = useAuthStore()

    const comments = getComments(cityId) || []

    const avatars = [
        "https://randomuser.me/api/portraits/men/1.jpg",
        "https://randomuser.me/api/portraits/women/2.jpg",
        "https://randomuser.me/api/portraits/men/3.jpg",
        "https://randomuser.me/api/portraits/women/4.jpg",
        "https://randomuser.me/api/portraits/men/5.jpg",
        "https://randomuser.me/api/portraits/women/6.jpg",
        "https://randomuser.me/api/portraits/men/7.jpg",
        "https://randomuser.me/api/portraits/women/8.jpg",
    ]

    // Array of random user names
    const names = [
        "Alex Johnson",
        "Jamie Smith",
        "Taylor Brown",
        "Jordan Davis",
        "Casey Wilson",
        "Riley Martinez",
        "Morgan Lee",
        "Quinn Thompson",
    ]

    // Agregar después de los arrays de avatars y names
    const generateConsistentLikes = (text) => {
        // Usar una función hash simple para generar un número consistente basado en el texto
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            hash = ((hash << 5) - hash) + text.charCodeAt(i);
            hash = hash & hash;
        }
        // Convertir el hash a un número entre 1 y 100
        return Math.abs(hash % 100) + 1;
    };

    // Comentarios por defecto
    const defaultComments = [
        {
            text: "It is a very nice city to see, enjoy and learn about its history, well organized trip thanks to the City Pass, essential if you want to see and tour almost the entire city.",
            name: names[0],
            avatar: avatars[0],
            date: new Date(Date.now() - 86400000).toISOString(), // 1 día atrás
        },
        {
            text: "I was there a month ago and my experience was very good. The problem was that it is a very expensive city. I knew it was expensive, but I did not imagine it was so expensive. The best thing to do is to take sandwiches and if you want to eat there one day you can, but to eat every day in the city is to leave a salary.",
            name: names[1],
            avatar: avatars[1],
            date: new Date(Date.now() - 172800000).toISOString(), // 2 días atrás
        },
        {
            text: "I really enjoyed my stay there, I was there for 8 days in early July with my two daughters, a friend and her son. The first thing we liked was the hotel, fantastic with the bad reputation of hotels in London, because the Cleveland Esquare very clean, nice and comfortable, with its kitchen in the room that was very practical for breakfast and dinner, the unbeatable location two blocks from several subway and bus stops, next to Hyde Park, a beautiful place. All the parks are very well kept, the museums are mostly free, the markets are fun, especially the Canden Markers, the stores are so nice and different.",
            name: names[2],
            avatar: avatars[2],
            date: new Date(Date.now() - 259200000).toISOString(), // 3 días atrás
        }
    ];

    // Lógica de displayedComments
    const displayedComments = (() => {
        const userComments = comments || [];
        const defaultCommentsFormatted = defaultComments.map((comment, index) => ({
            id: `default-${index}`,
            text: comment.text,
            user: {
                name: comment.name,
                avatar: comment.avatar
            },
            date: comment.date,
            isOwner: false,
            userLiked: false,
            likes: generateConsistentLikes(comment.text),
        }));

        // Si no hay comentarios de usuario, mostrar solo los por defecto
        if (userComments.length === 0) {
            return defaultCommentsFormatted;
        }

        // Combina comentarios de usuario con los por defecto
        return [...userComments, ...defaultCommentsFormatted];
    })();

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!user) {
            toast.error("You must be logged in to comment")
            return
        }

        if (!commentText.trim()) {
            toast.error("Comment cannot be empty")
            return
        }

        addComment(cityId, commentText, user)
        setCommentText("")
    }

    const handleLike = (commentId) => {
        if (!user) {
            toast.error("You must be logged in to like comments")
            return
        }

        toggleLike(cityId, commentId)
    }

    const handleDelete = (commentId) => {
        deleteComment(cityId, commentId)
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            {user ? (
                <form onSubmit={handleSubmit} className="mb-8">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                            <img
                                src={user.photo || `https://ui-avatars.com/api/?name=${user.name || user.email}`}
                                alt={user.name || user.email}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className="flex-grow">
                            <textarea
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                placeholder="Share your thoughts about this city..."
                                className="input min-h-[100px] mb-2"
                                maxLength={500}
                            />
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">{500 - commentText.length} characters remaining</span>
                                <button
                                    type="submit"
                                    className="btn btn-primary flex items-center gap-2"
                                    disabled={!commentText.trim()}
                                >
                                    <Send size={16} />
                                    Post Comment
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            ) : (
                <div className="bg-muted p-4 rounded-lg mb-8 text-center">
                    <p>
                        Please{" "}
                        <a href="/login" className="text-primary font-medium">
                            log in
                        </a>{" "}
                        to leave a comment.
                    </p>
                </div>
            )}

            {displayedComments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            ) : (
                <AnimatePresence>
                    {displayedComments.map((comment, index) => (
                        <motion.div
                            key={comment.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.3, delay: index * 0.05 }}
                            className="border-b border-border last:border-0 py-6 animate-in"
                        >
                            <div className="flex gap-4">
                                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                                    <img
                                        src={comment.user.avatar || "/placeholder.svg"}
                                        alt={comment.user.name}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <h4 className="font-medium">{comment.user.name}</h4>
                                            <p className="text-sm text-muted-foreground">
                                                {formatDistanceToNow(new Date(comment.date), { addSuffix: true })}
                                            </p>
                                        </div>
                                        {comment.isOwner && user && (
                                            <button
                                                onClick={() => handleDelete(comment.id)}
                                                className="text-destructive hover:text-destructive/80 transition-colors p-1"
                                                aria-label="Delete comment"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>
                                    <p className="my-3">{comment.text}</p>
                                    <button
                                        onClick={() => handleLike(comment.id)}
                                        className={`flex items-center gap-1 text-sm ${comment.userLiked ? "text-primary font-medium" : "text-muted-foreground"
                                            } hover:text-primary transition-colors`}
                                    >
                                        <ThumbsUp size={14} />
                                        <span>
                                            {comment.likes} {comment.likes === 1 ? "like" : "likes"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            )}
        </div>
    )
}

export default CommentSection

