console.log('Let Start JS');

async function main() {
    
    let a = await fetch("http://192.168.1.8:3000/songs/")
        let response = await a.text();
        console.log(response);
        let div = document.createElement("div")

}
main()