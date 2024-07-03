let timeoutId:string | number | NodeJS.Timeout | undefined;

export default function(func: Function, ms: number = 500) {
    if (timeoutId) {
        clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
        func()
    }, ms)
}