fetch('https://rickandmortyapi.com/api/character')
  .then(response => response.json())
  .then(data => {
    const numCards = 15; 
    data.results.slice(0, numCards).forEach(character => {
        makeCard(character);
      });
    })
  .catch(err => console.error(err));

  function makeCard(character){
    const containercard= document.createElement('article');
    containercard.id='character_card';
    containercard.classList.add('character_card')

    const containerImage=document.createElement('div');
    containerImage.id='contImg';
    containerImage.classList.add('contImg');

    const image=document.createElement('img');
    
    image.src=character.image

    const infoContainer=document.createElement('div');
    infoContainer.id='infCont';
    infoContainer.classList.add('infCont');

    const containerName=document.createElement('div');
    containerName.id='contName'
    containerImage.classList.add('contName');

    const name=document.createElement('h2');
    name.id='namepj'
    name.classList.add('namepj');
    name.innerHTML=character.name

    const containerlocation=document.createElement('div');
    containerlocation.id='contlocation'
    containerlocation.classList.add('contlocation')

    const locationholder=document.createElement('span');
    locationholder.innerHTML='Last know location'
    locationholder.id='locath'
    locationholder.classList.add('locath');

    const locationpersonaje=document.createElement('h3');
    locationpersonaje.innerHTML=character.location.name
    locationpersonaje.id='locationpj'
    locationpersonaje.classList.add('locationpj');

    containercard.appendChild(containerImage);
    containerImage.appendChild(image);
    containercard.appendChild(infoContainer);
    infoContainer.appendChild(containerName);
    containerName.appendChild(name);
    infoContainer.appendChild(containerlocation);
    containerlocation.appendChild(locationholder);
    containerlocation.appendChild(locationpersonaje);

    document.querySelector('div').appendChild(containercard);
    
  }
 