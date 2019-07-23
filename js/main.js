const search = document.getElementById('search');
const matchList = document.getElementById('match-list');

const searchStates = async searchText => {
    const res = await fetch('../json/data.json');
    const states = await res.json();
    

    let matches = states.filter(state => {
        const regex = new RegExp(`^${searchText}`, 'gi');
        return state.CountryName.match(regex) || state.CountryCode.match(regex);
    });

    if (searchText.length === 0) {
        matches = [];
    }

    outputHtml(matches);
};

const outputHtml = matches => {
    if (matches.length > 0) {
        const html = matches.map(match => `
        <div class="card card-body mb-1">
        <h4>${match.CountryName} (${match.CountryCode}) <span class="text-primary">${match.CapitalName}</span></h4>
        <small>Lat: ${match.CapitalLatitude} / Long: ${match.CapitalLongitude}</small>
        </div>`).join('');

        matchList.innerHTML = html;
    }
    
};

search.addEventListener('input', () => searchStates(search.value));
