
data= `
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
<style>

</style>
  <h1>welcome to yankee the greatest html5 editor in the world</h1>  
  <h2>contribute to the project on <a href="https://github.com/ngdream/yankee">github</a></h2>
</body>
</html>
`
//class for elements
class Element
{ 
    constructor(viewelement)
    {
        this.depth=0
        this.uielement = document.createElement("div");
        this.viewelement = viewelement
        var content = document.createTextNode(this.viewelement.tagName);
        var childs = document.getElementById("ui-view")
        this.uielement.appendChild(content)

        this.uielement.innerHTML += `
        <div class="ui-childs">
        <div class="adder child"></div>
        <div class="childs">
        </div>
        <div class="adder next"></div>`;
        var addchild = ()=> {
            this .addchild("div")
        }

        var addafter = ()=> {
            this .addafter("div")
        }

        this.uielement.querySelector(".adder.child").addEventListener("click",addchild.bind(this))//add a child for this element
        this.uielement.querySelector(".adder.next").addEventListener("click",addafter.bind(this))//add an element after this element


        var overfunction = function (e) {
            e.stopPropagation();
            this.viewelement.setAttribute("style","background-color:#eef")
         
        };
        
        var outfunction = function (e) {
            e.stopPropagation();
            this.viewelement.setAttribute("style","background-color:none")
         
        };

        var initoption = (e) => {
            e.stopPropagation();
            this.createoption()
            Element.selected=this
        }
        this.uielement.addEventListener("mouseover", overfunction.bind(this))
        this.uielement.addEventListener("mouseout", outfunction.bind(this))
        this.uielement.addEventListener("click", initoption.bind(this))
       

        for (let e = 0;e<Element.elements.length;e++)
            if (Element.elements[e].viewelement == this.viewelement.parentElement)
            {
                this.parent = Element.elements[e]
                this.depth = this.parent.depth + 1
                childs = this.parent.uielement.querySelector(".childs")
                break;
            }
        
        childs.append(this.uielement)
        this.uielement.style = "position:relative;" 
        this.uielement.style.left=this.depth * 13 + "px"
        Element.elements.push(this)
    }

    cancontaintext() {
        try {
            return this.viewelement.outerHTML.indexOf("/") != -1;
        } catch (ex) {
            return false;
        }
    }

    addchild(tag)
    {
        var  addedelement = document.createElement(tag)
        var c = document.createTextNode("carte")
        addedelement.append(c)
        this.viewelement.insertBefore(addedelement, this.viewelement.firstChild);
        var newelement = new Element(addedelement)
        this.uielement.querySelector(".childs").insertBefore(newelement.uielement, this.uielement.querySelector(".childs").firstChild);
    }
    addafter(tag)
    {
        var  addedelement = document.createElement(tag)
        var c = document.createTextNode("carte")
        addedelement.append(c)
        this.viewelement.after(addedelement)
        var newelement = new Element(addedelement)
        this.uielement.after(newelement.uielement)
        console.log(c.uielement)  
    }
    

    createoption()
    {
     
        var styleoption = `
        <div>
        <span>
        position
        </span>
        </div>
        <div>
        </div>
        `;

        var configoption = `
        <div class="textcontent option">
        <h3>
        content
        </h3>
        <textarea></textarea>
        </div>
        `;

        configoption+=`
        <div class="href option">
        <h3>
        link
        </h3>
        <input/>
        </div>
        `;

        document.querySelector(".yankee .style").innerHTML=styleoption
        document.querySelector(".yankee .config").innerHTML = configoption

        var configstab = document.querySelector(".yankee .config")

        var changetextcontent = (e) => { e.stopPropagation(); this.viewelement.innerHTML = e.target.value }
        
        configstab.querySelector(".textcontent").querySelector("textarea").addEventListener("input",changetextcontent.bind(this))
        
        
    }

}


Element.elements=[]

//check is iframe for view is loaded
function checkIframeLoaded() {
    // Get a handle to the iframe element
    var iframe = document.querySelector('iframe');
    // Check if loading is complete
    if (  iframe.contentWindow.document.readyState  === "complete" ) {
        iframe.contentWindow.onload = function () {
            
        };
      
        dataelements=iframe.contentWindow.document.querySelectorAll("*")
        for (let c=0; c < dataelements.length;c++)
        {
            new Element(dataelements[c],"")
            }
        return;
    } 
    
    // If we are here, it is not loaded. Set things up so we check   the status again in 100 milliseconds
    window.setTimeout(checkIframeLoaded, 100);
}

//launc the program
function main()
{
    Htmlparser = new DOMParser()
    datadoc = Htmlparser.parseFromString(data, "text/xml");
    let elements = new Array()
    var dataelements=[]
    bodycontent = datadoc.getElementsByTagName("body")[0]

    
    iframe = document.querySelector("iframe")
    iframe.contentWindow.document.open();
    iframe.contentWindow.document.write(data);
    iframe.contentWindow.document.close();
    checkIframeLoaded()
   
}

main()