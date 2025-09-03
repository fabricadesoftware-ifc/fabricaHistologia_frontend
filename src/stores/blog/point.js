import { defineStore } from "pinia";
import { computed, reactive, ref } from "vue";
import { PointService } from "@/services";

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

export const usePointStore = defineStore("point",
    () => {
        const ctx = ref(null)
        const canvas = ref(null)
        const image = ref(null)
        const state = reactive({
            points: [],
            pointsByPosts: [],
            selectedPoint: null,
            loading: false,
            error: null,
            connection: false,
            count : 0,
        });
        const points = computed(() => state.points)
        const isLoading = computed(() => state.loading);
        const pointCount = computed(() => state.points.length);
        const pointsByPosts = computed(() => state.pointsByPosts)
        const count = computed(() => state.count)

        /**
         * Fetches post data.
         * @async
         * @function getPosts
         */
        const getPoints = async (page) => {
            state.loading = true;
            try {
                const response = await PointService.getPoints(page);
                const data = Object.assign(response.results, {visible: false})
                state.count = response.count
                state.points = data
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
                state.connection = true; // just to see if the connection is established
            }
        };

        const getPointsByPosts = async (post_id) => {
            state.loading = true;
            try {
                const response = await PointService.getPointsByPost(post_id)
                const data = Object.assign(response, {visible: false})
                state.pointsByPosts = data
            } catch (error) {
                state.error = error
            } finally {
                state.loading = false
                state.connection = true
            }
        }

         const getPointsById = async (id) => {
            state.loading = true;
            try {
                const response = await PointService.getPointsById(id)
        
                state.selectedPoint = response
                return response
            } catch (error) {
                state.error = error
            } finally {
                state.loading = false
                state.connection = true
            }
        }

        /**
         * Creates a new post.
         * @async
         * @function createPost
         * @param {Object} newPosts - The new Posts object to create.
         */
        const createPoint = async (newPoint) => {
            state.loading = true;
            try {
                state.points.push(await PointService.createPoint(newPoint));
            } catch (error) {
                state.error = error;
                throw error;
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
        const updatePoints = async (point, id) => {
            state.loading = true;
            try {
            
                const response = await PointService.updatePoints(point, id);
                return response
            } catch (error) {
                state.error = error;
                return error;
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
       const deletePoints = async (id) => {
           state.loading = true;
           try {
               const index = state.points.findIndex((s) => s.id === id);
               state.points.splice(index, 1);
               await PointService.deletePoints(id);
            } catch (error) {
                state.error = error;
            } finally {
                state.loading = false;
            }
        };

        const redrawCanvas = () => {
            if (!ctx.value || !canvas.value) return
            ctx.value.clearRect(0, 0, canvas.value.width, canvas.value.height)
            ctx.value.drawImage(image.value, 0, 0)
        
            // Desenhar áreas baseadas no estado atual
            pointsByPosts.value.forEach((area) => {
              if (area.visible) {
                ctx.value.strokeStyle = area.color
                ctx.value.lineWidth = 6
                ctx.value.beginPath()
                area.position.forEach((point, index) => {
                  if (index === 0) {
                    ctx.value.moveTo(point.x, point.y)
                  } else {
                    ctx.value.lineTo(point.x, point.y)
                  }
                })
                ctx.value.stroke()
                ctx.value.closePath()
        
                // Exibir rótulo
                if (area.label_title) {
                  ctx.value.fillStyle = area.color
                  ctx.value.font = 'bold 15px Arial'
                  const midpoint = area.position[Math.floor(area.position.length / 2)]
                  ctx.value.fillText(area.label_title, midpoint.x, midpoint.y - 10)
                }
              }
            })
          }
        
          const loadCanvas = (imageSrc) => {
            // Carregue a imagem e configure o canvas aqui
            image.value = new Image()
            image.value.src = imageSrc
            image.value.onload = () => {
              if (canvas.value) {
                canvas.value.width = image.value.width
                canvas.value.height = image.value.height
                redrawCanvas()
              }
            }
            redrawCanvas()
          }
        
        
          const visibleLabel = (index) => {
            pointsByPosts.value.forEach((area, i) => {
              if (i == index) {
                area.visible = !area.visible
              }
            })
            redrawCanvas()
          }
        
        
        return {
            state,
            isLoading,
            pointCount,
            points,
            pointsByPosts,
            canvas,
            ctx,
            image,
            count,
            getPoints,
            getPointsById,
            getPointsByPosts,
            createPoint,
            updatePoints,
            deletePoints,
            redrawCanvas,
            loadCanvas,
            visibleLabel
        };
        
    }
)
