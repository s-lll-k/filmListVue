<template>
    <section
        class="movie"
        v-if="filmLDetails"
        :class="{'movie_without-overview': !filmLDetails.overview}"
    >
        <div
            class="movie__bg"
            v-if="filmLDetails.backdrop_path"
            :style="{
                'background-image': `url(https://www.themoviedb.org/t/p/w1920_and_h800_face/${filmLDetails.backdrop_path})`
            }"
        ></div>
        <div class="container">
            <router-link
                class="back-btn"
                :to="{
                    name: 'film-list'
                }"
            >
                Назад к списку
            </router-link>
            <div class="movie__inner">
                <div class="movie__poster">
                    <img
                        :src="`https://www.themoviedb.org/t/p/w300_and_h450_face/${filmLDetails.poster_path}`"
                        alt="постер фильма"
                    />
                </div>
                <div class="movie__short-description">
                    <h1 class="movie__title">
                        {{ filmLDetails.title }}
                    </h1>
                    <blockquote
                        class="movie__tagline"
                        v-if="filmLDetails.tagline"
                    >
                        {{ filmLDetails.tagline }}
                    </blockquote>
                    <ul class="movie__facts">
                        <li
                            class="movie__fact"
                            v-if="
                                filmLDetails.vote_average ||
                                filmLDetails.vote_count
                            "
                        >
                            <span class="movie__fact-name">Рейтинг: </span>
                            {{ filmLDetails.vote_average }} ({{
                                filmLDetails.vote_count
                            }}
                            оценок)
                        </li>
                        <li class="movie__fact">
                            <span class="movie__fact-name">
                                Год производства:
                            </span>
                            {{
                                formateDate(
                                    filmLDetails.release_date,
                                    "-",
                                    "ru-RU"
                                ) ?? "-"
                            }}
                        </li>
                        <li class="movie__fact">
                            <span class="movie__fact-name">Время: </span>
                            {{
                                formateMinutesToHours(filmLDetails.runtime) ??
                                "-"
                            }}
                        </li>
                        <li class="movie__fact" v-if="filmLDetails.genres">
                            <span class="movie__fact-name">Жанр: </span>
                            <span
                                :key="genre.id"
                                v-for="genre of filmLDetails.genres"
                                class="movie__fact-enumeration"
                            >
                                {{ genre.name }}
                            </span>
                        </li>
                        <li class="movie__fact">
                            <span class="movie__fact-name">Страна: </span>
                            <span
                                :key="country.name"
                                v-for="country of filmLDetails.production_countries"
                                class="movie__fact-enumeration"
                            >
                                {{ country.name ?? "Неизвестно" }}
                            </span>
                        </li>
                        <li class="movie__fact">
                            <span class="movie__fact-name">Бюджет: </span>
                            {{
                                !filmLDetails.budget
                                    ? "Неизвестно"
                                    : filmLDetails.budget.toLocaleString(
                                          "ru-RU",
                                          {
                                              style: "currency",
                                              currency: "USD",
                                              minimumFractionDigits: 0
                                          }
                                      )
                            }}
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="overview" v-if="filmLDetails.overview">
            <div class="container">
                <div class="overview__inner">
                    <h3 class="overview__title">Обзор</h3>
                    <p class="overview__text">
                        {{ filmLDetails.overview }}
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { fetchFilmDetails } from "@/api";
import formateDate from "@/mixins/formateDate";
import formateMinutesToHours from "@/mixins/formateMinutesToHours";
export default {
    name: "film-details",
    mixins: [formateDate, formateMinutesToHours],
    data() {
        return {
            filmLDetails: undefined
        };
    },
    created() {
        this.loadFilmDetails();
    },
    methods: {
        async loadFilmDetails() {
            this.filmLDetails = await fetchFilmDetails(this.$route.params.id);
        }
    }
};
</script>

<style lang="scss" scoped>
.movie {
    background-size: cover;
    position: relative;
    padding: 150px 0 0;
    @media (max-width: 1024px) {
        padding-top: 50px;
    }
    &.movie_without-overview {
        padding-bottom: 60px;
    }
    &__bg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-size: cover;
        background-position: center;
        filter: blur(7px);
    }
    &__inner {
        display: flex;
        align-items: center;
        position: relative;
        z-index: 1;
        backdrop-filter: brightness(0.15);
        @media (max-width: 560px) {
            flex-direction: column;
            align-items: unset;
        }
    }
    &__title {
        font-size: 48px;
        margin-bottom: 20px;
        color: #42d392;
        @media (max-width: 1024px) {
            font-size: 36px;
        }
        @media (max-width: 768px) {
            font-size: 25px;
            margin-bottom: 15px;
        }
        @media (max-width: 425px) {
            font-size: 20px;
        }
    }
    &__poster {
        margin-right: 50px;
        @media (max-width: 1024px) {
            margin-right: 25px;
        }
        @media (max-width: 560px) {
            padding-top: 20px;
            margin-right: unset;
        }
        & > img {
            display: block;
            width: 300px;
            height: 450px;
            object-fit: cover;
            @media (max-width: 768px) {
                width: 200px;
                height: 300px;
            }
            @media (max-width: 560px) {
                margin: 0 auto;
            }
        }
    }
    &__short-description {
        width: 100%;
        padding: 20px 20px 20px 0;
        @media (max-width: 560px) {
            padding: 20px;
        }
    }
    &__tagline {
        color: #547ea6;
        font-size: 25px;
        text-align: right;
        font-weight: bold;
        font-style: italic;
        margin: 20px 0;
        @media (max-width: 1024px) {
            font-size: 20px;
        }
        @media (max-width: 768px) {
            font-size: 18px;
            margin: 15px 0;
        }
        @media (max-width: 425px) {
            font-size: 16px;
        }
    }
    &__facts {
        list-style: none;
        padding: 0;
    }
    &__fact {
        & + & {
            margin-top: 10px;
        }
        &-name {
            font-weight: 500;
            color: #329568;
        }
        &-enumeration {
            & + & {
                &::before {
                    content: ", ";
                }
            }
        }
    }
}
.overview {
    position: relative;
    z-index: 1;
    margin-top: 60px;
    padding: 100px 0 50px;
    background-color: #242424;
    border-radius: 50px 50px 0 0;
    border: 10px solid #16b76e;
    border-bottom: none;
    @media (max-width: 1024px) {
        padding-top: 50px;
    }
    @media (max-width: 425px) {
        border-width: 5px;
        margin-top: 40px;
        padding: 30px 0;
    }
    &__title {
        font-size: 36px;
        font-weight: bold;
        @media (max-width: 425px) {
            font-size: 25px;
        }
    }
}
.back-btn {
    display: inline-block;
    cursor: pointer;
    font-size: 20px;
    color: #55dda0;
    position: relative;
    z-index: 1;
    margin-bottom: 20px;
    padding: 8px 20px 10px;
    background-color: #242424;
    border-radius: 15px;
    transition: background-color 400ms ease;
    &::before {
        content: "\003c";
    }
    &:hover {
        background-color: #2c2c2c;
    }
}
</style>
