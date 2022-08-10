export default class LocalStorageUtils {
    /**
     * Lưu một string vào bộ nhớ của máy client
     * @param key 
     * @param value 
     */
    public static setItem(key: string, value: any) {
        localStorage.setItem(key, value);
    }

    /**
     * Lấy giá trị đã lưu trong bộ nhớ và cast về kiểu T
     * @param key 
     * @returns 
     */
    public static getItem<T>(key: string) {
        let value = localStorage.getItem(key);

        if (value) {
            return JSON.parse(value) as T;
        }
    }
}