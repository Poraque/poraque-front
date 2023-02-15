export class API{

    BASEURL = "https://app-poraque-api.onrender.com/"

    getAllEvents = async () => {
        console.log(this.BASEURL)
        const response = await fetch(this.BASEURL+"event/all",{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        });
        console.log(await response)
        return await response.json();
    }

    getEvents = async (start, limit) =>{
        return await fetch(this.BASEURL+`getEvents/${start}&${limit}`,{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        }).then((response)=>{
            response.json()
        });
    }

    getEvent = async (id) =>{
        return await fetch(this.BASEURL+"getAllEvents",{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        }).then((response)=>{
            response.json()
        });
    }

    getEventsFiltered = async (start, category, stars) =>{
        const response = await fetch(this.BASEURL+`event/filter=?start=${start}&category=${category}&stars=${stars}`,{
            method:"GET",
            header: {
                'Content-Type': 'application/json'
              }
        })
        return await response.json();
    }
}