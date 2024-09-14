import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { PostService } from "@/services";

/**
 * Store for managing post data.
 * @typedef {Object} posttore
 * @property {Object} state - The state object containing post data.
 * @property {Array} state.post - The array of post.
 * @property {Object|null} state.selectedPost - The currently selected Post.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} postCount - Computed property indicating the number of post.
 * @property {Function} getPost - Function to fetch post data.
 * @property {Function} createPost - Function to create a new Post.
 * @property {Function} updatePost - Function to update an existing Post.
 * @property {Function} deletePost - Function to delete a Post.
 */

/**
 * Creates a new instance of the postStore.
 * @function usePostStore
 * @returns {postStore} The postStore instance.
 */

export const usePostStore = defineStore("post",
    () => {
        const state = reactive({
            posts: [],
            selectedPost: null,
            loading: false,
            error: null,
            connection: false,
        });
        const posts = computed(() => state.posts)
        const isLoading = computed(() => state.loading);
        const postCount = computed(() => state.posts.length);

        /**
         * Fetches post data.
         * @async
         * @function getPosts
         */
        const getPosts = async () => {
            state.loading = true;
            try {
                const response = await PostService.getPosts();
                state.posts = response
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true; // just to see if the connection is established
            }
        };

        /**
         * Creates a new post.
         * @async
         * @function createPost
         * @param {Object} newPosts - The new Posts object to create.
         */
        const createPost = async (newPost) => {
            state.loading = true;
            try {
                state.post.push(await PostService.createpost(newPost));
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };
        
        /**
         * Updates an existing post.
         * @async
         * @function updatePosts
         * @param {Object} PosupdatePosts - The PosupdatePosts object to update.
         */
        const updatePosts = async (post) => {
            state.loading = true;
            try {
                const index = state.posts.findIndex((s) => s.id === post.id);
                state.posts[index] = await PostService.updateposts(post);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        /**
         * Deletes a post.
         * @async
         * @function deletePosts
         * @param {number} id - The ID of the Posts to delete.
        */
       const deletePosts = async (id) => {
           state.loading = true;
           try {
               const index = state.posts.findIndex((s) => s.id === id);
               state.posts.splice(index, 1);
               await PostService.deletePosts(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };
        
        return {
            state,
            isLoading,
            postCount,
            posts,
            getPosts,
            createPost,
            updatePosts,
            deletePosts
        };
        
    }
)
