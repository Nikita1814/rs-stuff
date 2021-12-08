export interface Article{
    source:{
        readonly id: string,
        readonly name: string
        },
        readonly author: string,
        readonly title: string,
        readonly description: string,
        readonly url: string,
        readonly urlToImage: string,
        readonly publishedAt: string,
        readonly content: string
}

export interface Source{
readonly id: string,
readonly name: string,
readonly description: string,
readonly url: string,
readonly category: string,
readonly language: string,
readonly country: string
}


export interface ArtResp{
    readonly status: string,
    readonly totalResults: number,
    readonly articles: Article[]
}

export interface SourceResp{
    readonly status: string,
    readonly sources: Source[]
}

export interface Option{
apiKey?: string,
sources?: string,
}
export type Callback<T>  = (data: T) => void
class Loader {
    private baseLink: string ;
    private options: Option;
    constructor(baseLink: string, options:Option) {
        this.baseLink = baseLink;
        this.options = options;
    }

    getResp<T>(
        { endpoint, options = {} }: {endpoint:string, options?:Option},
        callback:Callback<T> = () => {
            console.error('No callback for GET response');
        }
    ) {
        this.load<T>('GET', endpoint, callback, options);
    }

    errorHandler(res:Response) {
        if (!res.ok) {
            if (res.status === 401 || res.status === 404)
                console.log(`Sorry, but there is ${res.status} error: ${res.statusText}`);
            throw Error(res.statusText);
        }

        return res;
    }

    makeUrl(options: Option, endpoint: string) {
        const urlOptions:{[key: string]:string} = { ...this.options, ...options };
        let url = `${this.baseLink}${endpoint}?`;

        Object.keys(urlOptions).forEach((key) => {
            url += `${key}=${urlOptions[key]}&`;
        });

        return url.slice(0, -1);
    }

    load<T>(method:string, endpoint:string, callback:Callback<T>, options = {}) {
        fetch(this.makeUrl(options, endpoint), { method })
            .then(this.errorHandler)
            .then((res) => res.json())
            .then((data) => callback(data))
            .catch((err) => console.error(err));
    }
}

export default Loader;
