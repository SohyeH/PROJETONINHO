document.getElementById('botao').addEventListener('click', function () {

    let nome = document.getElementById('nome-pokemon').value

    fetch(' https://pokeapi.co/api/v2/pokemon/' + nome)
        .then(function (response) {
            return response.json()
        }).then(function (response) {
            console.log(response.abilities)
            console.log(response.sprites.front_default)

            for (const hab of response.abilities) {
                html_habilidades += '<li>' + hab.abiliy.name + '</li>'

                console.log(hab.ability.name)
            }
            let lista = document.write.getElementById('habilidades')
            lista.innerHTML = html_habilidades

            let url = response.sprites.front_default
            document.getElementById('img-card').setAttribute('src', url)
        })
})
