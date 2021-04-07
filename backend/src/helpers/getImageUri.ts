
const {DOMAIN} = process.env;

export const getImageUri = (filename: string) => {
    return `${DOMAIN}/uploads/media/${filename}`
}