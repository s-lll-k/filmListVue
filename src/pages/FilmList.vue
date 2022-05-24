<template>
    <section class="films">
        <div class="container">
            <h1 class="films__title">Список "лучших" фильмов</h1>
            <div class="films__list">
                <article v-for="film of filmList" :key="film.id" class="film">
                    <div class="film__image">
                        <img
                            :src="`https://www.themoviedb.org/t/p/w220_and_h330_face/${film.poster_path}`"
                            alt="постер фильма"
                        />
                        <span class="film__rating">
                            {{ film.vote_average }}
                        </span>
                    </div>
                    <div class="film__description">
                        <h3 class="film__title">
                            {{ film.title }}
                        </h3>
                        <time class="film__release-date">{{
                            formateDate(film.release_date, "-", "ru-RU")
                        }}</time>
                        <p class="film__overview">
                            {{ film.overview }}
                        </p>
                        <router-link
                            class="film__link"
                            :to="{
                                name: 'film-details',
                                params: { id: film.id }
                            }"
                        >
                            Подробнее
                        </router-link>
                    </div>
                </article>
                <div
                    v-show="filmList.length"
                    ref="observer"
                    class="observer"
                ></div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchDataFilms } from "@/api";
import formateDate from "@/mixins/formateDate";

export default {
    name: "film-list",
    mixins: [formateDate],
    data() {
        return {
            filmList: [],
            page: 1,
            totalPages: 1
        };
    },
    created() {
        this.loadFilmList();
    },
    mounted() {
        this.loadingOnScroll();
    },
    methods: {
        async loadFilmList() {
            if (this.page > this.totalPages) {
                return;
            }
            const response = await fetchDataFilms(this.page);
            this.totalPages = response.total_pages;
            this.filmList = [...this.filmList, ...response.results];
        },

        loadingOnScroll() {
            const options = {
                rootMargin: "0px",
                threshold: 0.5
            };
            const callback = entries => {
                if (entries[0].isIntersecting) {
                    this.page++;
                    this.loadFilmList();
                }
            };
            const observer = new IntersectionObserver(callback, options);
            observer.observe(this.$refs.observer);
        }
    }
};
</script>
<style lang="scss" scoped>
.films {
    position: relative;
    padding: 50px 0;
    @media (max-width: 425px) {
        padding-top: 25px;
    }
    &__title {
        font-size: 56px;
        font-weight: bold;
        text-align: center;
        background: -webkit-linear-gradient(315deg, #42d392 10%, #647eff);
        background-clip: text;
        -webkit-text-fill-color: transparent;
        margin-bottom: 40px;
        @media (max-width: 560px) {
            font-size: 36px;
        }
        @media (max-width: 425px) {
            font-size: 32px;
        }
    }
}
.film {
    display: flex;
    background-color: #2f2f2f;
    border-radius: 30px;
    padding: 20px;
    overflow: hidden;
    @media (max-width: 425px) {
        flex-direction: column;
        padding: 0;
        border-radius: 15px;
    }
    & + & {
        margin-top: 30px;
    }
    &__title {
        font-size: 30px;
        margin-bottom: 10px;
        @media (max-width: 560px) {
            font-size: 20px;
        }
    }
    &__release-date {
        font-size: 15px;
    }
    &__overview {
        margin: 30px 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 5;
        -webkit-box-orient: vertical;
        @media (max-width: 560px) {
            -webkit-line-clamp: 3;
        }
        @media (max-width: 425px) {
            -webkit-line-clamp: 2;
            margin: 15px 0;
        }
    }
    &__image {
        width: 220px;
        height: 330px;
        border-radius: 15px 0 0 15px;
        overflow: hidden;
        flex-shrink: 0;
        position: relative;
        @media (max-width: 560px) {
            width: 170px;
            height: 250px;
        }
        @media (max-width: 425px) {
            width: 100%;
            height: 300px;
        }
        & > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            @media (max-width: 425px) {
                object-fit: contain;
            }
        }
    }
    &__rating {
        position: absolute;
        top: 0;
        right: 0;
        padding: 2px 10px;
        font-weight: bold;
        background-color: #3ca777;
        border-bottom-left-radius: 7px;
    }
    &__description {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-left: 30px;
        @media (max-width: 560px) {
            margin-left: 15px;
        }
        @media (max-width: 425px) {
            margin-left: 0;
            padding: 10px;
        }
    }
    &__link {
        margin-top: auto;
        margin-left: auto;
        display: block;
        padding: 10px;
        color: #213547;
        background-color: #42b883;
        max-width: max-content;
        transition: background-color 400ms ease;
        border-radius: 15px;
        &:hover {
            background-color: #53e6a4;
        }
    }
}
.observer {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
}
</style>
