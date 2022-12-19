export const courses = [
    "Mathematics", "Physics", "English", "Computer Science", "Dancing", "Chess", "Biology", "Chemistry",
    "Law", "Art", "Medicine", "Statistics"
];

export type Gender = "male" | "female";

export type Coordinates = {
    latitude: string,
    longitude: string
}

export type Timezone = {
    offset: string,
    description: string
}

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
type HexNumber = Digit | "a" | "b" | "c" | "d" | "e" | "f";
// @ts-ignore
export type HexColor = `#${HexNumber}${HexNumber}${HexNumber}${HexNumber}${HexNumber}${HexNumber}`;

export type User = {
    gender?: Gender,
    title?: string,
    full_name: string,
    city?: string,
    state?: string,
    country?: string,
    postcode?: number,
    coordinates?: Coordinates,
    timezone?: Timezone,
    email?: string,
    b_day?: string,
    age?: number,
    phone?: string,
    picture_large?: string,
    picture_thumbnail?: string,
    id?: string,
    favorite?: boolean,
    course?: string,
    bg_color?: HexColor,
    note?: string
}
