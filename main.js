//async: significa que a função vai lidar com operações assincronas
//(que demoram para terminar, como requisiçôes a APIs)
async function buscarFilme(){
    const input = document.getElementById("filmeInput").value
    const resultado = document.getElementById("resultado")

    //validação
    if(!input){
        resultado.innerHTML = '<p>⚠️ Digite o nome de um filme ⚠️</p>';
        return;
    }

    const apiKey = "1f63dbc0";
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(input)}&apikey=${apiKey}&plot=full`;

    try{
        const response = await fetch(url);
        const dados = await response.json();

        if(dados.Response === "False"){
            resultado.innerHTML = "<p>❌ não foi possivel achar o filme ❌</p>"
            return;
        }

        resultado.innerHTML =
        `
        <div class="clearfix">
        <img src="${dados.Poster !== "N/A" ? dados.Poster : "https://via.placeholder.com/200x300?text=Sem+Imagem"}" alt="${dados.Title}"}">
        <h2>${dados.Title} (${dados.Year})</h2>
        <p><strong>Diretor: </strong>${dados.Director}</p>
        <p><strong>Atores: </strong>${dados.Actors}</p>
        <p><strong>Nota no IMBD: </strong>⭐${dados.imdb}</p>
        <p><strong>Enrendo: </strong>${dados.Plot}</p>

        <div/>
        `
    }catch(error){
        resultado.innerHTML = "<p>Ocorreu um erro ao buscar o filme</p>"

    }
}