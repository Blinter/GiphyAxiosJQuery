
/**
* DOMContentLoaded function which is called when the DOM is loaded.
* DOM is modified.
* Template images are removed from the initial webpage if existent, and event listeners are added to the buttons.
* Removes any text in the search input so the placeholder text is displayed to the user.
* @return {void}
*/
const loadedDocument = () => {
    $(".data-container img").each((undefined,el)=>el.remove());
    $("#search").on("click", searchGiphy);
    $("#removeImages").on("click", removeImages);
    clearSearch();
}
$(document).on("DOMContentLoaded", loadedDocument);

/**
* Clears search text box
* DOM is modified, removes the value of the input textbox ID = (#searchTerm.)
* Method is called when errors have occured or after any search.
* @return {void}
*/
const clearSearch = () => $("#searchTerm").val("");

/**
* Remove all images
* DOM is modified at the data-container class.
* Called when user clicks the Remove Images input button.
* @return {void}
*/
const removeImages = (e) => {
    e.preventDefault();
    $(".data-container img").each((undefined,el)=>$(el).remove());
}

/**
* Search Giphy using API Key. Attempt to handle any common errors and reset the user's input in response to a search attempt.
* DOM is appended at the data-container class, with styles applied.
* Uses Axios JS. Outputs any errors to the console but sends an alert to the user if there is a handled error that happens as part of normal user action.
* @return {void}
*/
const searchGiphy = async(e) => {
    e.preventDefault();
    const searchTerm = $("#searchTerm").val();
    if (searchTerm === '')
        throw ("Search Empty");
    try {
        //Limited API Key - 100 queries per hour
        const result = await axios.get(
            "https://api.giphy.com/v1/gifs/search?" + 
            "api_key=bvO4cBzNEnXO54J1RtPIOa9VlBWWsyc0&" + 
            "q= " + searchTerm + "&" + 
            "limit=1&" + 
            "offset=0&" +
            "rating=pg-13&" + 
            "lang=en&" + 
            "bundle=low_bandwidth");
        if (result.status !== 200) {
            clearSearch();
            alert("Not successful Code " + result.status);
            throw("Not successful Code " + result.status);
        }
        if(result.data.data.length === 0){
            clearSearch();
            alert("No images found using search query " + $("searchTerm").val());
            throw("No images found using search query " + $("searchTerm").val());
        }                
        $(".data-container").append(
            $("<img>")
            .attr({style : "margin:auto; width:auto; height:auto; margin:5px;" })
            .attr("src", result.data.data[0].images.original.url)
        );
        clearSearch();
    } catch (error) {
        if(error === 'Search Empty')
            return;
        console.log(error);
    }
}