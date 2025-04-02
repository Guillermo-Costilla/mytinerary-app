"use client"

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

    const comments = getComments(cityId)

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

            {comments.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                    <p>No comments yet. Be the first to share your thoughts!</p>
                </div>
            ) : (
                <AnimatePresence>
                    {comments.map((comment, index) => (
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

