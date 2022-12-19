import {randomBoolean, randomFromArray, randomHexColor, randomId, randomLine} from "../random.js";
import { courses } from "../user/types.js";

export const userSchema = {
    "gender": (json: any) => json.gender,
    "title": (json: any) => json.name.title,
    "full_name": (json: any) => `${json.name.first} ${json.name.last}`,
    "city": (json: any) => json.location.city,
    "state": (json: any) => json.location.state,
    "country": (json: any) => json.location.country,
    "postcode": (json: any) => json.location.postcode,
    "coordinates": (json: any) => json.location.coordinates,
    "timezone": (json: any) => json.location.timezone,
    "email": (json: any) => json.email,
    "b_day": (json: any) => json.dob.date,
    "age": (json: any) => json.dob.age,
    "phone": (json: any) => json.phone,
    "picture_large": (json: any) => json.picture.large,
    "picture_thumbnail": (json: any) => json.picture.thumbnail
}

export const additionalSchema = {
    "id": (json: any) => json.id,
    "favorite": (json: any) => json.favorite,
    "course": (json: any) => json.course,
    "bg_color": (json: any) => json.bg_color,
    "note": (json: any) => json.note
}

export const additionalRandomFields = {
    "id": () => randomId(10),
    "favorite": () => randomBoolean(),
    "course": () => randomFromArray(courses),
    "bg_color": () => randomHexColor(),
    "note": () => randomLine("../mock_files/mock_comments.txt")
}
