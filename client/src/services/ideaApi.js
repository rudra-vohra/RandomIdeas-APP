const axios = require('axios');

class IdeasApi{
  constructor(){
    this._apiURL = '/api/ideas';
  }

  getIdeas(){
    return axios.get(this._apiURL); 
  }

  createNewIdea(idea){
    return axios.post(this._apiURL, idea);
  }

  updateIdea(id, data){
    return axios.put(`${this._apiURL}/${id}`, data);
  }

  deleteIdea(id){
    const username = localStorage.getItem('username') ? localStorage.getItem('username') : '';
    return axios.delete(`${this._apiURL}/${id}`, {
      data:{
        username
      }
    })
  };
}

export default new IdeasApi();