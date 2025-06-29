export async function sleep(seconds: number = 1) {
    await new Promise((resolve) => {
        setTimeout(resolve, seconds * 1000);
    });
}
