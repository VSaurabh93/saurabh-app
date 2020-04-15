addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


// fetch(url).then((response) => {
//   console.log("Entered")
//   return response.json();
// })
// .then((data) => {
//   console.log("pagal kutaa");
//   //console.log(data);
// });


async function fetchRandomURL (url){
   const response = await fetch(url);
   console.log('bakar');
    return response.json();
}

class ElementHandler {
  element(element) {
    // An incoming element, such as `div`
    switch(element.tagName)
    {
      case 'title' : 
      //console.log(`Incoming title: ${element}`)
      element.setInnerContent("Updated Variant 1")
      break;
      case 'h1' : 
      //console.log(`Incoming h1: ${element.tagName}`)
      element.setInnerContent("Updated Variant 1")
      break;
      case 'p' : 
      //console.log(`Incoming p: ${element.tagName}`)
      element.setInnerContent("Updated Variant 1 - brought to you by Saurabh")
      break;
      case 'a' : 
      //console.log(`Incoming a: ${element.tagName}`)
      element.setInnerContent("Go to Saurabh's Github Repository")
      element.setAttribute("href", "https://github.com/VSaurabh93/");
      //console.log(element.getAttribute("href"));
      break;
      default:
        break;
    }
    //console.log(`Incoming element: ${element.tagName}`)
  }

  comments(comment) {
    // An incoming comment
  }

  text(text) {
    // An incoming piece of text
  }
}


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  url= "https://cfw-takehome.developers.workers.dev/api/variants"
  //response = fetchRandomURL(url);
  obj = await (await fetch(url)).json();
  console.log(obj["variants"][0]);

  data = await fetch(obj["variants"][0]);
  return new HTMLRewriter().on('*', new ElementHandler()).transform(data);

  //  return new Response(data, {
  //   headers: { 'content-type': 'text/plain' },
  // })
}
