class EnvConfig {
    static getApiHost(): string {
       // return "http://localhost:8086";
        return process.env.REACT_APP_API_HOST!;
    }
}

export default EnvConfig;