import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import { SlideService } from "@/services";

/**
 * Store for managing slides data.
 * @typedef {Object} SlideStore
 * @property {Object} state - The state object containing slides data.
 * @property {Array} state.slides - The array of slides.
 * @property {Object|null} state.selectedSlide - The currently selected slide.
 * @property {boolean} state.loading - Indicates if data is currently being loaded.
 * @property {Error|null} state.error - The error object, if any.
 * @property {boolean} isLoading - Computed property indicating if data is currently being loaded.
 * @property {number} slidesCount - Computed property indicating the number of slides.
 * @property {Function} getSlides - Function to fetch slides data.
 * @property {Function} createSlide - Function to create a new slide.
 * @property {Function} updateSlide - Function to update an existing slide.
 * @property {Function} deleteSlide - Function to delete a slide.
 */

/**
 * Creates a new instance of the SlideStore
 * @function useSlideStore
 * @returns {SlideStore} the SlideStore instance
 */
export const useSlideStore = defineStore("slide",
    () => {
        const state = reactive({
            slides: [],
            selectedSlide: null,
            loading: false,
            error: null,
            connection: false,
        });
        const isLoading = computed(() => state.loading);
        const slidesCount = computed(() => state.slides.length);

        /**
         * Fetches slides data
         * @async
         * @function getSlides
         */
        const getSlides = async () => {
            state.loading = true;
            console.log("Pinia: getSlideMicroscopyPost - open loader")
            try {
                state.slides = await SlideService.getSlides();
                 console.log("Pinia: getSlideMicroscopyPost - send")
            } catch (error) {
                state.error = error;
                console.log( "Pinia: getSlideMicroscopyPost - return error", error)
            } finally {
                state.loading = false;
                state.connection = true;
            }
            console.log("Pinia: getSlideMicroscopyPost - close loader")
        };

        /**
         * Creates a new slide
         * @async
         * @function createSlide
         * @param {Object} newSlide - the new slide object to create 
         */
        const createSlide = async (newSlide) => {
            state.loading = true;
            console.log("Pinia: AddSlideMicroscopyPost - open loader")
            try {
                state.slides.push(await SlideService.postSlides(newSlide));
                console.log("Pinia: AddSlideMicroscopyPost - send")
            } catch (error) {
                state.error = error;
                console.log( "Pinia: AddSlideMicroscopyPost - return error", error)
            } finally {
                state.loading = false;
            }
            console.log("Pinia: AddSlideMicroscopyPost - close loader")
        };

        /**
         * Update an existing slide
         * @async
         * @function updateSlideSlide
         * @param {Object} slide - the updated slide object.
         */
        const updateSlide = async (slide, index) => {
            state.loading = true;
            console.log("Pinia: UpdateSlideMicroscopyPost - open loader")
            try {
                state.slides = await SlideService.updateSlides(slide, index);
                console.log("Pinia: UpdateSlideMicroscopyPost - send")
            } catch (error) {
                state.error = error;
                console.log( "Pinia: UpdateSlideMicroscopyPost - return error", error)
            } finally {
                state.loading = false;
            }
            console.log("Pinia: UpdateSlideMicroscopyPost - close loader")
        };

        /**
         * Delete a slide
         * @async
         * @function createSlide
         * @param {number} id - The id of the slide will be deleted
         */
        const deleteSlide = async (id) => {
            state.loading = true;
            console.log("Pinia: DeleteSlideMicroscopyPost - open loader")
            try {
            const index = state.slides.findIndex((s) => s.id === id.id);
            state.slides.splice(index, 1);
            await SlideService.deleteSlides(id)
            console.log("Pinia: DeleteSlideMicroscopyPost - send")
            } catch (error) {
                state.error = error;
                console.log( "Pinia: DeleteSlideMicroscopyPost - return error", error)
            } finally {
                state.loading = false;
            }
            console.log("Pinia: DeleteSlideMicroscopyPost - close loader")
        };

        return {
            state,
            isLoading,
            slidesCount,
            getSlides,
            createSlide,
            updateSlide,
            deleteSlide
        };
    }
)