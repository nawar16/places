window.onload = () => {
    let places = staticLoadPlaces();
    return renderPlaces(places);
};

function staticLoadPlaces() {
    return [
        {
            name: "FCP",
            location: {
            lat: 34.7302977,
            lng: 36.6770821,
            }
        },
        {
            name: "A",
            location: {
            lat: 36.7343994230032,
            lng: 34.72825348267183,
            }
        },
        {
            name: "B",
            location: {
            lat: 34.72825348267183,
            lng: 36.7343994230032,
            }
        },
        {
            name: "C",
            location: {
            lat: 36.734653897583485,
            lng: 34.728230060823556,
            }
        },
        {
            name: "D",
            location: {
            lat: 34.728230060823556,
            lng: 36.734653897583485,
            }
        }
    ];
}

    function renderPlaces(places) {
        let scene = document.querySelector('a-scene');
        places.forEach((place) => {
            const latitude = place.location.lat;
            const longitude = place.location.lng;
            // add place icon
            const icon = document.createElement('a-entity');
            icon.setAttribute('gps-entity-place', `latitude: ${latitude}; longitude: ${longitude}`);
            icon.setAttribute('gltf-model', "#animated-asset");
            // for debug purposes, just show in a bigger scale, otherwise I have to personally go on places...
            icon.setAttribute('scale', '0.075 0.075 0.075');
            icon.addEventListener('loaded', () => window.dispatchEvent(new CustomEvent('gps-entity-place-loaded')));
            const clickListener = function (ev) {
               ev.stopPropagation();
                ev.preventDefault();
                console.log('Clicked');
                const name = ev.target.getAttribute('name');
                console.log(place.name);
                window.location.href = "https://google.com" + '/search?q=' + place.name;
                const el = ev.detail.intersection && ev.detail.intersection.object.el;
                if (el && el === ev.target) {
                    const label = document.createElement('span');
                    const container = document.createElement('div');
                    container.setAttribute('id', 'place-label');
                    label.innerText = name;
                    container.appendChild(label);
                    document.body.appendChild(container);
                    setTimeout(() => {
                        container.parentElement.removeChild(container);
                    }, 1500);
                }
            };
            icon.addEventListener('click', clickListener);
            scene.appendChild(icon);
        });
}
