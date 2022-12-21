import { randomBoolean, randomFromArray, randomHexColor, randomId } from "../random.js";
import { courses } from "../user/types.js";
import { randomNotes } from "./constants.js";
export const userSchema = function (invalidUser) {
    const id = randomId(10);
    const fav = randomBoolean();
    const course = randomFromArray(courses);
    const color = randomHexColor();
    const note = randomFromArray(randomNotes);
    return {
        gender: invalidUser.gender,
        title: invalidUser.name.title,
        full_name: `${invalidUser.name.first} ${invalidUser.name.last}`,
        city: invalidUser.location.city,
        state: invalidUser.location.state,
        country: invalidUser.location.country,
        postcode: invalidUser.location.postcode,
        coordinates: invalidUser.location.coordinates,
        timezone: invalidUser.location.timezone,
        email: invalidUser.email,
        b_day: invalidUser.dob.date,
        age: invalidUser.dob.age,
        phone: invalidUser.phone,
        picture_large: invalidUser.picture.large,
        picture_thumbnail: invalidUser.picture.thumbnail,
        id: id,
        favorite: fav,
        course: course,
        bg_color: color,
        note: note
    };
};
// function normalizeData(user: User):  {
//     return
// }
// export const additionalSchema = {
//     "id": (json: any) => json.id,
//     "favorite": (json: any) => json.favorite,
//     "course": (json: any) => json.course,
//     "bg_color": (json: any) => json.bg_color,
//     "note": (json: any) => json.note
// }
//
// export const additionalRandomFields = {
//     "id": () => randomId(10),
//     "favorite": () => randomBoolean(),
//     "course": () => randomFromArray(courses),
//     "bg_color": () => randomHexColor(),
//     "note": () => randomFromArray(randomNotes)
// }
//# sourceMappingURL=schemas.js.map