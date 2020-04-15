addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})


class ElementHandler {
  constructor(variant)
  {
    this.variant = variant;
  }
  element(element) {
    switch(element.tagName)
    {
      case 'title' : 
      element.setInnerContent(`Updated Variant ${this.variant}`)
      break;
      case 'h1' : 
      element.setInnerContent(`This is Updated Variant ${this.variant}`)
      break;
      case 'p' : 
      element.setInnerContent(`Updated Variant ${this.variant} - brought to you by Saurabh`)
      break;
      case 'a' : 
      if(this.variant == 'one')
      {
        element.setInnerContent("Go to Saurabh's Github Repository")
        element.setAttribute("href", "https://github.com/VSaurabh93/");
      }
      else if(this.variant == 'two')
      {
        element.setInnerContent("Go to Saurabh's LinkedIn Profile")
        element.setAttribute("href", "https://www.linkedin.com/in/saurabhverma93/");
      }
      break;
      default:
        break;
    }
  }
}


/**
 * Respond with hello worker text
 * @param {Request} request
 */
async function handleRequest(request) {

  url= "https://cfw-takehome.developers.workers.dev/api/variants"
  obj = await (await fetch(url)).json();

  const cookie = request.headers.get('cookie'); 
  if (cookie && cookie.includes(`variant=one`)) {
    let resp = await fetch(obj["variants"][0]);
    let elementHandler = new ElementHandler("one");
    return new HTMLRewriter().on('*', elementHandler).transform(resp);
  } 
  else if (cookie && cookie.includes(`variant=two`)) {
    let resp = await fetch(obj["variants"][1]);
    let elementHandler = new ElementHandler("two");
    return new HTMLRewriter().on('*', elementHandler).transform(resp);
  }
  else
  {
    let variant = Math.random() < 0.5 ? "one" : "two"
    let index = variant === "one" ? 0 : 1;
    let resp = await fetch(obj["variants"][index]);
    let elementHandler = new ElementHandler(variant);
    response = new HTMLRewriter().on('*', elementHandler).transform(resp);
    response.headers.append('Set-Cookie', `variant=${variant}; path=/`);
    return response;
  }
}
