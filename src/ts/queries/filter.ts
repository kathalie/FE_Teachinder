/**
 * Написати функцію фільтрації массиву обєктів за параметрами
 * (параметри змінними). Параметри є полями обєкту: country, age, gender,
 * favorite. Фільтрація повинна працювати як логічне «і».
 */
import {Gender, User} from "../user/types.js";
import {regions} from "../constants/countries.js";

export type Predicate<T> = (el: T) => boolean;

class Filter<T> {
    private predicates: Predicate<T>[] = [];

    constructor(protected arrayToFilter: T[]){
    }

    public addFilter(predicate: Predicate<T>): Filter<T> {
        this.predicates.push(predicate);

        return this;
    }

    public removeFilter(predicate: Predicate<T>): Filter<T> {
        const index = this.predicates.findIndex(p => p.name === predicate.name);

        if(index !== -1) this.predicates.splice(index, 1);

        return this;
    }

    public filtered() {
        return this.arrayToFilter.filter(obj => this.predicates.every(filter => filter(obj)));
    }
}

export class UserFilter extends Filter<User> {
    constructor(filtered: User[]) {
        super(filtered);
    }

    public static userFilters = {
        byAge: (min: number, max: number) => function ageFilter(user: User){
            return  user.age >= min && user.age <= max;
        },
        byRegion: (region: string) => function regionFilter(user: User) {
            return regions[region].includes(user.country);
        },
        byCountry: (country: string) => function countryFilter (user: User) {
            return user.country.toLowerCase() == country.toLowerCase();
        },
        byGender: (gender: Gender) => function genderFilter (user: User) {
            return user.gender.toLowerCase() == gender.toLowerCase();
        },
        withPhoto: () => function photoFilter (user: User) {
            return !!user.picture_large && user.picture_large.length > 0
                && !!user.picture_thumbnail && user.picture_thumbnail.length > 0;
        },
        favourites: () => function favoritesFilter (user: User) {
            return !!user.favorite;
        }
    }

    public byAge(min: number, max: number): UserFilter {
        return super.addFilter(UserFilter.userFilters.byAge(min, max)) as UserFilter;
    }

    public byCountry(country: string): UserFilter {
        return super.addFilter(UserFilter.userFilters.byCountry(country)) as UserFilter;
    }

    public byGender(gender: Gender): UserFilter {
        return super.addFilter(UserFilter.userFilters.byGender(gender)) as UserFilter;
    }

    public withPhoto(): UserFilter {
        return super.addFilter(UserFilter.userFilters.withPhoto()) as UserFilter;
    }

    public favourites(): UserFilter {
        return super.addFilter(UserFilter.userFilters.favourites()) as UserFilter;
    }
}
