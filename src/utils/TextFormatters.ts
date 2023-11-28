export const normalizeText = (text: string) => {
    const lower = text.toLowerCase();
    return `${lower.charAt(0).toUpperCase()}${lower.slice(1)}`;
}
