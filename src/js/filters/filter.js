class Filter {
    arrayToFilter;
    predicates = [];
    constructor(arrayToFilter) {
        this.arrayToFilter = arrayToFilter;
    }
    addFilter(predicate) {
        this.predicates.push(predicate);
        return this;
    }
    removeFilters(predicate) {
        const index = this.predicates.findIndex(p => p.name === predicate.name);
        if (index !== -1)
            this.predicates.splice(index, 1);
        return this;
    }
    filtered() {
        return this.arrayToFilter.filter(obj => this.predicates.every(filter => filter(obj)));
    }
}
export class UserFilter extends Filter {
    constructor(filtered) {
        super(filtered);
    }
    static userFilters = {
        byAge: (min, max) => function ageFilter(user) {
            return user.age >= min && user.age <= max;
        },
        byCountry: (country) => function countryFilter(user) {
            return user.country.toLowerCase() == country.toLowerCase();
        },
        byGender: (gender) => function genderFilter(user) {
            return user.gender.toLowerCase() == gender.toLowerCase();
        },
        withPhoto: () => function photoFilter(user) {
            return user.picture_thumbnail !== null;
        },
        favourites: () => function favoritesFilter(user) {
            return user.favorite;
        }
    };
    byAge(min, max) {
        return super.addFilter(UserFilter.userFilters.byAge(min, max));
    }
    byCountry(country) {
        return super.addFilter(UserFilter.userFilters.byCountry(country));
    }
    byGender(gender) {
        return super.addFilter(UserFilter.userFilters.byGender(gender));
    }
    withPhoto() {
        return super.addFilter(UserFilter.userFilters.withPhoto());
    }
    favourites() {
        return super.addFilter(UserFilter.userFilters.favourites());
    }
}
//# sourceMappingURL=filter.js.map