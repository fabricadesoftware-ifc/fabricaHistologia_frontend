import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { PostService } from "@/services";
import { useStorage } from "@vueuse/core";

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
        const state = useStorage('postStorage', {
            posts: [],
            postsByOrganAndType: [],
            postsByOrgan: [],
            selectedPost: null,
            loading: false,
            error: null,
            connection: false,
            count: 0,
        });
        const posts = computed(() => state.value.posts)
        const isLoading = computed(() => state.value.loading);
        const postCount = computed(() => state.value.posts.length);
        const postByOrganAndType = computed(()=> state.value.postsByOrganAndType)
        const selectedPost = computed(() => state.value.selectedPost)
        const postsByOrgan = computed(() => state.value.postsByOrgan)
        const count = computed(() => state.value.count)

        const typeSelection = ref(1)

        /**
         * Fetches post data.
         * @async
         * @function getPosts
         */
        const getPosts = async (page) => {
            state.value.loading = true;
            try {
                const response = await PostService.getPosts(page);
                state.value.count = response.count
                state.value.posts = response.results
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
                state.value.connection = true; // just to see if the connection is established
            }
        };

        const getPostsById = async (id) => {
            state.value.loading = true;
            try {
                const response = await PostService.getPostsById(id)
                
                state.value.selectedPost = response
            } catch (error) {
                state.value.error = error
            } finally {
                state.value.loading = false
                state.value.connection = true
            }
        }

        const getPostsByOrgan = async (organId) => {
            state.value.loading = true;
            try {
                const response = await PostService.getPostsByOrganId(organId)
                state.value.postsByOrgan = response
                return response
            } catch (error) {
                state.value.error = error
            } finally {
                state.value.loading = false
                state.value.connection = true
            }
        }

        const getPostsByOrganAndType = async (organ_id, type_post, specie_id) => {
            state.value.loading = true;
            try {
                const response = await PostService.getPostsByOrganByTypeAndSpecie(organ_id, type_post, specie_id)
                state.value.postsByOrganAndType = response
                return response
            } catch (error) {
                state.value.error = error
            } finally {
                state.value.loading = false
                state.value.connection = true
            }
        };

        /**
         * Creates a new post.
         * @async
         * @function createPost
         * @param {Object} newPosts - The new Posts object to create.
         */
        const createPost = async (newPost) => {
            state.value.loading = true;
            try {
                state.value.posts.push(await PostService.createPost(newPost));
            } catch (error) {
                state.value.error = error;
                throw error
            } finally {
                state.value.loading = false;
            }
        };
        
        /**
         * Updates an existing post.
         * @async
         * @function updatePosts
         * @param {Object} PosupdatePosts - The PosupdatePosts object to update.
         */
        const updatePosts = async (post, id) => {
            state.value.loading = true;
            try {
                const index = state.value.posts.findIndex((s) => s.id === post.id);
                return state.value.posts[index] = await PostService.updatePosts(post, id);
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };

        /**
         * Deletes a post.
         * @async
         * @function deletePosts
         * @param {number} id - The ID of the Posts to delete.
        */
       const deletePosts = async (id) => {
           state.value.loading = true;
           try {
                console.log('TA QUASE', id)

               const index = state.value.posts.findIndex((s) => s.id === id);
               state.value.posts.splice(index, 1);
               await PostService.deletePosts(id);
            } catch (error) {
                state.value.error = error;
            } finally {
                state.value.loading = false;
            }
        };
        
        return {
            state,
            isLoading,
            postCount,
            posts,
            postByOrganAndType,
            selectedPost,
            postsByOrgan,
            typeSelection,
            count,
            getPosts,
            getPostsByOrganAndType,
            getPostsByOrgan,
            getPostsById,
            createPost,
            updatePosts,
            deletePosts
        };
        
    }
)
