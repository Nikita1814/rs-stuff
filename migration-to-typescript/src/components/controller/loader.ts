export interface Article{
    source:{
        id: string,
        name: string
        },
        author: string,
        title: string,
        description: string,
        url: string,
        urlToImage: string,
        publishedAt: string,
        content: string
}

export interface Source{
id: string,
name: string,
description: string,
url: string,
category: string,
language: string,
country: string
}


export interface ArtResp{
    status: string,
    totalResults: number,
    articles: Article[]
}

export interface SourceResp{
    status: string,
    sources: Source[]
}

export interface Option{
apiKey?: string,
sources?: string,
}
export type Callback<T>  = (data: T) => void
class Loader {
    baseLink: string ;
    options: Option;
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
