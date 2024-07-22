import api from "@/plugins/api";
import { SpecieService } from "..";

class SlideService {

    async getSlides() {
        try {
            const { data } = await api.get('/slide');
            return data.results;
        } catch (error) {
            console.log("An error ocurring in get Slide", error);
            throw error;
        }
    }

    async postSlides(newSlide) {
        try {
            const { data } = await api.post('/slide/', newSlide);
            return data.results;
        } catch (error) {
            console.log("An error ocurring in post Slide", error);
            throw error;
        }
    }

    async updateSlides(slide) {
        try {
            const { data } = await api.put(`/slide/${slide}`);
            return data.results;
        } catch (error) {
            console.log("An error ocurring in update Slide", error);
            throw error;
        }
    }

    async deleteSlides(idSlide) {
        try {
            const { data } = await api.post(`/slide/${idSlide}`);
            return data.results;
        } catch (error) {
            console.log("An error ocurring in delete Slide", error);
            throw error;
        }
    }
}

export default new SpecieService()