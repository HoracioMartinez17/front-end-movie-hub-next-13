
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const readData = (f: any) =>
    new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.readAsDataURL(f)
    })