export class API{

    BASEURL = "https://app-poraque-api.onrender.com/"

    getAllEvents = async () => {
        console.log(this.BASEURL)
        const response = await fetch(this.BASEURL+"event",{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        });
        return await response.json();
    }

    getEvent = async (id) =>{
        return await fetch(this.BASEURL+`events/${id}`,{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        }).then((response)=>{
            response.json()
        });
    }

    searchEvents = async (query, page) =>{
        const pageSize = 10;
        const response = await fetch(this.BASEURL+`event/search?q=${query}&page=${page}&pageSize=${pageSize}`,{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        })
        return await response.json();
    }

    searchTypeEvents = async (type, page) =>{
        const pageSize = 10;
        const response = await fetch(this.BASEURL+`event/search?type=${type}&page=${page}&pageSize=${pageSize}`,{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        })
        return await response.json();
    }
}