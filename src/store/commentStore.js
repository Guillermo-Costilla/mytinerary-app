import { create } from "zustand"
import { persist } from "zustand/middleware"
import { nanoid } from "nanoid"
import toast from "react-hot-toast"

// Array of random user avatars
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

// Generate a random user
const getRandomUser = () => {
  const randomIndex = Math.floor(Math.random() * names.length)
  return {
    name: names[randomIndex],
    avatar: avatars[randomIndex],
  }
}

// Generate initial comments for cities
const generateInitialComments = () => {
  const comments = {}

  // Sample comments for city with ID 1
  comments["1"] = [
    {
      id: nanoid(),
      text: "This city is absolutely beautiful! I loved the architecture.",
      user: getRandomUser(),
      likes: 15,
      date: new Date(Date.now() - 86400000 * 3).toISOString(), // 3 days ago
      userLiked: false,
    },
    {
      id: nanoid(),
      text: "The food was amazing, especially the local cuisine.",
      user: getRandomUser(),
      likes: 8,
      date: new Date(Date.now() - 86400000 * 5).toISOString(), // 5 days ago
      userLiked: false,
    },
  ]

  // Sample comments for city with ID 2
  comments["2"] = [
    {
      id: nanoid(),
      text: "Great place for a family vacation. Kids loved the parks!",
      user: getRandomUser(),
      likes: 12,
      date: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
      userLiked: false,
    },
    {
      id: nanoid(),
      text: "The museums were fascinating. I learned so much about the local history.",
      user: getRandomUser(),
      likes: 6,
      date: new Date(Date.now() - 86400000 * 7).toISOString(), // 7 days ago
      userLiked: false,
    },
  ]

  return comments
}

const useCommentStore = create(
  persist(
    (set, get) => ({
      comments: generateInitialComments(),

      // Add a comment to a city
      addComment: (cityId, text, currentUser) => {
        const { comments } = get()
        const cityComments = comments[cityId] || []

        const newComment = {
          id: nanoid(),
          text,
          user: {
            name: currentUser.name || currentUser.email,
            avatar: currentUser.photo || "https://ui-avatars.com/api/?name=" + (currentUser.name || currentUser.email),
          },
          likes: 0,
          date: new Date().toISOString(),
          userLiked: false,
          isOwner: true, // Mark as owner so user can delete it
        }

        set({
          comments: {
            ...comments,
            [cityId]: [newComment, ...cityComments],
          },
        })

        toast.success("Comment added successfully!")
      },

      // Delete a comment
      deleteComment: (cityId, commentId) => {
        const { comments } = get()
        const cityComments = comments[cityId] || []

        const updatedComments = cityComments.filter((comment) => comment.id !== commentId)

        set({
          comments: {
            ...comments,
            [cityId]: updatedComments,
          },
        })

        toast.success("Comment deleted successfully!")
      },

      // Toggle like on a comment
      toggleLike: (cityId, commentId) => {
        const { comments } = get()
        const cityComments = comments[cityId] || []

        const updatedComments = cityComments.map((comment) => {
          if (comment.id === commentId) {
            const userLiked = !comment.userLiked
            return {
              ...comment,
              likes: userLiked ? comment.likes + 1 : comment.likes - 1,
              userLiked,
            }
          }
          return comment
        })

        set({
          comments: {
            ...comments,
            [cityId]: updatedComments,
          },
        })
      },

      // Get comments for a city
      getComments: (cityId) => {
        const { comments } = get()
        return comments[cityId] || []
      },
    }),
    {
      name: "comments-storage",
    },
  ),
)

export default useCommentStore

