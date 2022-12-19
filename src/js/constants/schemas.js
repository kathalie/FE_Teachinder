import { randomBoolean, randomFromArray, randomHexColor, randomId, randomLine } from "../random.js";
import { courses } from "../user/types.js";
export const userSchema = {
    "gender": (json) => json.gender,
    "title": (json) => json.name.title,
    "full_name": (json) => `${json.name.first} ${json.name.last}`,
    "city": (json) => json.location.city,
    "state": (json) => json.location.state,
    "country": (json) => json.location.country,
    "postcode": (json) => json.location.postcode,
    "coordinates": (json) => json.location.coordinates,
    "timezone": (json) => json.location.timezone,
    "email": (json) => json.email,
    "b_day": (json) => json.dob.date,
    "age": (json) => json.dob.age,
    "phone": (json) => json.phone,
    "picture_large": (json) => json.picture.large,
    "picture_thumbnail": (json) => json.picture.thumbnail
};
export const additionalSchema = {
    "id": (json) => json.id,
    "favorite": (json) => json.favorite,
    "course": (json) => json.course,
    "bg_color": (json) => json.bg_color,
    "note": (json) => json.note
};
export const additionalRandomFields = {
    "id": () => randomId(10),
    "favorite": () => randomBoolean(),
    "course": () => randomFromArray(courses),
    "bg_color": () => randomHexColor(),
    "note": () => randomLine("../mock_files/mock_comments.txt")
};
//# sourceMappingURL=schemas.js.map