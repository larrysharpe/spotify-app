import axios from 'axios';
import {ISearchResult} from "../components/App/App";

const searchAPIURL = 'http://localhost:1981/api/search';

const search = async (title: string) => {
   const response = await axios.get<ISearchResult[]>(`${searchAPIURL}?title=${title}`)
   return response.data;
}

const searchSVC = {
    search
}

export default searchSVC;